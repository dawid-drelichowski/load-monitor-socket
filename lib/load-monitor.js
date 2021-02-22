import os from 'node:os';

export class LoadMonitor {
  static get cpuCount() {
    return os.cpus().length;
  }

  static get averageLoad() {
    return os.loadavg()[0] / LoadMonitor.cpuCount;
  }
}
