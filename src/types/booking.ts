import { Booking, Guest, DetailBooking } from './reservations';

export interface BookingResponseData {
	status: number;
	message: string;
	data: {
		booking: Booking;
		guest: Guest;
		reservations: DetailBooking[];
		total_booking_price: number;
	};
}