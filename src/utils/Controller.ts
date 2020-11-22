import { Err, RequestWithContext } from 'types';
import { IncomingHttpHeaders } from 'http';
import { logger } from 'utils';
import * as Ajv from 'ajv';

export class Controller {
  public body: any;
  public headers: IncomingHttpHeaders;
  public ctx: any;
  public params: any;
  public req: RequestWithContext;
  public schema: any;

  constructor(request: RequestWithContext) {
    this.req = request;
    this.body = request.body;
    this.headers = request.headers;
    this.ctx = request.context;
    this.params = request.params;
  }

  async exec() {
    try {
      if (this.schema) Controller.validate(this.schema, this.body);
      return await this.run();
    } catch (e) {
      if (e instanceof Err) {
        throw e;
      }
      throw new Err();
    }
  }

  private static validate(schema: object, body: object) {
    const ajv = new Ajv();

    if (!ajv.validate(schema, body)) {
      console.error('validation error', schema, body);
      throw new Err({ msg: 'Ошибка валидации', code: 'validation_error' });
    }
  }

  async run() {

  }
}
