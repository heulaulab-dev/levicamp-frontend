import { AxiosError } from 'axios';
import { create } from 'zustand';

import api from '@/lib/api';
import {
	CreateRescheduleRequest,
	CreateRescheduleResponse,
	RescheduleError,
	RescheduleRequest,
	RescheduleResponse,
	RescheduleStore,
	RescheduleValidateResponse,
} from '@/types/reschedules';

export const useReschedules = create<RescheduleStore>((set) => ({
	loading: false,
	error: null,

	reset: () => {
		set({
			loading: false,
			error: null,
		});
	},

	requestReschedule: async (bookingId: string): Promise<RescheduleResponse> => {
		set({ loading: true, error: null });

		try {
			const requestData: RescheduleRequest = {
				booking_id: bookingId,
			};

			const response = await api.post<RescheduleResponse>(
				'/reschedules/request',
				requestData,
			);

			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<RescheduleError>;
			const errorResponse: RescheduleError = axiosError.response?.data || {
				status: 500,
				message:
					error instanceof Error
						? error.message
						: 'Failed to request reschedule',
				error: {
					code: 'UNKNOWN_ERROR',
					description:
						'An unexpected error occurred while requesting reschedule',
				},
			};

			const err = new Error(
				errorResponse.error.description || 'Failed to request reschedule',
			);
			set({ error: err });
			throw errorResponse;
		} finally {
			set({ loading: false });
		}
	},

	validateReschedule: async (
		token: string,
	): Promise<RescheduleValidateResponse> => {
		set({ loading: true, error: null });

		try {
			const response = await api.get<RescheduleValidateResponse>(
				'/reschedules/validate',
				{ params: { token } },
			);

			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<RescheduleError>;
			const errorResponse: RescheduleError = axiosError.response?.data || {
				status: 500,
				message:
					error instanceof Error
						? error.message
						: 'Failed to validate reschedule token',
				error: {
					code: 'UNKNOWN_ERROR',
					description:
						'An unexpected error occurred while validating reschedule token',
				},
			};

			const err = new Error(
				errorResponse.error.description ||
					'Failed to validate reschedule token',
			);
			set({ error: err });
			throw errorResponse;
		} finally {
			set({ loading: false });
		}
	},

	createReschedule: async (
		data: CreateRescheduleRequest,
	): Promise<CreateRescheduleResponse> => {
		set({ loading: true, error: null });

		try {
			const response = await api.post<CreateRescheduleResponse>(
				'/reschedules',
				data,
			);

			return response.data;
		} catch (error: unknown) {
			const axiosError = error as AxiosError<RescheduleError>;
			const errorResponse: RescheduleError = axiosError.response?.data || {
				status: 500,
				message:
					error instanceof Error
						? error.message
						: 'Failed to create reschedule',
				error: {
					code: 'UNKNOWN_ERROR',
					description: 'An unexpected error occurred while creating reschedule',
				},
			};

			const err = new Error(
				errorResponse.error.description || 'Failed to create reschedule',
			);
			set({ error: err });
			throw errorResponse;
		} finally {
			set({ loading: false });
		}
	},
}));
