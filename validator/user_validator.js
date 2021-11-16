const Joi = require('joi');

const {
  variables: {
    EMAIL_REGEXP,
    PASSWORD_REGEXP
  }
} = require('../config');

const create = Joi.object({
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required(),
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required(),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim()
    .required(),
  password: Joi.string()
    .regex(PASSWORD_REGEXP)
    .required(),
  email: Joi.string()
    .regex(EMAIL_REGEXP)
    .trim()
    .required()
});

const update = Joi.object({
  userName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim(),
  firstName: Joi.string()
    .alphanum()
    .min(3)
    .max(30),
  lastName: Joi.string()
    .alphanum()
    .min(3)
    .max(30)
    .trim(),
  email: Joi.string()
    .regex(EMAIL_REGEXP),
  password: Joi.string()
    .regex(PASSWORD_REGEXP)
});

const auth = Joi.object({
  email: Joi.string()
    .regex(EMAIL_REGEXP)
    .trim()
    .required(),
  password: Joi.string()
    .regex(PASSWORD_REGEXP)
    .trim()
    .required()
});

module.exports = {
  create,
  update,
  auth
};
