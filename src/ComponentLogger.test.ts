import { ComponentLogger } from './ComponentLogger';
import MockedFunction = jest.MockedFunction;

describe('ComponentLogger', () => {
	let logFn: MockedFunction<any>;
	let componentLogger: ComponentLogger;

	beforeEach(() => {
		logFn = jest.fn();
		componentLogger = new ComponentLogger(logFn);
	});

	(['debug', 'success', 'warn', 'error', 'info'] as const).forEach(
		functionName =>
			it(`should log ${functionName} messages`, () => {
				componentLogger[functionName]('Test');

				expect(logFn).toHaveBeenCalled();
				expect(logFn).toMatchSnapshot();
			})
	);
});
