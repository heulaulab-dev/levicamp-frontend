import { describe, expect, test } from 'bun:test';
import { formatToK, formatCurrency, formatExpiryDate } from '@/lib/format';

describe('Format Functions', () => {
	describe('formatToK', () => {
		test('should format numbers less than 1000 as is', () => {
			expect(formatToK(0)).toBe('0');
			expect(formatToK(1)).toBe('1');
			expect(formatToK(999)).toBe('999');
		});

		test('should format numbers between 1000 and 999999 as K', () => {
			expect(formatToK(1000)).toBe('1K');
			expect(formatToK(1500)).toBe('1K');
			expect(formatToK(9999)).toBe('10K');
			expect(formatToK(10000)).toBe('10K');
			expect(formatToK(100000)).toBe('100K');
			expect(formatToK(999999)).toBe('1000K');
		});

		test('should format numbers >= 1000000 as M', () => {
			expect(formatToK(1000000)).toBe('1.0M');
			expect(formatToK(1500000)).toBe('1.5M');
			expect(formatToK(10000000)).toBe('10.0M');
		});
	});

	describe('formatCurrency', () => {
		test('should format currency in Indonesian Rupiah format', () => {
			expect(formatCurrency(0)).toBe('Rp0');
			expect(formatCurrency(1000)).toBe('Rp1.000');
			expect(formatCurrency(1000000)).toBe('Rp1.000.000');
			expect(formatCurrency(1500500)).toBe('Rp1.500.500');
		});

		test('should not include decimal places', () => {
			expect(formatCurrency(1000.5)).toBe('Rp1.000');
			expect(formatCurrency(1500.75)).toBe('Rp1.501');
		});

		test('should handle negative values', () => {
			expect(formatCurrency(-1000)).toBe('-Rp1.000');
			expect(formatCurrency(-1500000)).toBe('-Rp1.500.000');
		});
	});

	describe('formatExpiryDate', () => {
		test('should format date string to Indonesian format', () => {
			// Mock date with a fixed timestamp to ensure consistent testing
			const dateString = '2023-04-15T14:30:00.000Z';

			// The exact output depends on the browser's locale implementation
			// We'll test that it contains the expected parts rather than the exact string
			const formatted = formatExpiryDate(dateString);

			// Testing in a more resilient way
			expect(formatted).toContain('15'); // Day
			expect(formatted).toContain('2023'); // Year

			// Check if it contains time (hour and minute)
			const hasTimeFormat =
				/\d{2}:\d{2}/.test(formatted) || /\d{2}\.\d{2}/.test(formatted);
			expect(hasTimeFormat).toBe(true);
		});

		test('should handle different date formats', () => {
			// Test with different date formats
			const dates = [
				'2025-01-01T00:00:00.000Z',
				'2024-12-31T23:59:59.000Z',
				'2023-06-15T08:30:00.000Z',
			];

			for (const dateString of dates) {
				const formatted = formatExpiryDate(dateString);
				expect(typeof formatted).toBe('string');
				expect(formatted.length).toBeGreaterThan(0);
			}
		});
	});
});
