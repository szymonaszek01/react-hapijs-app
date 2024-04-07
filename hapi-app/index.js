'use strict';

const Hapi = require('@hapi/hapi');
const HapiAuthJwt2 = require('hapi-auth-jwt2');
const { userRoutes } = require('./src/routes/user.routes');
const { authRoutes } = require('./src/routes/auth.routes');
const { carRoutes } = require('./src/routes/car.routes');
const { jwtFilter } = require('./src/security/jwt.filter');

const init = async () => {
  const server = Hapi.server({
    port: 5432,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  await server.register(HapiAuthJwt2);
  server.auth.strategy('jwt', 'jwt', jwtFilter);

  server.route([]
    .concat(userRoutes)
    .concat(authRoutes)
    .concat(carRoutes),
  );

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();