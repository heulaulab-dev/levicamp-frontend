/**
 * session-store.ts
 *
 * Thin wrapper around sessionStorage with SSR safety.
 * Use for data that must survive a page refresh but die when the tab closes —
 * payment flows, booking responses, OTP tokens.
 *
 * For long-lived data (preferences, cart state) use localStorage via Zustand persist.
 */

export const SESSION_KEYS = {
	BOOKING_RESPONSE: 'booking_response',
	PAYMENT_DATA: 'payment_data',
} as const;

export type SessionKey = (typeof SESSION_KEYS)[keyof typeof SESSION_KEYS];

function isBrowser(): boolean {
	return typeof window !== 'undefined';
}

export function setSessionData(key: string, data: unknown): void {
	if (!isBrowser()) return;
	try {
		sessionStorage.setItem(key, JSON.stringify(data));
	} catch (e) {
		console.warn(`[session-store] Failed to set "${key}":`, e);
	}
}

export function getSessionData<T>(key: string): T | null {
	if (!isBrowser()) return null;
	try {
		const raw = sessionStorage.getItem(key);
		if (raw === null) return null;
		return JSON.parse(raw) as T;
	} catch {
		return null;
	}
}

export function clearSessionData(key: string): void {
	if (!isBrowser()) return;
	try {
		sessionStorage.removeItem(key);
	} catch (e) {
		console.warn(`[session-store] Failed to clear "${key}":`, e);
	}
}