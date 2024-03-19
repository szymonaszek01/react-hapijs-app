const { getCars } = require('../handlers/car.handler');

const carRoutes = [
  {
    method: 'GET',
    path: '/car',
    handler: getCars,
  },
];

module.exports = {
  carRoutes,
};