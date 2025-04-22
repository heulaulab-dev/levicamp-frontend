import { create } from 'zustand';

import api from '@/lib/api';
import {
	PaymentRequest,
	PaymentResponse,
	PaymentStatusResponse,
	PaymentStore,
	PollingOptions,
} from '@/types/payments';

export const usePayment = create<PaymentStore>((set, get) => ({
	loading: false,
	error: null,
	paymentData: null,
	paymentStatus: null,
	isPolling: false,
	pollingInterval: null,

	createPayment: async (bookingId: string, data: PaymentRequest) => {
		set({ loading: true, error: null });

		try {
			const response = await api.post<PaymentResponse>(
				`/payments/${bookingId}`,
				data,
			);

			set({
				paymentData: response.data,
				loading: false,
			});

			return response.data;
		} catch (error) {
			const errorMessage =
				error instanceof Error ? error.message : 'Failed to create payment';
			set({
				error: errorMessage,
				loading: false,
			});
			throw error;
		}
	},

	checkPaymentStatus: async (bookingId: string) => {
		set({ loading: true, error: null });

		try {
			const response = await api.get<PaymentStatusResponse>(
				`/payments/${bookingId}`,
			);

			set({
				paymentStatus: response.data.data,
				loading: false,
			});

			return response.data.data;
		} catch (error) {
			const errorMessage =
				error instanceof Error
					? error.message
					: 'Failed to check payment status';
			set({
				error: errorMessage,
				loading: false,
			});
			throw error;
		}
	},

	startPolling: (bookingId: string, options: PollingOptions = {}) => {
		const {
			interval = 5000, // Default: check every 5 seconds
			maxAttempts = 60, // Default: try for 5 minutes (60 * 5 seconds)
			onSuccess,
			onError,
			onExpired,
		} = options;

		// Stop any existing polling
		get().stopPolling();

		let attempts = 0;
		set({ isPolling: true });

		const pollingInterval = setInterval(async () => {
			try {
				attempts++;
				const payment = await get().checkPaymentStatus(bookingId);

				// Check payment status
				switch (payment.transaction_status.toLowerCase()) {
					case 'success':
						get().stopPolling();
						onSuccess?.(payment);
						break;
					case 'expired':
						get().stopPolling();
						onExpired?.(payment);
						break;
					case 'failed':
						get().stopPolling();
						onError?.(new Error('Payment failed'));
						break;
					case 'pending':
						// Continue polling
						break;
					default:
						// Continue polling for unknown status
						break;
				}

				// Stop if we've reached max attempts
				if (attempts >= maxAttempts) {
					get().stopPolling();
					onError?.(new Error('Payment status check timed out'));
				}
			} catch (error) {
				const errorMessage =
					error instanceof Error
						? error.message
						: 'Failed to check payment status';
				set({ error: errorMessage });
				onError?.(new Error(errorMessage));
			}
		}, interval) as NodeJS.Timeout;

		// Store the interval ID
		set({ pollingInterval });

		// Return a cleanup function
		return () => get().stopPolling();
	},

	stopPolling: () => {
		const { pollingInterval } = get();
		if (pollingInterval) {
			clearInterval(pollingInterval);
			set({ pollingInterval: null, isPolling: false });
		}
	},

	resetPayment: () => {
		get().stopPolling();
		set({
			loading: false,
			error: null,
			paymentData: null,
			paymentStatus: null,
			isPolling: false,
		});
	},
}));
