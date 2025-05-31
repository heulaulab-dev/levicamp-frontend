export interface RescheduleRequest {
	booking_id: string;
}

export interface CreateRescheduleRequest {
	booking_id: string;
	token: string;
	tent_id: string[];
	start_date: string;
	end_date: string;
	reason: string;
}

export interface RescheduleResponse {
	status: number;
	message: string;
	data: {
		token: string;
		booking_id: string;
		expired_at: string;
		url: string;
	};
}

export interface CreateRescheduleResponse {
	status: number;
	message: string;
	data: Booking;
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
	email?: string;
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
	expired_at: string;
	created_at: string;
	updated_at: string;
}

export interface Tent {
	id: string;
	name: string;
	tent_images: string[];
	description: string;
	facilities: string[];
	category_id: string;
	category: Category;
	status: string;
	weekday_price: number;
	weekend_price: number;
	capacity: number;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

export interface Category {
	id: string;
	name: string;
	weekday_price: number;
	weekend_price: number;
	facilities: {
		capacities: string;
	};
	description: string;
	created_at: string;
	updated_at: string;
	deleted_at: string | null;
}

export interface RescheduleValidateResponse {
	status: number;
	message: string;
	data: {
		id: string;
		booking_id: string;
		booking: Booking;
		token: string;
		used: boolean;
		expired_at: string;
		created_at: string;
		updated_at: string;
		url: string;
	};
}

export interface RescheduleError {
	status: number;
	message: string;
	error: {
		code: string;
		description: string;
	};
}

export interface RescheduleStore {
	loading: boolean;
	error: Error | null;

	reset: () => void;
	requestReschedule: (bookingId: string) => Promise<RescheduleResponse>;
	validateReschedule: (token: string) => Promise<RescheduleValidateResponse>;
	createReschedule: (
		data: CreateRescheduleRequest,
	) => Promise<CreateRescheduleResponse>;
}
