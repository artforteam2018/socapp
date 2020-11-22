import { Controller } from 'utils';
import { Su } from 'types';
import { cUser } from 'components';

export class Auth extends Controller {

  get schema() {
    return {
      type: 'object',
      required: ['phone'],
    };
  }

  async run(): Promise<any> {
    const phone = cUser.validate('phone', this.body.phone);

    await cUser.authWithSms(phone);
  }
}
