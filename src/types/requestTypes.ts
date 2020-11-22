// tslint:disable-next-line:variable-name
export const Su = (data?: any) => ({
  data,
  type: 'su',
});

export class Err extends Error {
  msg: String;
  code: String;
  status: number;

  constructor({ msg = 'Техническая ошибка', code = 'unhandled error', status = 400 }:
                { msg?: string, code?: String, status?: number } = {}) {
    super(msg);
    this.stack = new Error().stack;
    this.msg = msg;
    this.code = code;
    this.status = status;
    Object.setPrototypeOf(this, Err.prototype);
  }
}
