import { WebSocketServer } from 'ws';
import { LoadMonitor } from './load-monitor.js';
import { ActionsHandler } from './actions-handler.js';

const logger = console.log;

export function createSocketServer(port) {
  const server = new WebSocketServer({ port });
  const actionsHandler = new ActionsHandler(LoadMonitor, logger);

  return {
    start: () => {
      server.on('connection', (socket) => {
        logger(`New connection started at ${new Date()}`);
        actionsHandler.handle(socket);
      });
    },
    close: () => {
      server.close(() => {
        logger('WebSocket server closed');
      });
    },
  };
}
