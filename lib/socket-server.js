import { WebSocketServer } from 'ws';
import { createActionsHandler } from './actions-handler.js';
import { logger } from './logger.js';

export function createSocketServer(port) {
  const server = new WebSocketServer({ port });
  const connections = new Set();

  return {
    start: () => {
      server.on('connection', (socket) => {
        connections.add(socket);
        logger.info(`New connection started at ${new Date()}`);
        logger.info(`Active connections ${connections.size}`);

        socket.on('close', () => {
          connections.delete(socket);
          logger.info(`Connection closed at ${new Date()}`);
          logger.info(`Active connections ${connections.size}`);
        });
        createActionsHandler(socket).start();
      });
    },
    stop: () => {
      server.close(() => {
        connections.clear();
        logger.info('WebSocket server stoped');
      });
    },
  };
}
