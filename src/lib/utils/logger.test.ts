import { describe, it, expect, vi } from 'vitest';
import { logger } from './logger';

describe('Logger', () => {
	it('should log info messages', () => {
		const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
		logger.info('test message');
		expect(spy).toHaveBeenCalledOnce();
		expect(spy.mock.calls[0][0]).toContain('[INFO] test message');
		spy.mockRestore();
	});

	it('should log warn messages', () => {
		const spy = vi.spyOn(console, 'warn').mockImplementation(() => {});
		logger.warn('warning message');
		expect(spy).toHaveBeenCalledOnce();
		expect(spy.mock.calls[0][0]).toContain('[WARN] warning message');
		spy.mockRestore();
	});

	it('should log error messages', () => {
		const spy = vi.spyOn(console, 'error').mockImplementation(() => {});
		logger.error('error message');
		expect(spy).toHaveBeenCalledOnce();
		expect(spy.mock.calls[0][0]).toContain('[ERROR] error message');
		spy.mockRestore();
	});

	it('should redact sensitive values', () => {
		const spy = vi.spyOn(console, 'info').mockImplementation(() => {});
		logger.info('auth data', 'password: secret123');
		expect(spy.mock.calls[0][1]).toBe('password: [REDACTED]');
		spy.mockRestore();
	});
});
