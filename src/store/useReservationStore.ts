import { create } from 'zustand';
import { persist } from 'zustand/middleware';

import { BookingResponseData } from '@/types/booking';
import { PaymentDetails } from '@/types/payments';
import {
	clearSessionData,
	getSessionData,
	setSessionData,
	SESSION_KEYS,
} from '@/lib/session-store';

/* ─────────────────────────────────────────────────────────────────────────────
   State shape — two tiers:

   PERSISTED (survives page refresh, stored in localStorage):
     reservationData     — selected tents + dates + totalPrice (user-chosen, non-sensitive)
     personalInfo       — name, phone, email, address (user-entered, non-sensitive)
     hasSubmittedPersonalInfo — tracks whether personal info step was completed

   SESSION-ONLY (survives page refresh via sessionStorage, dies on tab close):
     paymentData              — payment channel + amount (sensitive)
     bookingResponseData       — full API response with booking ID + guest details (sensitive)
     These are NOT in localStorage persist. Instead they are synced to sessionStorage
     so a refresh reads them back into the store via getSessionData() on init.
   ───────────────────────────────────────────────────────────────────────────── */

export interface PersonalInfoData {
	name: string;
	phone: string;
	email?: string;
	guestCount: string;
	address: string;
	source: string;
	agreeToTerms: boolean;
	agreeToPrivacy: boolean;
}

export interface ReservationData {
	selectedTents: Array<{
		id: string;
		name: string;
		tent_images: string[];
		category?: {
			name: string;
		};
		capacity: number;
		weekday_price?: number;
		weekend_price?: number;
		api_price?: number;
	}>;
	checkInDate?: Date;
	checkOutDate?: Date;
	totalPrice: number;
	isLoadingPrices?: boolean;
}

interface ReservationStore {
	// ── Persisted (localStorage) ────────────────────────────────────────────
	reservationData: ReservationData | null;
	setReservationData: (data: ReservationData) => void;
	clearReservationData: () => void;

	personalInfo: PersonalInfoData | null;
	setPersonalInfo: (data: PersonalInfoData) => void;
	clearPersonalInfo: () => void;
	hasSubmittedPersonalInfo: boolean;
	setHasSubmittedPersonalInfo: (value: boolean) => void;

	// ── Session-only (survives refresh via sessionStorage, not localStorage) ─
	/** Payment channel + details. Survives refresh, reset on tab close. */
	paymentData: PaymentDetails | null;
	setPaymentData: (data: PaymentDetails) => void;
	clearPaymentData: () => void;

	/** Full booking API response including bookingId and guest data. Survives refresh. */
	bookingResponseData: BookingResponseData | null;
	setBookingResponseData: (data: BookingResponseData) => void;
	clearBookingResponseData: () => void;
}

export const useReservationStore = create<ReservationStore>()(
	persist(
		(set) => ({
			// Persisted
			reservationData: null,
			setReservationData: (data) => set({ reservationData: data }),
			clearReservationData: () => set({ reservationData: null }),

			personalInfo: null,
			setPersonalInfo: (data) =>
				set({
					personalInfo: data,
					hasSubmittedPersonalInfo: true,
				}),
			clearPersonalInfo: () =>
				set({
					personalInfo: null,
					hasSubmittedPersonalInfo: false,
				}),
			hasSubmittedPersonalInfo: false,
			setHasSubmittedPersonalInfo: (value) =>
				set({ hasSubmittedPersonalInfo: value }),

			// Session-only: seed from sessionStorage so refresh rehydrates correctly
			paymentData: getSessionData<PaymentDetails>(SESSION_KEYS.PAYMENT_DATA),
			setPaymentData: (data) => {
				set({ paymentData: data });
				setSessionData(SESSION_KEYS.PAYMENT_DATA, data);
			},
			clearPaymentData: () => {
				set({ paymentData: null });
				clearSessionData(SESSION_KEYS.PAYMENT_DATA);
			},

			bookingResponseData: getSessionData<BookingResponseData | null>(
				SESSION_KEYS.BOOKING_RESPONSE,
			),
			setBookingResponseData: (data) => {
				set({ bookingResponseData: data });
				setSessionData(SESSION_KEYS.BOOKING_RESPONSE, data);
			},
			clearBookingResponseData: () => {
				set({ bookingResponseData: null });
				clearSessionData(SESSION_KEYS.BOOKING_RESPONSE);
			},
		}),
		{
			name: 'reservation-storage',
			// Only persist UI / user-choice state.
			// paymentData and bookingResponseData are handled via sessionStorage instead.
			partialize: (state) => ({
				reservationData: state.reservationData,
				personalInfo: state.personalInfo,
				hasSubmittedPersonalInfo: state.hasSubmittedPersonalInfo,
				// paymentData intentionally omitted — stored in sessionStorage
				// bookingResponseData intentionally omitted — stored in sessionStorage
			}),
		},
	),
);