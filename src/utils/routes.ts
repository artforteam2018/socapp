import { RequestWithContext } from 'types';
import * as Express from 'express';
import { handleRequest } from './handleRequest';

export class ObjRoute {
  public method: any;
  public path: any;
  public func: any;

  constructor(method: any, path: any, func: any) {
    this.method = method;
    this.path = path;
    this.func = func;
  }

  get() {
    return {
      method: this.method,
      path: this.path,
      f: (request: RequestWithContext, response: Express.Response) =>
        handleRequest(response, (new this.func(request)).exec(), 200),
    };
  }
}
