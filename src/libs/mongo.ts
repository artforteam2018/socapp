import * as Mongodb from 'mongoose';

Mongodb.connect(`mongodb://localhost:27017/${process.env.TEST ? 'books_test' : 'books'}`,
                { useNewUrlParser: true, useUnifiedTopology: true });

export {
  Mongodb,
};
