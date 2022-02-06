import { createServer } from 'http';
import { Configuration } from './utility/config';
import { appInstance } from './server';

const onListening = (): void => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const addr: any = server.address();
  const bind = typeof Configuration.PORT === 'string' ? `Pipe ${addr}` : `Port ${addr.port}`;
  console.log(`Server listening on ${bind}`);
};

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const onError = (error: any): void => {
  if (error.syscall !== 'listen') {
    throw error;
  }
  const bind = typeof Configuration.PORT === 'string' ? `Pipe ${Configuration.PORT}` : `Port ${Configuration.PORT}`;

  // eslint-disable-next-line sonarjs/no-small-switch
  switch (error.code) {
    case 'EADDRINUSE':
      console.error(`${bind} is already in use`);
      break;
    default:
      throw error;
  }
};

const server = createServer(appInstance.app);

server.listen(Configuration.PORT);

server.on('error', onError);

server.on('listening', onListening);
