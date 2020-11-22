import * as Moment from 'moment';
import { noti } from 'modules';
import { session } from './models/Session';
import { user } from './models/User';
import { Err, User } from 'types';
import { Redis } from 'libs';
import { RedisConstants } from 'constant';
import { validate } from './validation';

const crypto = require('crypto');

export const cUser = new class {
  public models: any;
  validate: any;

  constructor() {
    this.models = {
      session,
      user,
    };
    this.validate = validate;
  }

  createUser = async (phone: string) => {

    const exists = await cUser.models.user.findOne({ phone });

    if (exists) {
      throw new Err({ msg: 'Пользователь с таким номером существует', code: 'user_exists' });
    }

    const newUser = await cUser.models.user.create({ phone });

    return { user: newUser };
  }

  // tslint:disable-next-line:variable-name
  makeSession = async (user_id: String, device: String, app: String) => {
    await this.models.session.deleteMany({ user_id });

    const sessions = await this.models.session.insertMany({
      app,
      user_id,
      token: this.genToken(),
      date_create: Moment().toISOString(),
      date_update: Moment().toISOString(),
      next_update: Moment().add(7, 'd').toISOString(),
      last_device: device,
    });
    return sessions[0];
  }

  updateSession = (token: String, device: String, app: String) => {
    return this.models.session.updateOne(
      { token, app, last_device: device },
      {
        date_update: Moment().toISOString(),
        next_update: Moment().add(7, 'd').toISOString(),
      },
      { new: true });
  }

  validateSmsCode = async (phone: string, code: string) => {
    const smsValid = await Redis.get(RedisConstants.smsKeyCode(phone));
    console.log(smsValid, code);
    return smsValid === code;
  }

  authWithSms = async (phone: string) => {
    const code = this.makeSmsCode();
    const smsExists = await Redis.setnx(RedisConstants.smsSendCode(phone), {
      val: '1', expire: 60,
    });

    if (!smsExists) {
      throw new Err({ msg: 'Смс уже отправлено. Подождите несколько секунд', code: 'sms_send' });
    }

    await Redis.setex(RedisConstants.smsKeyCode(phone), code, 10 * 60);
    await noti.sendSmsMessage(phone, `Ваш код подтверждения: ${code}`);
  }

  checkToken = async (ctx: any) => {
    const session = await this.models.session.findOne({ token: ctx.token }) as any;

    if (!session) {
      throw 'no session';
    }

    if (Moment(session.next_update) < Moment()) {
      await this.updateSession(ctx.token, ctx.ua, ctx.app);
    }

    return this.getUserByID(session.user_id);
  }

  makeSmsCode = () => {
    return crypto.randomBytes(24).map((a: any) => a % 10).join('').slice(0, 6);
  }

  getUserByID = (id: any) => this.models.user.findOne({ _id: id });

  genToken = () => {
    return crypto.randomBytes(24)
      .toString('base64')
      .replace(/\W/g, '');
  }

  find(filter: {phone: string}) {
    return cUser.models.user.findOne(filter);
  }
};
