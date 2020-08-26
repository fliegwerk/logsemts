# Changelog
All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]
### Added
- `ChalkLogger` - a [chalk](https://github.com/chalk/chalk) based logger for NodeJS environments:
  ```ts
  import { ChalkLogger } from '@fliegwerk/logsemts';
  import chalk from 'chalk';
 
  const loggers = [
      ChalkLogger(chalk) // generates a new LogFunction using the chalk object
  ];
  ```
### Changed
- moved `BrowserLogger.ts` to `src/loggers` folder
- updated `BrowserLogger` documentation
### Deprecated
### Removed
### Fixed
### Security
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

[Unreleased]: https://github.com/fliegwerk/logsemts/compare/v0.2.0...HEAD
[0.1.2]: https://github.com/fliegwerk/logsemts/compare/v0.1.1...v0.1.2
[0.1.3]: https://github.com/fliegwerk/logsemts/compare/v0.1.2...v0.1.3
[0.1.4]: https://github.com/fliegwerk/logsemts/compare/v0.1.3...v0.1.4
[0.2.0]: https://github.com/fliegwerk/logsemts/compare/v0.1.4...v0.2.0
