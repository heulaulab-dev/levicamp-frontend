import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Booking } from '@/types/refunds';

interface ValidationData {
	id: string;
	token: string;
	used: boolean;
	expired_at: string;
	refund_amount: number;
	refund_method: string;
	account_name: string;
	account_number: string;
	status: string;
	reason: string;
}

export interface RefundDataStore {
	// Store booking data from validation response
	bookingData: Booking | null;
	// Store validation data
	validationData: ValidationData | null;
	// Derived invoice data
	invoiceData: {
		bookingId: string;
		paymentDate: string;
		refundAmount: number;
		refundMethod: string;
		accountName: string;
		accountNumber: string;
		refundStatus: string;
		reason: string;
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

	// Actions
	setRefundData: (bookingData: Booking, validationData: ValidationData) => void;
	clearRefundData: () => void;
}

export const useRefundData = create<RefundDataStore>()(
	persist(
		(set) => ({
			bookingData: null,
			validationData: null,
			invoiceData: null,

			setRefundData: (bookingData, validationData) => {
				// Convert booking data to invoice format
				const invoiceData = bookingData
					? {
							bookingId: bookingData.id,
							paymentDate: bookingData.created_at,
							refundAmount: validationData.refund_amount,
							refundMethod: validationData.refund_method,
							accountName: validationData.account_name,
							accountNumber: validationData.account_number,
							refundStatus: validationData.status,
							reason: validationData.reason,
							guestName: bookingData.guest.name,
							guestEmail: bookingData.guest.email,
							guestPhone: bookingData.guest.phone,
							guestCount: bookingData.detail_booking.length.toString(),
							checkInDate: bookingData.start_date,
							checkOutDate: bookingData.end_date,
							tents: bookingData.detail_booking.map((detail) => ({
								id: detail.reservation.tent.id,
								name: detail.reservation.tent.name,
								image: detail.reservation.tent.tent_image || '',
								category: detail.reservation.tent.category.name,
								capacity: detail.reservation.tent.weekday_price > 0 ? 4 : 2, // Default capacity if not available
								price: detail.reservation.price,
							})),
							totalPrice: bookingData.total_amount,
					  }
					: null;

				set({
					bookingData,
					validationData,
					invoiceData,
				});
			},

			clearRefundData: () => {
				set({
					bookingData: null,
					validationData: null,
					invoiceData: null,
				});
			},
		}),
		{
			name: 'refund-data',
		},
	),
);
