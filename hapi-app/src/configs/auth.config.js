const Joi = require('joi');

const authOptions = () => {
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
      }),
    },
  };
};

module.exports = {
  authOptions,
};