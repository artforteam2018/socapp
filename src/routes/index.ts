import * as Express from 'express';
import * as Api from './api';

export const initialize = (application: Express.Application) => {

  Api.routes.map((route) => {
    const r = route.get();
    // @ts-ignore
    application[r.method](r.path, r.f);
  });

};
