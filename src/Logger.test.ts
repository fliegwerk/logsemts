import Logger, { BrowserLogger } from './Logger';

describe('Logger', () => {
	beforeEach(() => {
		jest.mock('randomcolor');
	});

	it('should log to the console', () => {
		const logFn = jest.fn();

		const logger = new Logger({
			loggers: [logFn]
		});
		logger.getSubsystemLogger('Test Component').debug('Hello world');

		expect(logFn).toHaveBeenCalled();
	});
});
