import { noti } from 'modules';

export const logger = new class {

  constructor() {
  }

  async send(type: String, data: { msg: String, stack: String }) {
    return noti.sendLog(type, { id: '1', msg: data.msg.slice(0, 1023) });
  }
};
