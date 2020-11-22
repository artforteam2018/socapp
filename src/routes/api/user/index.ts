import { ObjRoute } from '../../../utils/routes';
import * as Controllers from 'controllers';

export const routes = [
  new ObjRoute('post', '/api/confirm', Controllers.User.Auth.Confirm),
  new ObjRoute('post', '/api/user/update', Controllers.User.Auth.Update),
  new ObjRoute('post', '/api/auth', Controllers.User.Auth.Auth),
];
