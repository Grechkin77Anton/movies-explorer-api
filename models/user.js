const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/unauthorizedError');
// const ForbiddenError = require('../errors/forbiddenError');

const userSchema = new mongoose.Schema({
  name: { // у пользователя есть имя — опишем требования к имени в схеме:
    type: String, // имя — это строка
    minlength: [2, 'Минимальная длина имени — 2 символа'],
    maxlength: [30, 'Максимальная — 30 символов'],
    required: [true, 'Обязательное поле'],
  },
  email: {
    type: String,
    require: [true, 'Поле обязательно для заполнения'],
    unique: true,
    validate: {
      validator: function checkEmail(email) {
        return email && validator.isEmail(email);
        // return /^\S+@\S+\.\S+$/.test(email);
      },
      message: 'Введите корректный email',
    },
  },
  password: {
    type: String,
    require: [true, 'Поле обязательно для заполнения'],
    select: false,
  },
}, { versionKey: false });

userSchema.statics.findUserByCredentials = async function findUserByCredentials(email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError('Неправильные почта или пароль');
      }

      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError('Неправильные почта или пароль');
          }

          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
