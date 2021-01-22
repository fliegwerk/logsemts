import { LogFunction, LogFunctionFactory } from '../types';

/**
 * A {@link LogFunctionFactory} to log the the browser developer tools
 *
 * See: {@link LogFunction}
 *
 * @returns the {@link LogFunction}
 *
 * @category LogFunction / LogFunction Factory
 *
 * @example ```ts
 * import { BrowserLogger } from '@fliegwerk/logsemts';
 *
 * const loggers = [
 *     BrowserLogger() // a LogFunction to log into the browser dev tools
 * ];
 * ```
 */
export const BrowserLogger: () => LogFunction = () => (
	type,
	style,
	componentName,
	componentStyle,
	...args: any[]
) => {
	console.log(
		`%c ${type} %c ${componentName} `,
		style.css,
		componentStyle.css,
		...args
	);
};
