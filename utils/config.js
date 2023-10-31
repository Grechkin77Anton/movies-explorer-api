const SECRET_KEY = process.env.NODE_ENV === 'production' ? process.env.SECRET_KEY : 'diplom';

module.exports = {
  SECRET_KEY,
};
