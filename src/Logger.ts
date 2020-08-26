import randomColor from 'randomcolor';
import Style from './types/Style';
import ComponentLogger from './ComponentLogger';
import { Options } from './types/Options';
import BrowserLogger from './BrowserLogger';

const componentBackgroundColor = 'lightgray';

export default class Logger {
	private availableLoggers: { [key: string]: ComponentLogger } = {};

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
