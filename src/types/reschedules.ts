import { DateRange } from 'react-day-picker';
import { Category } from './reservations';

export interface ReservationTent {
	id: string;
	name: string;
	tent_images: string[];
	description: string;
	facilities: string[];
	category_id: string;
	category?: {
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
	};
	status: string;
	weekday_price: number;
	weekend_price: number;
	created_at: string;
	updated_at: string;
}

export interface Reservation {
	id: string;
	start_date: string;
	end_date: string;
	price: number;
	tent_id: string;
	tent: ReservationTent;
	guest_id: string;
	check_in: string | null;
	check_out: string | null;
	status: string;
	expired_at: string;
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

export interface Booking {
	id: string;
	guest_id: string;
	total_amount: number;
	start_date: string;
	end_date: string;
	status: string;
	detail_booking: DetailBooking[];
	created_at: string;
	updated_at: string;
}

export interface RescheduleRequest {
	booking_id: string;
}

export interface RescheduleRequestResponse {
	status: number;
	message: string;
	error?: {
		code: string;
		description: string;
	};
	data?: {
		token: string;
		booking_id: string;
		expired_at: string;
		url: string;
	};
}

export interface RescheduleValidationResponse {
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
	};
}

export interface RescheduleCreateRequest {
	booking_id: string;
	token: string;
	tent_id: string[];
	start_date: string;
	end_date: string;
}

export interface RescheduleCreateResponse {
	status: number;
	message: string;
	data: Booking;
}

export interface RescheduleData {
	selectedTents: Array<{
		id: string;
		name: string;
		tent_image: string;
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

export interface RescheduleStore {
	loading: boolean;
	error: string | null;
	bookingData: Booking | null;
	requestData: RescheduleRequestResponse['data'] | null;
	validationData: RescheduleValidationResponse['data'] | null;
	date: DateRange | undefined;
	selectedTents: string[];
	tentCategories: Category[] | null;
	rescheduleData: RescheduleData | null;

	// Actions
	resetState: () => void;
	setDate: (date: DateRange | undefined) => void;
	setSelectedTents: (tentIds: string[]) => void;
	addSelectedTent: (tentId: string) => void;
	removeSelectedTent: (tentId: string) => void;
	setTentCategories: (categories: Category[] | null) => void;
	setRescheduleData: (data: RescheduleData) => void;
	clearRescheduleData: () => void;

	// API calls
	requestReschedule: (bookingId: string) => Promise<RescheduleRequestResponse>;
	validateRescheduleToken: (
		token: string,
	) => Promise<RescheduleValidationResponse>;
	createReschedule: (
		data: RescheduleCreateRequest,
	) => Promise<RescheduleCreateResponse>;
	searchAvailableTents: () => Promise<Category[] | null>;

	// Helper methods
	prepareRescheduleData: (
		bookingId: string,
		token: string,
	) => RescheduleCreateRequest;
}
