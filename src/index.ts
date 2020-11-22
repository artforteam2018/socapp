import * as Aliases from 'module-alias';
import * as DotEnv from 'dotenv';

Aliases.addAliases({
  utils: `${__dirname}/utils`,
  config: `${__dirname}/config.ts`,
  types: `${__dirname}/types`,
  models: `${__dirname}/db/models`,
  handlers: `${__dirname}/db/handlers`,
  controllers: `${__dirname}/controllers`,
  components: `${__dirname}/components`,
  modules: `${__dirname}/modules`,
  libs: `${__dirname}/libs`,
  constant: `${__dirname}/constant`,
});

DotEnv.config({
  path: process.env.NODE_ENV === 'development' ? '.env-development' : '.env',
});

require('./application').initialize();
