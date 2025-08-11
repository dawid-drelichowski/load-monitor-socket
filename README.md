# Load monitor WebSocket server

WebSocket server which emits an average CPU load on Unix.

## Requirements

- [Node.js](https://nodejs.org) (tested with version `22.18.0`) or [Deno](https://deno.land/)
- [NPM](https://www.npmjs.com/) (tested with version `10.9.2`) or [Yarn](https://yarnpkg.com/), [PNPM](https://pnpm.js.org/)

## Installation

Please run following command:

```commandline
npm ci
```

## Configuration

You can change socket server port in [config.js](config.js) file.

## Run socket server

Just run following command:

```commandline
npm start
```

## Code formatting

To format code you can run:

```commandline
npm format
```

## Code linting

To lint your changes please use:

```commandline
npm lint
```

## Improvements

This is a very basic implementation of socket server, it should be improved a bit.
What is missing?

- [ ] Better error handling
- [ ] Better logging
- [ ] Unit tests
- [ ] E2E tests
- [ ] Security audit or audit tool(s) usage
- [ ] CI/CD pipeline
- [ ] Git hooks for linting, formatting, etc.
