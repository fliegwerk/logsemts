import { LogFunctionFactory } from '../types';
import { LogFunction } from '../types';
import { serialize } from '../lib/cyclic-serializer';
import fetch from 'cross-fetch';

/**
 * Options for the {@link WebhookLogger}
 */
export interface WebhookLoggerOptions {
	/**
	 * the address to which the `POST` requests for logs get sent
	 */
	address: string;
}

/**
 * A {@link LogFunctionFactory} to send serialized form of message to a specific web address in a POST request
 *
 * @return the {@link LogFunction}
 *
 *
 * @category LogFunction / LogFunction Factory
 * @see {@link LogFunction}
 * @see {@link serialize}
 * @see {@link WebhookLoggerOptions}
 *
 * @example ```ts
 * import { WebhookLogger } from '@fliegwerk/logsemts';
 *
 * const loggers = [
 *     // sends a serialized JSON form of the message to the specified address
 *     WebHookLogger({address: 'http://localhost:8080'})
 * ];
 * ```
 */
export const WebhookLogger: (
	options: WebhookLoggerOptions
) => LogFunction = options => {
	return (...args: any[]) => {
		fetch(options.address, {
			body: serialize(args),
			method: 'POST'
		})
			.then()
			.catch(() => {});
	};
};
