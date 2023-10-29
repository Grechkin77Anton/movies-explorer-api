const SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'diplom';
const MONGO_DB = 'mongodb://127.0.0.1:27017/bitfilmsdb';

module.exports = {
  SECRET_KEY,
  MONGO_DB,
};
