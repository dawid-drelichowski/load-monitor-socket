import { cpuCount, averageLoad } from './load-monitor.js';
import { logger } from './logger.js';

function send(socket) {
  socket.send(
    JSON.stringify({
      averageLoad: averageLoad(),
      cpuCount: cpuCount(),
    }),
  );
}

function actions(socket) {
  let timeout;

  return {
    start: (interval = 1000) => {
      send(socket); // To send first response immediately
      timeout = setInterval(() => send(socket), interval);
      logger.info('Start action handled');
    },
    stop: () => {
      clearInterval(timeout);
      logger.info('Stop action handled');
    },
  };
}

function messageToAction(message) {
  try {
    return JSON.parse(message);
  } catch (error) {
    logger.error('JSON parsing error:');
    logger.error(error);
  }
}
function createMessageHandler(socket) {
  const { start, stop } = actions(socket);

  return (message) => {
    const action = messageToAction(message);

    switch (action?.name) {
      case 'start':
        start(action?.interval);
        break;
      case 'stop':
        stop();
        break;
      default:
        logger.error(
          action?.name
            ? `Unknown action: ${action?.name}`
            : 'No action provided',
        );
    }
  };
}

export function createActionsHandler(socket) {
  const handle = createMessageHandler(socket);
  return {
    start: () => socket.on('message', handle),
    stop: () => socket.off('message', handle),
  };
}
