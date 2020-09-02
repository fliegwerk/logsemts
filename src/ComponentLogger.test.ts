import {ComponentLogger} from './ComponentLogger';
import MockedFunction = jest.MockedFunction;

describe('ComponentLogger', () => {
	let logFn: MockedFunction<any>;
	let componentLogger: ComponentLogger;

	beforeEach(() => {
		logFn = jest.fn();
		componentLogger = new ComponentLogger(logFn);
	});

	it('should log debug messages', () => {
		componentLogger.debug('Test');

		expect(logFn).toHaveBeenCalled();
		expect(logFn).toMatchSnapshot();
	});
	it('should log success messages', () => {
		componentLogger.success('Test');

		expect(logFn).toHaveBeenCalled();
		expect(logFn).toMatchSnapshot();
	});
	it('should log waring messages', () => {
		componentLogger.warn('Test');

		expect(logFn).toHaveBeenCalled();
		expect(logFn).toMatchSnapshot();
	});
	it('should log error messages', () => {
		componentLogger.error('Test');

		expect(logFn).toHaveBeenCalled();
		expect(logFn).toMatchSnapshot();
	});
	it('should log info messages', () => {
		componentLogger.info('Test');

		expect(logFn).toHaveBeenCalled();
		expect(logFn).toMatchSnapshot();
	});
});
