import * as Mongodb from 'mongoose';

Mongodb.connect(`mongodb://194.87.99.185:27017/${process.env.TEST ? 'books_test' : 'books'}`,
                { useNewUrlParser: true, useUnifiedTopology: true });

export {
  Mongodb,
};
