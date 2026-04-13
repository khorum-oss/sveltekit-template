const LOG_LEVELS = ['debug', 'info', 'warn', 'error'] as const;
type LogLevel = (typeof LOG_LEVELS)[number];

const currentLevel: LogLevel = 'info';

function shouldLog(level: LogLevel): boolean {
	return LOG_LEVELS.indexOf(level) >= LOG_LEVELS.indexOf(currentLevel);
}

function sanitize(value: unknown): unknown {
	if (typeof value === 'string') {
		return value.replace(
			/(password|token|secret|authorization|cookie)(["\s:=]+)([^\s"&]+)/gi,
			'$1$2[REDACTED]'
		);
	}
	return value;
}

function log(level: LogLevel, message: string, ...args: unknown[]) {
	if (!shouldLog(level)) return;
	const sanitizedArgs = args.map(sanitize);
	const timestamp = new Date().toISOString();
	const prefix = `[${timestamp}] [${level.toUpperCase()}]`;
	console[level === 'debug' ? 'log' : level](`${prefix} ${message}`, ...sanitizedArgs);
}

export const logger = {
	debug: (msg: string, ...args: unknown[]) => log('debug', msg, ...args),
	info: (msg: string, ...args: unknown[]) => log('info', msg, ...args),
	warn: (msg: string, ...args: unknown[]) => log('warn', msg, ...args),
	error: (msg: string, ...args: unknown[]) => log('error', msg, ...args)
};
