import axios from 'axios';

const api = axios.create({
	baseURL: process.env.NEXT_PUBLIC_API_URL,
	headers: { 'Content-Type': 'application/json' },
});

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
