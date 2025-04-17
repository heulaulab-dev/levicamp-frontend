import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Booking } from '@/types/reschedules';

interface ValidationData {
	id: string;
	token: string;
	used: boolean;
	expired_at: string;
}

export interface RescheduleDataStore {
	// Store booking data from validation response
	bookingData: Booking | null;
	// Store validation data
	validationData: ValidationData | null;
	// Derived invoice data
	invoiceData: {
		bookingId: string;
		paymentDate: string;
		guestName: string;
		guestEmail: string;
		guestPhone: string;
		guestCount: string;
		checkInDate: string;
		checkOutDate: string;
		tents: Array<{
			id: string;
			name: string;
			image: string;
			category: string;
			capacity: number;
			price: number;
		}>;
		totalPrice: number;
	} | null;
	// UI state
	showTentCollection: boolean;

	// Actions
	setRescheduleData: (
		bookingData: Booking,
		validationData: ValidationData,
	) => void;
	clearRescheduleData: () => void;
	setShowTentCollection: (show: boolean) => void;
}

export const useRescheduleData = create<RescheduleDataStore>()(
	persist(
		(set) => ({
			bookingData: null,
			validationData: null,
			invoiceData: null,
			showTentCollection: false,

			setRescheduleData: (bookingData, validationData) => {
				// Convert booking data to invoice format
				const invoiceData = bookingData
					? {
							bookingId: bookingData.id,
							paymentDate: bookingData.created_at,
							guestName: bookingData.guest.name,
							guestEmail: bookingData.guest.email,
							guestPhone: bookingData.guest.phone,
							guestCount: bookingData.detail_booking
								.reduce(
									(sum, detail) => sum + detail.reservation.tent.capacity,
									0,
								)
								.toString(),
							checkInDate: bookingData.start_date,
							checkOutDate: bookingData.end_date,
							tents: bookingData.detail_booking.map((detail) => ({
								id: detail.reservation.tent.id,
								name: detail.reservation.tent.name,
								image: detail.reservation.tent.tent_images[0] || '',
								category: detail.reservation.tent.category.name,
								capacity: detail.reservation.tent.capacity,
								price: detail.reservation.price,
							})),
							totalPrice: bookingData.total_amount,
					  }
					: null;

				set({
					bookingData,
					validationData,
					invoiceData,
					showTentCollection: false,
				});
			},

			clearRescheduleData: () => {
				set({
					bookingData: null,
					validationData: null,
					invoiceData: null,
					showTentCollection: false,
				});
			},

			setShowTentCollection: (show) => {
				set({ showTentCollection: show });
			},
		}),
		{
			name: 'reschedule-data',
		},
	),
);
