const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');

const {
  editDataUser,
  getMeData,
} = require('../controllers/users');

router.get('/me', getMeData);

router.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    email: Joi.string().required().email(),
  }),
}), editDataUser);

module.exports = router;
