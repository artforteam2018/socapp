import { describe, it } from 'mocha';
import { stub } from 'sinon';
import { expect } from 'chai';
import { Auth } from '../../src/controllers/user';
import { user } from '../../src/components/user/models/User';
import { session } from '../../src/components/user/models/Session';
import { cUser } from '../../src/components';

const smsStub = stub(cUser, 'makeSmsCode');
smsStub.returns('1234');

const request = (body: any) => ({ body, context: { ua: 'test', device: 'android' } });

const vars = {
  phone: '79998203049',
  phone2: '70000000000',
  token: '',
};

describe('Registration', () => {

  before(async () => {
    await new Promise(res => setTimeout(res, 1500));
    await user.deleteMany({});
    await session.deleteMany({});
  });

  it('reg user', async () => {
    // @ts-ignore
    await new Auth.AuthWithSms(request({ phone: vars.phone })).run();
    // @ts-ignore
    const created = await new Auth.Confirm(request({ phone: vars.phone, code: '1234' })).run();
    expect(created.data.user).to.includes({ phone: vars.phone.slice(1) });
    expect(created.data.session).to.have.property('token');
    vars.token = created.data.session.token;
  });

  it('sms wait', async () => {
    // @ts-ignore
    await new Auth.AuthWithSms(request({ phone: vars.phone2 })).run();
    try {
      // @ts-ignore
      await new Auth.AuthWithSms(request({ phone: vars.phone2 })).run();
    } catch (e) {
      expect(e.code).to.equal('sms_wait');
    }
  });
});
