import { cpus, loadavg } from 'node:os';

export function cpuCount() {
  return cpus().length;
}

export function averageLoad() {
  return loadavg()[0] / cpuCount();
}
