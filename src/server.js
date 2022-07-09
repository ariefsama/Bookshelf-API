/* eslint-disable import/extensions */
import Hapi from '@hapi/hapi';
import { routes } from './routes.js';

const init = async () => {
  const server = Hapi.server({
    host: 'localhost',
    port: 5000,
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  server.route(routes);

  await server.start();
  console.log(`Server sedang berjalan pada ${server.info.uri}`);
};

init();
