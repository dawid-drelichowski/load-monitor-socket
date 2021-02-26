# Load monitor WebSocket server

WebSocket server which emits an average CPU load on Unix.

## Requirements

- [Node.js](https://nodejs.org) (tested with version `14.15.5`) or [Deno](https://deno.land/)
- [NPM](https://www.npmjs.com/) (tested with version `7.6.0`) or [Yarn](https://yarnpkg.com/), [PNPM](https://pnpm.js.org/)

## Installation

Please run following command in project directory:

```commandline
npm i
```

## Configuration

You can change socket server port in [config.js](config.js) file.

## Run socket server

Just run following command, in project directory:

```commandline
npm start
```
## Improvements

This is a very basic implementation of socket server, it should be improved a bit.
What is missing?

- [ ] Better error handling
- [ ] Better logging
- [ ] Unit tests
- [ ] E2E tests
- [ ] Security audit or audit tool(s) usage
- [ ] Code linter and formatter
- [ ] CI/CD pipeline
- [ ] Git hooks for linting, formatting, etc.
