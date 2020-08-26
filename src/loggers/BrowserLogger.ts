import LogFunction from '../types/LogFunction';

/**
 * A {@link LogFunction} to log the the browser developer tools
 *
 * @see {@link LogFunction}
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
