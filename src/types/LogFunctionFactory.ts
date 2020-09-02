import { LogFunction } from './LogFunction';

/**
 * Builds a {@link LogFunction}
 * @param options for the log function
 * @return the {@link LogFunction}
 */
export type LogFunctionFactory = (...args: any[]) => LogFunction;
