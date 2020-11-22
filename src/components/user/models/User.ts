import { model, Schema } from 'mongoose';

const userScheme = new Schema<any>({
  name: String,
  login: String,
  age: Number,
  phone: String,
  gender: Number,
});

userScheme.methods.forUser = function () {
  return {
    name: this.name,
    login: this.login,
    age: this.age,
    phone: this.phone,
    gender: this.gender,
  };
};

export const user = model<any>('User', userScheme);
