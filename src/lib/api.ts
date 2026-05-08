import axios from 'axios';

import { ApiError } from '@/types/api-error';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: { 'Content-Type': 'application/json' },
});

// Normalize every non-2xx response to an ApiError so callers can
// use `instanceof ApiError` instead of doing manual error reconstruction.
api.interceptors.response.use(
	(response) => response,
	(error) => {
		const raw = error.response?.data;

		let message: string;
		if (raw && typeof raw === 'object') {
			// Priority 1: flat message field
			if ('message' in raw && typeof raw.message === 'string') {
				message = raw.message;
			}
			// Priority 2: nested error.description
			else if (
				'error' in raw &&
				typeof raw.error === 'object' &&
				raw.error !== null &&
				'description' in raw.error &&
				typeof raw.error.description === 'string'
			) {
				message = raw.error.description;
			}
			// Priority 3: raw error string
			else if (typeof raw.error === 'string') {
				message = raw.error;
			}
			// Fallback to axios error message
			else if (typeof error.message === 'string') {
				message = error.message;
			}
			// Last resort
			else {
				message = 'An unexpected error occurred';
			}
		} else if (typeof error.message === 'string') {
			message = error.message;
		} else {
			message = 'An unexpected error occurred';
		}

		const code = error.response?.status ?? 'NETWORK_ERROR';

		return Promise.reject(new ApiError(message, code, raw));
	},
);

// Function to download invoice PDF
export const downloadInvoice = async (bookingId: string): Promise<Blob> => {
	try {
		const response = await api.get(`/exports/invoice?id=${bookingId}`, {
			responseType: 'blob',
			headers: {
				'Content-Type': 'application/pdf',
			},
		});
		return response.data;
	} catch (error) {
		console.error('Error downloading invoice:', error);
		throw new Error('Failed to download invoice');
	}
};

// Utility function to trigger file download
export const triggerFileDownload = (blob: Blob, filename: string) => {
	const url = window.URL.createObjectURL(blob);
	const link = document.createElement('a');
	link.href = url;
	link.download = filename;
	document.body.appendChild(link);
	link.click();
	document.body.removeChild(link);
	window.URL.revokeObjectURL(url);
};

export default api;