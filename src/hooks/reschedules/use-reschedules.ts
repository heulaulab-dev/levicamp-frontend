import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { format } from 'date-fns';
import api from '@/lib/api';
import {
	RescheduleStore,
	RescheduleRequestResponse,
	RescheduleValidationResponse,
	RescheduleCreateRequest,
	RescheduleCreateResponse,
} from '@/types/reschedules';
import { AxiosError } from 'axios';
import { useReservations } from '../reservations/use-reservations';

export const useReschedules = create<RescheduleStore>()(
	persist(
		(set, get) => ({
			loading: false,
			error: null,
			bookingData: null,
			requestData: null,
			validationData: null,
			tentCategories: null,
			rescheduleData: null,
			date: {
				from: undefined,
				to: undefined,
			},
			selectedTents: [],

			resetState: () =>
				set({
					loading: false,
					error: null,
					bookingData: null,
					requestData: null,
					validationData: null,
					tentCategories: null,
					rescheduleData: null,
					date: {
						from: undefined,
						to: undefined,
					},
					selectedTents: [],
				}),

			setDate: (date) => set({ date }),

			setSelectedTents: (tentIds) => set({ selectedTents: tentIds }),

			addSelectedTent: (tentId) => {
				const currentTents = get().selectedTents;
				if (!currentTents.includes(tentId)) {
					set({ selectedTents: [...currentTents, tentId] });
				}
			},

			removeSelectedTent: (tentId) => {
				const currentTents = get().selectedTents;
				set({
					selectedTents: currentTents.filter((id) => id !== tentId),
				});
			},

			setTentCategories: (categories) => set({ tentCategories: categories }),

			setRescheduleData: (data) => set({ rescheduleData: data }),

			clearRescheduleData: () => set({ rescheduleData: null }),

			searchAvailableTents: async () => {
				const state = get();
				const reservationStore = useReservations.getState();

				if (!state.date?.from || !state.date?.to) {
					throw new Error('Please select a date range');
				}

				set({ loading: true, error: null });

				try {
					// Use the existing reservation search functionality
					await reservationStore.handleSearch((error: string) => {
						set({ error, loading: false });
					});

					// After search is complete, we can access the results from useReservations
					const searchResults = useReservations.getState().reservationData;

					// Set the tent categories in our store
					set({ tentCategories: searchResults });

					return searchResults;
				} catch (error) {
					let errorMessage = 'Failed to search for available tents';
					if (error instanceof Error) {
						errorMessage = error.message;
					}
					set({ error: errorMessage, loading: false });
					return null;
				} finally {
					set({ loading: false });
				}
			},

			requestReschedule: async (
				bookingId: string,
			): Promise<RescheduleRequestResponse> => {
				set({ loading: true, error: null });

				try {
					const response = await api.post<RescheduleRequestResponse>(
						'/reschedules/request',
						{ booking_id: bookingId },
					);

					const res = response.data;

					if (res.status === 200) {
						set({
							requestData: res.data,
							loading: false,
						});
					} else {
						set({
							error: res.error?.description || 'Failed to request reschedule',
							loading: false,
						});
					}

					return res;
				} catch (error) {
					let errorMessage = 'Failed to request reschedule';

					if (
						error instanceof AxiosError &&
						error.response?.data?.error?.description
					) {
						errorMessage = error.response.data.error.description;
					} else if (error instanceof Error) {
						errorMessage = error.message;
					}

					set({ error: errorMessage, loading: false });

					return {
						status: 500,
						message: 'Request failed',
						error: {
							code: 'REQUEST_FAILED',
							description: errorMessage,
						},
					};
				}
			},

			validateRescheduleToken: async (
				token: string,
			): Promise<RescheduleValidationResponse> => {
				set({ loading: true, error: null });

				try {
					const response = await api.get<RescheduleValidationResponse>(
						'/reschedules/validate',
						{ params: { token } },
					);

					set({
						validationData: response.data.data,
						bookingData: response.data.data.booking,
						loading: false,
					});

					return response.data;
				} catch (error) {
					let errorMessage = 'Failed to validate reschedule token';

					if (
						error instanceof AxiosError &&
						error.response?.data?.error?.description
					) {
						errorMessage = error.response.data.error.description;
					} else if (error instanceof Error) {
						errorMessage = error.message;
					}

					set({ error: errorMessage, loading: false });
					throw new Error(errorMessage);
				}
			},

			createReschedule: async (
				data: RescheduleCreateRequest,
			): Promise<RescheduleCreateResponse> => {
				set({ loading: true, error: null });

				try {
					const response = await api.post<RescheduleCreateResponse>(
						'/reschedules',
						data,
					);

					set({
						bookingData: response.data.data,
						loading: false,
					});

					return response.data;
				} catch (error) {
					let errorMessage = 'Failed to create reschedule';

					if (
						error instanceof AxiosError &&
						error.response?.data?.error?.description
					) {
						errorMessage = error.response.data.error.description;
					} else if (error instanceof Error) {
						errorMessage = error.message;
					}

					set({ error: errorMessage, loading: false });
					throw new Error(errorMessage);
				}
			},

			prepareRescheduleData: (
				bookingId: string,
				token: string,
			): RescheduleCreateRequest => {
				const state = get();

				if (
					!state.date?.from ||
					!state.date?.to ||
					state.selectedTents.length === 0
				) {
					throw new Error('Missing required reschedule data');
				}

				return {
					booking_id: bookingId,
					token: token,
					tent_id: state.selectedTents,
					start_date: format(state.date.from, 'yyyy-MM-dd'),
					end_date: format(state.date.to, 'yyyy-MM-dd'),
				};
			},
		}),
		{
			name: 'reschedule-storage',
			partialize: (state) => ({
				bookingData: state.bookingData,
				requestData: state.requestData,
				validationData: state.validationData,
				date: state.date,
				selectedTents: state.selectedTents,
				rescheduleData: state.rescheduleData,
			}),
		},
	),
);
