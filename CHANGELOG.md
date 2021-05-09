# Changelog

All notable changes to this project will be documented in this file. See [standard-version](https://github.com/conventional-changelog/standard-version) for commit guidelines.

### [0.4.2](https://github.com/fliegwerk/logsemts/compare/v0.4.1...v0.4.2) (2021-05-09)


### Bug Fixes

* **serializer:** Use `toISOString` for JSON `Date` representation ([0b03deb](https://github.com/fliegwerk/logsemts/commit/0b03deb264ea19732876da0b6654edd7b53c945d))

### [0.4.1](https://github.com/fliegwerk/logsemts/compare/v0.4.0-0...v0.4.1) (2021-05-09)


### Features

* **serializer:** Add support for `Date` objects ([d5b8344](https://github.com/fliegwerk/logsemts/commit/d5b83446dea49fa9e4f80b90618b4a14b3715feb))

## [0.4.0] - 2020-09-15
### Changed
- improved `README.md`
### Security
- Updated `cross-fetch` to resolve vulnerability in its dependency `node-fetch`
## [0.4.0-0] - 2020-09-02
### Added
- UMD-support
- compilation using rollup.js
### Changed
- changed default exports to normal exports for better compatibility
- renamed `Options` to `LoggerOptions`
- moved types to exported `types` namespace:
- `interface LoggerOptions`
- `class Style`
- `interface StyleInterface`
- `type LogFunctionFactory`
- `type LogFunction`
### Fixed
- added `ComponentLogger` to the documentation
## [0.3.0] - 2020-09-01
## [0.3.0-7] - 2020-08-31

### Added

- logo
- `PlainLogger` - a `LogFunctionFactory` for environments with no color support:

```ts
import { PlainLogger } from '@fliegwerk/logsemts';

const loggers = [
PlainLogger(), // a LogFunction to log into the browser dev tools
PlainLogger({ logFunction: myFunction }) // use myFunction instead of console.log
];
```

- `WebhookLogger` - a `LogFunctionFactory` to send serialized form of message to a specific web address in a POST request

```ts
import { WebhookLogger } from '@fliegwerk/logsemts';

const loggers = [
// sends a serialized JSON form of the message to the specified address
WebHookLogger({ address: 'http://localhost:8080' })
];
```

- documentation of library concept to the `README.md`

## [0.3.0-6] - 2020-08-27

## [0.3.0-5] - 2020-08-27

## [0.3.0-4] - 2020-08-27

## [0.3.0-3] - 2020-08-27

## [0.3.0-2] - 2020-08-27

## [0.3.0-1] - 2020-08-27

### Changed

- npm publishing logic

## [0.3.0-0] - 2020-08-27

### Breaking changes

- made `BrowserLogger` a `LogFunctionFactory` (`() => LogFunction`) for consistency.

**Upgrade instructions:**
To upgrade, replace `BrowserLogger` with `BrowserLogger()` in your code.

### Added

- `ChalkLogger` - a [chalk](https://github.com/chalk/chalk) based logger for NodeJS environments:

```ts
import { ChalkLogger } from '@fliegwerk/logsemts';
import chalk from 'chalk';

const loggers = [
ChalkLogger(chalk) // generates a new LogFunction using the chalk object
];
```

- `Logger.getComponentLogger` - replaces `Logger.getSubsystemLogger`
- `serialize()` and `deserialize()` - serializer that supports cyclic structures (`a['b']['a'] === a`) for sending objects in logs over network
- better CI release automation

### Changed

- moved `BrowserLogger.ts` to `src/loggers` folder
- updated `BrowserLogger` documentation
- Terminology: _subsystem_ => _component_
- documentation style
- enhanced documentation

### Deprecated

- `Logger.getSubsystemLogger` - use `Logger.getComponentLogger` instead

## [0.2.0] - 2020-08-26

### Added

- documentation
- README
- Coverage reporting to coveralls.io
- keywords to `package.json`

## [0.1.4] - 2020-08-26

### Added

- CHANGELOG (using the fliegwerk CHANGELOG tool)

### Changed

- removed unnecessary files from npm package
- updated dependencies

## [0.1.3] - 2020-06-14

### Fixed

- package issues

## [0.1.2] - 2020-06-14

### Fixed

- package issues

## v0.1.1 - 2020-08-26

Initial prerelease.

[unreleased]: https://github.com/fliegwerk/logsemts/compare/v0.3.0-6...HEAD
[0.1.2]: https://github.com/fliegwerk/logsemts/compare/v0.1.1...v0.1.2
[0.1.3]: https://github.com/fliegwerk/logsemts/compare/v0.1.2...v0.1.3
[0.1.4]: https://github.com/fliegwerk/logsemts/compare/v0.1.3...v0.1.4
[0.2.0]: https://github.com/fliegwerk/logsemts/compare/v0.1.4...v0.2.0
[0.3.0-0]: https://github.com/fliegwerk/logsemts/compare/v0.2.0...v0.3.0-0
[0.3.0-1]: https://github.com/fliegwerk/logsemts/compare/v0.3.0-0...v0.3.0-1
[0.3.0-2]: https://github.com/fliegwerk/logsemts/compare/v0.3.0-1...v0.3.0-2
[0.3.0-3]: https://github.com/fliegwerk/logsemts/compare/v0.3.0-2...v0.3.0-3
[0.3.0-4]: https://github.com/fliegwerk/logsemts/compare/v0.3.0-3...v0.3.0-4
[0.3.0-5]: https://github.com/fliegwerk/logsemts/compare/v0.3.0-4...v0.3.0-5
[0.3.0-6]: https://github.com/fliegwerk/logsemts/compare/v0.3.0-5...v0.3.0-6
[0.3.0-7]: https://github.com/fliegwerk/logsemts/compare/v0.3.0-6...v0.3.0-7
[0.3.0]: https://github.com/fliegwerk/logsemts/compare/v0.3.0-7...v0.3.0
[0.4.0-0]: https://github.com/fliegwerk/logsemts/compare/v0.3.0...v0.4.0-0
[0.4.0]: https://github.com/fliegwerk/logsemts/compare/v0.4.0-0...v0.4.0
