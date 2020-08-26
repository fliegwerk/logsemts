import Style from './types/Style';

/**
 * A logger for a specific component like _API Client_, _Message Provider_, or similar
 *
 * @internal
 *
 * @example ```ts
 * const = new ComponentLogger((type, style, ...args) => {
 *     const componentStyle = new Style(
 *         'red' // text color
 *         componentBackgroundColor // background color
 *     );
 *
 *     logFunction(type, style, componentName, componentStyle, ...args);
 * );
 * ```
 */
export default class ComponentLogger {
	/**
	 * @param semanticLogFunction A semantic log function that can already process the type and style of the semantic log type.
	 */
	constructor(
		private semanticLogFunction: (
			type: string,
			style: Style,
			...args: any[]
		) => void
	) {}

	/**
	 * Log some debug information
	 * @param args information that gets logged
	 */
	debug(...args: any[]) {
		this.semanticLogFunction('DEBUG', new Style('lightgray', 'black'), ...args);
	}

	/**
	 * Log some success information
	 * @param args information that gets logged
	 */
	success(...args: any[]) {
		this.semanticLogFunction('SUCCESS', new Style('white', 'green'), ...args);
	}

	/**
	 * Log an error
	 * @param args error information that gets logged
	 */
	error(...args: any[]) {
		this.semanticLogFunction('ERROR', new Style('white', 'red'), ...args);
	}

	/**
	 * Log a warning
	 * @param args warning that gets logged
	 */
	warn(...args: any[]) {
		this.semanticLogFunction('WARN', new Style('white', 'orange'), ...args);
	}

	/**
	 * Log some information
	 * @param args information that gets logged
	 */
	info(...args: any[]) {
		this.semanticLogFunction('INFO', new Style('white', 'black'), ...args);
	}
}
