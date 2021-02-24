export class ActionsHandler {
  #loadMonitor

  #timeout;

  #logger;

  constructor(loadMonitor, logger) {
    this.#loadMonitor = loadMonitor;
    this.#logger = logger
  }

  handle(socket) {
    socket.on('message', message => {
      let action;

      try {
        action = JSON.parse(message);
      } catch (error) {
        this.#logger('JSON parsing error:');
        this.#logger(error);
      }

      switch (action?.name) {
        case 'start':
          this.#start(socket, action?.interval)
          break;
        case 'stop':
          this.#stop();
          break;
      }
    });

    socket.on('close', () => this.#logger(`Connection closed at ${new Date()}`))
  }

  #start(socket, interval = 1000) {
    this.#send(socket); // To send first response immediately
    this.#timeout = setInterval(() => this.#send(socket), interval)
    this.#logger('Start action handled');
  }

  #stop() {
    clearInterval(this.#timeout);
    this.#logger('Stop action handled');
  }

  #send(socket) {
    socket.send(JSON.stringify({
      averageLoad: this.#loadMonitor.averageLoad,
      cpuCount: this.#loadMonitor.cpuCount
    }))
  }
}
