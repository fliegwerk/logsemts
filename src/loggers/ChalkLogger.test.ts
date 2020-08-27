import ChalkLogger from './ChalkLogger';
import { StyleInterface } from '../types/Style';

import ch from 'chalk';
jest.mock('chalk');
import { mocked } from 'ts-jest/utils';
import Mock = jest.Mock;

const origLog = console.log;

const style1: StyleInterface = {
	background: 'red',
	css: '',
	color: '#fff'
};

const style2: StyleInterface = {
	color: 'green',
	background: '#ffffff',
	css: ''
};

const invalidStyle = {
	color: 'thiscolordoesnotexist',
	background: 'thiscolordoesnotexist',
	css: ''
};

describe('ChalkLogger', () => {
	let mockLog: Mock<any, any>;

	beforeEach(() => {
		mockLog = jest.fn();
		console.log = mockLog;
	});

	afterEach(() => {
		console.log = origLog;
	});

	it('should log valid inputs correctly', () => {
		ChalkLogger(mocked(ch))(
			'TEST',
			style1,
			'ChalkLogger Test',
			style2,
			'Hello world'
		);

		expect(mockLog).toHaveBeenCalled();
		expect(mockLog).toMatchSnapshot();
	});

	it('should ignore invalid color names', () => {
		ChalkLogger(mocked(ch))(
			'Test',
			invalidStyle,
			'ChalkLogger Test',
			invalidStyle,
			'Hello world'
		);
		expect(mockLog).toMatchSnapshot();
	});
});
