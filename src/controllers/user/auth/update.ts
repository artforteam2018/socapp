import { Controller } from 'utils';
import { Su } from 'types';
import { cUser } from 'components';

export class Update extends Controller {

  get schema() {
    return {
      type: 'object',
      required: ['login'],
    };
  }

  async run(): Promise<any> {
    const data = this.body;

    for (const field of Object.keys(data)) {
      data[field] = cUser.validate(field, data[field]);
    }

    await cUser.models.user.updateOne(
      { _id: this.ctx.User._id }, data);

    const user = await cUser.models.user.findOne({ _id: this.ctx.User._id });

    return user.forUser();

  }
}
