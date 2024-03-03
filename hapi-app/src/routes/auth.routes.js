const { signIn } = require('../handlers/auth.handler');
const { authOptions } = require('../configs/auth.config');

const authRoutes = [
  {
    method: 'POST',
    path: '/auth/sign-in',
    options: {
      validate: {
        payload: authOptions().validate.payload,
      },
    },
    handler: signIn,
  },
];

module.exports = {
  authRoutes,
};