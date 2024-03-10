const { createUser, getUserById, getUserByEmail } = require('../handlers/user.handler');
const { userOptions } = require('../configs/user.config');
const Joi = require('joi');

const userRoutes = [
  {
    method: 'POST',
    path: '/user',
    options: {
      validate: {
        payload: Joi.object(userOptions().validation.payload),
      },
    },
    handler: createUser,
  },
  {
    method: 'GET',
    path: '/user/id/{id}',
    options: {
      validate: {
        query: Joi.object(userOptions().validation.query),
      },
    },
    handler: getUserById,
  },
  {
    method: 'GET',
    path: '/user/email/{email}',
    options: {
      validate: {
        query: Joi.object(userOptions().validation.query),
      },
    },
    handler: getUserByEmail,
  },
];

module.exports = {
  userRoutes,
};