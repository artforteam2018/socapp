import * as Url from 'url';
import * as Utils from 'utils';
import { RequestHandler, Response } from 'express';
import { RequestWithContext } from 'types';
import { cUser } from 'components';

export const access: RequestHandler =
  async (request: RequestWithContext, response: Response, next: Function) => {
    request.context = {};
    request.context.ua = request.headers['user-agent'];
    request.context.app = 'findUCompany-web';
    request.context.token = request.headers['user-token'];

    const parameters = Url.parse(request.url);
    const accessDeniedMessage = 'Access denied.';
    if (parameters.path.indexOf('/api/user/') === 0) {

      if (!request.context.token) {
        return Utils.handleRequest(response, accessDeniedMessage, 401);
      }

      const dbUser = await cUser.checkToken(request.context);

      if (!dbUser) {
        return Utils.handleRequest(response, accessDeniedMessage, 401);
      }
      request.context.User = dbUser;
    }
    return next();
  };
