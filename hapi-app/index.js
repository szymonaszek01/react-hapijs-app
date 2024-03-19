'use strict';

const Hapi = require('@hapi/hapi');
const { userRoutes } = require('./src/routes/user.routes');
const { authRoutes } = require('./src/routes/auth.routes');
const { carRoutes } = require('./src/routes/car.routes');

const init = async () => {
  const server = Hapi.server({
    port: 5432,
    host: 'localhost',
    routes: {
      cors: true,
    },
  });

  server.route([]
    .concat(userRoutes)
    .concat(authRoutes)
    .concat(carRoutes)
  );

  await server.start();
  console.log('Server running on %s', server.info.uri);
};

process.on('unhandledRejection', (err) => {
  console.log(err);
  process.exit(1);
});

init();