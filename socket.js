import WebSocket from 'ws';
import { LoadMonitor } from './lib/load-monitor.js';
import { config } from './config.js';
import { ActionsHandler } from "./lib/actions-handler.js";

const logger = console.log;
const server = new WebSocket.Server({ port: config.serverPort });
const actionsHandler = new ActionsHandler(LoadMonitor, logger);

server.on('connection', socket => {
  logger(`Connection started at ${new Date()}`);
  actionsHandler.handle(socket);
});

server.on('close', () => {
  logger(`Connection ended at ${new Date()}`);
})
