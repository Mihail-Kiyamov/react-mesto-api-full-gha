const router = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const {
  getAllCards,
  deleteCard,
  createCard,
  likeCard,
  dislikeCard,
} = require('../controllers/cards');

router.get('/', getAllCards);
router.delete('/:id', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);
router.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().regex(/https?:\/\/(www\.)?[0-9a-z.\-_~:/?#[\]@!$&'()*+,;=]+\.[0-9a-z.\-_~:/?#[\]@!$&'()*+,;=]+#?$/).required(),
  }),
}), createCard);
router.put('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), likeCard);
router.delete('/:id/likes', celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().length(24).required(),
  }),
}), dislikeCard);

module.exports = router;
