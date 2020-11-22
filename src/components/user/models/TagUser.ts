import { elastic } from 'libs';

export const tagUser = new class extends elastic {
  index: string;

  constructor() {
    super();
    this.index = 'user_tags';
  }
};
