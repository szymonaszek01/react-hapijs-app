const { createUser, getUserById, getUserByEmail } = require('../handlers/user.handler');
const { userOptions } = require('../configs/user.config');

const userRoutes = [
  {
    method: 'POST',
    path: '/user',
    options: {
      validate: {
        payload: userOptions().validate.payload,
      },
    },
    handler: createUser,
  },
  {
    method: 'GET',
    path: '/user/id/{id}',
    options: {
      validate: {
        query: userOptions().validate.query,
      },
    },
    handler: getUserById,
  },
  {
    method: 'GET',
    path: '/user/email/{email}',
    options: {
      validate: {
        query: userOptions().validate.query,
      },
    },
    handler: getUserByEmail,
  },
];

module.exports = {
  userRoutes,
};