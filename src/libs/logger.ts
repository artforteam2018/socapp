import { elastic } from 'libs';

declare global {
  namespace NodeJS {
    interface Global {
      Logger: any;
    }
  }
}

global.Logger = new class extends elastic {
  index: string;
  protected fields: string[];

  constructor() {
    super();
    this.index = 'logger';
    this.fields = ['message', 'error', 'date'];
  }

  log(message: string, data: any, type: string) {
    switch (type) {
      case 'error':
        console.error(message, data);
        break;
      case 'info':
        console.info(message, data);
        break;
      case 'log':
        console.log(message, data);
        break;
    }
  }

  error(data: any) {
    let message = '';
    if (data.message) {
      message = data.message;
      delete data.message;
    }
    this.insert({ message, error: data });
    this.log(message, data, 'error');
  }
};
