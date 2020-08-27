import LogFunctionFactory from '../types/LogFunctionFactory';
import LogFunction from '../types/LogFunction';

/**
 * A {@link LogFunctionFactory} to log the the browser developer tools
 *
 * @return the {@link LogFunction}
 *
 * @category LogFunction / LogFunction Factory
 * @see {@link LogFunction}
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
