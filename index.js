import { createSocketServer } from './lib/socket-server.js';
import { config } from './config.js';

const server = createSocketServer(config.serverPort);
server.start();
