import LogFunction from './LogFunction';

/**
 * Builds a {@link LogFunction}
 * @param options for the log function
 * @return the {@link LogFunction}
 */
type LogFunctionFactory = (...args: any[]) => LogFunction;

export default LogFunctionFactory;
