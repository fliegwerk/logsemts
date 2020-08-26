import randomColor from 'randomcolor';
import Style from './types/Style';
import ComponentLogger from './ComponentLogger';
import { Options } from './types/Options';
import BrowserLogger from './BrowserLogger';

const componentBackgroundColor = 'lightgray';

/**
 * A semantic logger written in TypeScript
 *
 * Manages a number of LogFunctions, to which logs get passed. These can, e.g., log the entries to the browser console or send it to a remote database.
 *
 * For each subsystem (e.g., an _API Client_), a new component logger gets used which can be fetched using `getComponentLogger()`.
 *
 * This {@link ComponentLogger} then contains multiple semantic logging functions including `success()`, `debug()` and `error()`.
 *
 * The console output is color-coded. The semantic log levels have pre-defined colors and the components get color-coded with a color that's from their name.
 *
 * @see {@link ComponentLogger}
 * @see {@link LogFunction}
 *
 * @example ```ts
 * import Logger, {BrowserLogger} from '@fliegwerk/logsemts';
 *
 * const logger = new Logger({loggers: [BrowserLogger]});
 * logger.getSubsystemLogger('API Client').success('fetched API data');
 * ```
 */
export default class Logger {
	/**
	 * The component loggers that were already created.
	 */
	private availableLoggers: { [key: string]: ComponentLogger } = {};

	/**
	 * Create a new logger. Usually gets used only once per application (as a singleton)
	 * @param options
	 */
	constructor(private options: Options) {}

	getSubsystemLogger(componentName: string) {
		// build new subsystem logger if no one is available
		if (!this.availableLoggers[componentName]) {
			this.availableLoggers[componentName] = new ComponentLogger(
				(type, style, ...args) => {
					const componentStyle = new Style(
						randomColor({ luminosity: 'dark', seed: componentName }),
						componentBackgroundColor
					);

					for (let fn of this.options.loggers)
						fn(type, style, componentName, componentStyle, ...args);
				}
			);
			this.getSubsystemLogger('Logger').debug('Created logger', componentName);
		}

		return this.availableLoggers[componentName];
	}
}

export { BrowserLogger };
