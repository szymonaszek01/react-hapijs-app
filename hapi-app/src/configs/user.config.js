const Joi = require('joi');

const userOptions = () => {
  return {
    validation: {
      payload: {
        email: Joi.string()
          .required()
          .email(),
        password: Joi.string()
          .required()
          .min(8)
          .max(200)
          .pattern(new RegExp('^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})')),
        firstname: Joi.string(),
        lastname: Joi.string(),
        age: Joi.number().integer(),
        phone_number: Joi.string()
          .required()
          .pattern(/^[0-9]{9,}$/),
      },
      query: {
        id: Joi.number()
          .integer()
          .min(1),
        email: Joi.string()
          .email(),
      },
    },
  };
};

module.exports = {
  userOptions,
};