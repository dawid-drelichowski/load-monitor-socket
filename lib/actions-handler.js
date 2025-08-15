import { cpuCount, averageLoad } from './load-monitor.js';
import { logger } from './logger.js';

export class ActionsHandler {
  #timeout;

  handle(socket) {
    socket.on('message', (message) => {
      let action;

      try {
        action = JSON.parse(message);
      } catch (error) {
        logger.error('JSON parsing error:');
        logger.error(error);
      }

      switch (action?.name) {
        case 'start':
          this.#start(socket, action?.interval);
          break;
        case 'stop':
          this.#stop();
          break;
      }
    });

    socket.on('close', () => logger.log(`Connection closed at ${new Date()}`));
  }

  #start(socket, interval = 1000) {
    this.#send(socket); // To send first response immediately
    this.#timeout = setInterval(() => this.#send(socket), interval);
    logger.log('Start action handled');
  }

  #stop() {
    clearInterval(this.#timeout);
    logger.log('Stop action handled');
  }

  #send(socket) {
    socket.send(
      JSON.stringify({
        averageLoad: averageLoad(),
        cpuCount: cpuCount(),
      }),
    );
  }
}
