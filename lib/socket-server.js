import { WebSocketServer } from 'ws';
import { ActionsHandler } from './actions-handler.js';
import { logger } from './logger.js';

export function createSocketServer(port) {
  const server = new WebSocketServer({ port });
  const actionsHandler = new ActionsHandler(logger);

  return {
    start: () => {
      server.on('connection', (socket) => {
        logger.log(`New connection started at ${new Date()}`);
        actionsHandler.handle(socket);
      });
    },
    close: () => {
      server.close(() => {
        logger.log('WebSocket server closed');
      });
    },
  };
}
