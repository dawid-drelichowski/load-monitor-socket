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
  }

  #start(socket, interval) {
    this.#timeout = setInterval(() => {
      socket.send(JSON.stringify({
        averageLoad: this.#loadMonitor.averageLoad,
        cpuCount: this.#loadMonitor.cpuCount
      }))
    }, interval ?? 1000)
  }

  #stop() {
    clearInterval(this.#timeout);
  }
}
