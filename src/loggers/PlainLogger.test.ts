import MockedFunction = jest.MockedFunction;
import { PlainLogger } from './PlainLogger';

const origConsoleLog = console.log;

const style1 = {
	color: 'black',
	background: 'white',
	css: 'color: black; background-color: white; font-weight: bold;'
};

const style2 = {
	color: 'white',
	background: 'black',
	css: 'color: white; background-color: black; font-weight: bold;'
};

describe('PlainLogger', () => {
	let consoleLog: MockedFunction<any>;

	beforeEach(() => {
		consoleLog = jest.fn();
		console.log = consoleLog;
	});

	afterEach(() => {
		consoleLog = origConsoleLog;
	});

	it('should call console.log with the correct arguments', () => {
		PlainLogger()('DEBUG', style1, 'comp', style2, 'Hello world');

		expect(consoleLog).toHaveBeenCalledWith('[ DEBUG ][ comp ]', 'Hello world');
	});

	it('should accept and use a custom log function', () => {
		const custLogFn = jest.fn();
		PlainLogger({ logFunction: custLogFn })(
			'DEBUG',
			style1,
			'comp',
			style2,
			'Hello world'
		);

		expect(custLogFn).toHaveBeenCalledWith('[ DEBUG ][ comp ]', 'Hello world');
		expect(consoleLog).not.toHaveBeenCalled();
	});
});
