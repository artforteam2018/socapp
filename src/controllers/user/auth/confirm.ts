import { Controller } from 'utils';
import { Err, Su } from 'types';
import { cUser } from 'components';

export class Confirm extends Controller {

  get schema() {
    return {
      type: 'object',
      required: ['phone', 'code'],
    };
  }

  async run(): Promise<any> {
    const phone = cUser.validate('phone', this.body.phone);

    const valid = await cUser.validateSmsCode(phone, this.body.code);

    if (!valid) {
      throw new Err({ msg: 'Неправильный код', code: 'wrong_code' });
    }

    let user = await cUser.find({ phone });

    if (!user) {
      const { user: newUser } = await cUser.createUser(phone);
      user = newUser;
    }
    const session = await cUser.makeSession(user._id, this.ctx.ua, this.ctx.device);

    return { user: user.forUser(), session: session.forUser() };
  }
}
