# @fliegwerk/logsemts - A modular, semantic logger written in TypeScript

[npm package](https://npmjs.com/package/@fliegwerk/logsemts)
| [Library Documentation](https://fliegwerk.github.io/logsemts)
| ![CI](https://github.com/fliegwerk/logsemts/workflows/CI/badge.svg)
| ![ShiftLeft Scan](https://github.com/fliegwerk/logsemts/workflows/ShiftLeft%20Scan/badge.svg)
| ![CodeQL](https://github.com/fliegwerk/logsemts/workflows/CodeQL/badge.svg)
| [![Coverage Status](https://coveralls.io/repos/github/fliegwerk/logsemts/badge.svg?branch=master)](https://coveralls.io/github/fliegwerk/logsemts?branch=master)

A modular, color-coded, TypeScript-based semantic logger that can be used in NodeJS, the browser and in many other scenarios.

## Example

```ts
// Import the logger:
import Logger, {BrowserLogger} from '@fliegwerk/logsemts';

// Create a new logger
const logger = new Logger({
    loggers: [BrowserLogger()] // that exclusively outputs to the browser dev tools
});

// get a new subsystem logger for the API Client
const apiClientLogger = logger.getComponentLogger('API Client'); 

// log a success message 
apiClientLogger.success('Data fetched successfully');
```

## Installation
```shell script
$ npm install @fliegwerk/logsemts
```

or

```shell script
$ yarn add @fliegwerk/logsemts
```
