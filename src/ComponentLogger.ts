import LogFunction from './types/LogFunction';
import Style from './types/Style';

/**
 * A logger for a specific component
 */
export default class ComponentLogger {
	constructor(private logFunction: LogFunction) {}

	debug(...args: any[]) {
		this.logFunction('DEBUG', new Style('lightgray', 'black'), ...args);
	}

	success(...args: any[]) {
		this.logFunction('SUCCESS', new Style('white', 'green'), ...args);
	}

	error(...args: any[]) {
		this.logFunction('ERROR', new Style('white', 'red'), ...args);
	}

	warn(...args: any[]) {
		this.logFunction('WARN', new Style('white', 'orange'), ...args);
	}

	info(...args: any[]) {
		this.logFunction('INFO', new Style('white', 'black'), ...args);
	}
}
