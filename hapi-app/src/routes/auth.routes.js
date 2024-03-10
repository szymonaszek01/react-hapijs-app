const { signIn, signUp } = require('../handlers/auth.handler');
const { userOptions } = require('../configs/user.config');
const Joi = require('joi');

const authRoutes = [
  {
    method: 'POST',
    path: '/auth/sign-in',
    options: {
      validate: {
        payload: Joi.object({
          email: userOptions().validation.payload.email,
          password: userOptions().validation.payload.password,
        }),
      },
    },
    handler: signIn,
  },
  {
    method: 'POST',
    path: '/auth/sign-up',
    options: {
      validate: {
        payload: Joi.object(userOptions().validation.payload),
      },
    },
    handler: signUp,
  },
];

module.exports = {
  authRoutes,
};