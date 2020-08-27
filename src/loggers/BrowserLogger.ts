import LogFunction from '../types/LogFunction';

/**
 * A {@link LogFunction} to log the the browser developer tools
 *
 * @category LogFunction / LogFunction Factory
 * @see {@link LogFunction}
 *
 * @example ```ts
 * import { BrowserLogger } from '@fliegwerk/logsemts';
 *
 * const loggers = [
 *     BrowserLogger // a LogFunction to log into the browser dev tools
 * ];
 * ```
 */
const BrowserLogger: LogFunction = (
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

export default BrowserLogger;
