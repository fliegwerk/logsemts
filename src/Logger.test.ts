import Logger from './Logger';

describe('Logger', () => {
	beforeEach(() => {
		jest.mock('randomcolor');
	});

	it('should log to the console', () => {
		const logFn = jest.fn();

		const logger = new Logger({
			loggers: [logFn]
		});
		logger.getComponentLogger('Test Component').debug('Hello world');

		expect(logFn).toHaveBeenCalled();
		expect(logFn).toMatchSnapshot();
	});
});
