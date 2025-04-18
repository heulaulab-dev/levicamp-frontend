import { create } from 'zustand';
import {
	RefundStore,
	RefundRequest,
	RefundResponse,
	RefundError,
	RefundValidateResponse,
	CreateRefundRequest,
	CreateRefundResponse,
} from '@/types/refunds';
import api from '@/lib/api';
import { AxiosError } from 'axios';

export const useRefund = create<RefundStore>((set) => ({
	loading: false,
	error: null,

	reset: () => {
		set({
			loading: false,
			error: null,
		});
	},

	requestRefund: async (bookingId: string): Promise<RefundResponse> => {
		set({ loading: true, error: null });

		try {
			const requestData: RefundRequest = {
				booking_id: bookingId,
			};

			const response = await api.post<RefundResponse>(
				'/refunds/request',
				requestData,
			);

			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<RefundError>;
			const errorResponse: RefundError = axiosError.response?.data || {
				status: 500,
				message:
					error instanceof Error ? error.message : 'Failed to request refund',
				error: {
					code: 'UNKNOWN_ERROR',
					description: 'An unexpected error occurred while requesting refund',
				},
			};

			const err = new Error(
				errorResponse.error.description || 'Failed to request refund',
			);
			set({ error: err });
			throw errorResponse;
		} finally {
			set({ loading: false });
		}
	},

	validateRefund: async (token: string): Promise<RefundValidateResponse> => {
		set({ loading: true, error: null });

		try {
			const response = await api.get<RefundValidateResponse>(
				'/refunds/validate',
				{ params: { token } },
			);

			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<RefundError>;
			const errorResponse: RefundError = axiosError.response?.data || {
				status: 500,
				message:
					error instanceof Error
						? error.message
						: 'Failed to validate refund token',
				error: {
					code: 'UNKNOWN_ERROR',
					description:
						'An unexpected error occurred while validating refund token',
				},
			};

			const err = new Error(
				errorResponse.error.description || 'Failed to validate refund token',
			);
			set({ error: err });
			throw errorResponse;
		} finally {
			set({ loading: false });
		}
	},

	createRefund: async (
		data: CreateRefundRequest,
	): Promise<CreateRefundResponse> => {
		set({ loading: true, error: null });

		try {
			const response = await api.post<CreateRefundResponse>('/refunds', data);

			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<RefundError>;
			const errorResponse: RefundError = axiosError.response?.data || {
				status: 500,
				message:
					error instanceof Error ? error.message : 'Failed to create refund',
				error: {
					code: 'UNKNOWN_ERROR',
					description: 'An unexpected error occurred while creating refund',
				},
			};

			const err = new Error(
				errorResponse.error.description || 'Failed to create refund',
			);
			set({ error: err });
			throw errorResponse;
		} finally {
			set({ loading: false });
		}
	},
}));
