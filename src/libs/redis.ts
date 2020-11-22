import * as redis from 'redis';

const { promisify } = require('util');

const client = redis.createClient();

// tslint:disable-next-line:variable-name
const Redis = new class {
  public set: any;
  public get: any;

  constructor() {
    this.get = (...args: any) => {
      args[0] = `${process.env.HOST}:${args[0]}`;
      return promisify(client.get).bind(client)(...args);
    };
    this.set = (...args: any) => {
      args[0] = `${process.env.HOST}:${args[0]}`;
      return promisify(client.set).bind(client)(...args);
    };
  }

  async setnx(key: string, { val = 'val', expire = 10 }: { val?: string, expire?: number }) {

    if (!key) {
      throw new Error('Redis setnx key required');
    }

    return Boolean(await this.set(key, val, 'NX', 'EX', expire));
  }

  async setex(key: string, val = 'val', expire = 10) {

    if (!key) {
      throw new Error('Redis setex key required');
    }

    return Boolean(await this.set(key, val, 'EX', expire));
  }
};

client.on('error', (error) => {
  console.error('REDIS ERROR:', error);
});

export { Redis };
