import LogFunction from './LogFunction';

/**
 * Options for a logger
 *
 * @see {@link Logger}
 */
export interface Options {
	/**
	 * The `LogFunction`s to which log messages get forwarded.
	 *
	 * @see {@link LogFunction}
	 * @see {@link Logger}
	 */
	loggers: LogFunction[];
}
