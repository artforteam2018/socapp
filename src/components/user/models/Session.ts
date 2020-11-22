import { model, Schema } from 'mongoose';

const sessionScheme = new Schema({
  token: String,
  app: String,
  user_id: String,
  date_create: String,
  date_update: String,
  next_update: String,
  last_device: String,
});

sessionScheme.methods.forUser = function () {
  return {
    token: this.token,
    next_update: this.next_update,
  };
};

export const session = model<any>('Session', sessionScheme);
