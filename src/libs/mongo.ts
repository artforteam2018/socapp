import * as Mongodb from 'mongoose';

Mongodb.connect(`mongodb://0.0.0.0:27017/${process.env.TEST ? 'books_test' : 'books'}`,
                { useNewUrlParser: true, useUnifiedTopology: true });

export {
  Mongodb,
};
