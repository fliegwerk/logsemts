import { BrowserLogger } from './BrowserLogger';
import MockedFunction = jest.MockedFunction;

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

describe('BrowserLogger', () => {
	let consoleLog: MockedFunction<any>;

	beforeEach(() => {
		consoleLog = jest.fn();
		console.log = consoleLog;
	});

	afterEach(() => {
		consoleLog = origConsoleLog;
	});

	it('should call console.log with the correct arguments', () => {
		BrowserLogger()('DEBUG', style1, 'comp', style2, 'Hello world');

		expect(consoleLog).toHaveBeenCalledWith(
			`%c DEBUG %c comp `,
			style1.css,
			style2.css,
			'Hello world'
		);
	});
});
