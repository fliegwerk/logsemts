import LogFunction from './LogFunction';

export interface Options {
	remoteUrl?: string;
	loggers: LogFunction[];
}
