export interface RefundRequest {
	booking_id: string;
}

export interface RefundResponse {
	status: number;
	message: string;
	data: {
		token: string;
		booking_id: string;
		expired_at: string;
		url: string;
	};
}

export interface CreateRefundRequest {
	token: string;
	reason: string;
	refund_method: string;
	account_name: string;
	account_number: string;
}

export interface CreateRefundResponse {
	status: number;
	message: string;
	data: {
		id: string;
		booking_id: string;
		booking: Booking;
		refund_amount: number;
		refund_method: string;
		account_name: string;
		account_number: string;
		status: string;
		reason: string;
		token: string;
		used: boolean;
		request_count: number;
		completed_by: string;
		completed_at: string;
		expired_at: string;
		created_at: string;
		updated_at: string;
	};
}

export interface RefundValidateResponse {
	status: number;
	message: string;
	data: {
		id: string;
		booking_id: string;
		booking: Booking;
		refund_amount: number;
		refund_method: string;
		account_name: string;
		account_number: string;
		status: string;
		reason: string;
		token: string;
		used: boolean;
		request_count: number;
		completed_by: string;
		completed_at: string;
		expired_at: string;
		created_at: string;
		updated_at: string;
	};
}

export interface Booking {
	id: string;
	guest_id: string;
	guest: Guest;
	total_amount: number;
	start_date: string;
	end_date: string;
	status: string;
	detail_booking: Array<DetailBooking>;
	created_at: string;
	updated_at: string;
}

export interface Guest {
	id: string;
	name: string;
	email: string;
	phone: string;
	address: string;
	created_at: string;
	updated_at: string;
}

export interface DetailBooking {
	id: string;
	booking_id: string;
	reservation_id: string;
	reservation: Reservation;
	created_at: string;
	updated_at: string;
}

export interface Reservation {
	id: string;
	start_date: string;
	end_date: string;
	price: number;
	tent_id: string;
	tent: Tent;
	guest_id: string;
	check_in: string | null;
	check_out: string | null;
	status: string;
	created_at: string;
	updated_at: string;
}

export interface Tent {
	id: string;
	name: string;
	tent_image: string;
	description: string;
	facilities: string[];
	category_id: string;
	category: Category;
	status: string;
	weekday_price: number;
	weekend_price: number;
	created_at: string;
	updated_at: string;
}

export interface Category {
	id: string;
	name: string;
	weekday_price: number;
	weekend_price: number;
	facilities: null | { [key: string]: string };
	description: string;
	created_at: string;
	updated_at: string;
}

export interface RefundError {
	status: number;
	message: string;
	error: {
		code: string;
		description: string;
	};
}

export interface RefundStore {
	loading: boolean;
	error: Error | null;

	reset: () => void;
	requestRefund: (bookingId: string) => Promise<RefundResponse>;
	validateRefund: (token: string) => Promise<RefundValidateResponse>;
	createRefund: (data: CreateRefundRequest) => Promise<CreateRefundResponse>;
}
