import fetch from 'cross-fetch';
import { WebhookLogger } from './WebhookLogger';
import { mocked } from 'ts-jest/utils';
import { serialize } from '../lib/cyclic-serializer';

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

describe('WebhookLogger', () => {
	beforeEach(() => {
		jest.mock('cross-fetch');
	});

	it('should call console.log with the correct arguments', () => {
		WebhookLogger({ address: 'http://localhost:8080' })(
			'DEBUG',
			style1,
			'comp',
			style2,
			'Hello world'
		);

		expect(mocked(fetch, true)).toHaveBeenCalledWith('http://localhost:8080', {
			body: serialize(['DEBUG', style1, 'comp', style2, 'Hello world']),
			method: 'POST'
		});
	});

	it('should not throw if an error occurs', () => {
		mocked(fetch, true).mockRejectedValue('rejection reason');

		WebhookLogger({ address: 'http://localhost:8080' })(
			'DEBUG',
			style1,
			'comp',
			style2,
			'Hello world'
		);

		expect(mocked(fetch, true)).toHaveBeenCalled();
	});
});
