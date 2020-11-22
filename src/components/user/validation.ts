import { Err } from 'types';

export const validate = (field: string, value: any) => {
  let matched: [];
  switch (field) {
    case 'login':
      matched = value.match(/[a-zA-Z\d\.]/g);
      if (!matched) {
        throw new Err({ msg: 'Неправильное имя пользователя', code: 'validation_error' });
      }
      break;
    case 'phone':
      const phone = value
        .replace(/[ \(\)-]/g, '')
        .replace(/.*(\d{10})/, '$1');

      if (!phone.match(/\d*/)) {
        throw new Err({ msg: 'Неправильный номер телефона', code: 'validation_error' });
      }
      return phone;
    case 'name':
      matched = value.match(/[\w\d\.]/g);
      if (!matched) {
        throw new Err({ msg: 'Неправильный логин', code: 'validation_error' });
      }
      break;
    case 'age':
      if (isNaN(value) || value > 100 || value < 18) {
        throw new Err({ msg: 'Неправильный возраст', code: 'validation_error' });
      }
      break;
    case 'password':
      if (value.length < 8 || value.length > 20 || !value.match(/[a-zA-Z\d]/g)) {
        throw new Err({ msg: 'Неправильный пароль', code: 'validation_error' });
      }
      break;
    default:
      throw new Err();
  }

  return value;
};
