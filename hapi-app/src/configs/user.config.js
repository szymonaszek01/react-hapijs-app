const Joi = require('joi');

const userOptions = () => {
  return {
    validate: {
      payload: Joi.object({
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string()
          .required()
          .min(8)
          .max(200)
          .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')),
        firstname: Joi.string()
          .required(),
        lastname: Joi.string()
          .required(),
        age: Joi.number()
          .integer()
          .required()
          .min(18),
        phone_number: Joi.string()
          .required()
          .pattern(/^[0-9]{9,}$/),
      }),
      query: Joi.object({
        id: Joi.number()
          .integer()
          .min(1),
        email: Joi.string()
          .email(),
      }),
    },
  };
};

module.exports = {
  userOptions,
};