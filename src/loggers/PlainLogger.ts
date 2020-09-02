import { LogFunctionFactory } from '../types/LogFunctionFactory';
import { LogFunction } from '../types/LogFunction';

export interface PlainLoggerOptions {
	/**
	 * The function that logs the contents
	 * @param args
	 *
	 * @default `console.log`
	 */
	logFunction: (...args: any) => void;
}

/**
 * A {@link LogFunctionFactory} to log in environments that don't support color
 *
 * @return the {@link LogFunction}
 *
 *
 * @category LogFunction / LogFunction Factory
 * @see {@link LogFunction}
 *
 * @example ```ts
 * import { PlainLogger } from '@fliegwerk/logsemts';
 *
 * const loggers = [
 *     PlainLogger(), // a LogFunction to log into the browser dev tools
 *     PlainLogger({logFunction: myFunction}) // use myFunction instead of console.log
 * ];
 * ```
 */
export const PlainLogger: (
	options?: PlainLoggerOptions
) => LogFunction = options => {
	const finalLogFunction = options?.logFunction || console.log;

	return (type, style, componentName, componentStyle, ...args: any[]) => {
		finalLogFunction(`[ ${type} ][ ${componentName} ]`, ...args);
	};
};
