import * as Http from 'http';
import * as Express from 'express';
import * as Cors from 'cors';
import * as BodyParser from 'body-parser';
import * as Middlewares from './middlewares';
import * as Routes from './routes';
import { config } from 'config';
import * as Utils from 'utils';

export const initialize = () => {
  console.info('Starting FINDUCOMPANY back app...');

  const application: Express.Application = Express();

  application.use(Cors());
  application.use(BodyParser.json({ limit: '5mb' }));
  application.use(Middlewares.headers);
  application.use(Middlewares.access);

  const server = Http.createServer(application);

  Utils.initIO(server);

  Routes.initialize(application);

  application.listen(config.express.port);
  server.listen(config.express.ioPort);
  console.log(`OK, application is running on port ${config.express.port}.`);

};
