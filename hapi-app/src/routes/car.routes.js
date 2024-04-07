const { getCars } = require('../handlers/car.handler');

const carRoutes = [
  {
    method: 'GET',
    path: '/car',
    handler: getCars,
    config: {
      auth: {
        strategy: 'jwt',
        scope: ['user'],
      },
    },
  },
];

module.exports = {
  carRoutes,
};