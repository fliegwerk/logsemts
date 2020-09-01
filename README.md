<p align="center">
<img alt="LogSemTS Logo" height="300" src="assets/logo.png" />
</p>

# @fliegwerk/logsemts - A modular, semantic logger written in TypeScript

[npm package](https://npmjs.com/package/@fliegwerk/logsemts)
| [Library Documentation](https://fliegwerk.github.io/logsemts)
| ![CI](https://github.com/fliegwerk/logsemts/workflows/CI/badge.svg)
| ![ShiftLeft Scan](https://github.com/fliegwerk/logsemts/workflows/ShiftLeft%20Scan/badge.svg)
| ![CodeQL](https://github.com/fliegwerk/logsemts/workflows/CodeQL/badge.svg)
| [![Coverage Status](https://coveralls.io/repos/github/fliegwerk/logsemts/badge.svg?branch=master)](https://coveralls.io/github/fliegwerk/logsemts?branch=master)
[![Rate on Openbase](https://badges.openbase.io/js/rating/@fliegwerk/logsemts.svg)](https://openbase.io/js/@fliegwerk/logsemts?utm_source=embedded&utm_medium=badge&utm_campaign=rate-badge)

A modular, color-coded, TypeScript-based semantic logger that can be used in NodeJS, the browser and in many other scenarios.

## Example

```ts
// Import the logger:
import Logger, { BrowserLogger } from '@fliegwerk/logsemts';

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

## Concept

![Concept Overview Diagram](assets/drawio/concept-overview.png)

There are three primary components in logsemts:

- _Component Loggers_: Logger objects for specific subsystems (for example, an API connector and a login form).
  These objects contain functions like `.log()`, `.debug()`, `.warn()`, etc. to log messages regarding this subsystem.
- _Log Functions_: Functions that log a message to a specific target. Targets could be the Browser's Developer tools, a
  Database and an API.
- _Core_: The library's core consists of the `Logger` class. Usually, only one instance of that class gets used in an
  application. It manages the different components (_Component Loggers_ get created using the
  `logger.getComponentLogger(name)` function) and _Log Functions_. It also forwards the messages from the _Component
  Loggers_ to the registered _Log Functions_.
