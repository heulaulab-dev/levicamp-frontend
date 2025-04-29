export function formatToK(num: number): string {
	if (num >= 1000000) {
		return (num / 1000000).toFixed(1) + 'M';
	} else if (num >= 1000) {
		return (num / 1000).toFixed(0) + 'K';
	}
	return num.toString();
}

export function formatCurrency(amount: number): string {
	return new Intl.NumberFormat('id-ID', {
		style: 'currency',
		currency: 'IDR',
		minimumFractionDigits: 0,
		maximumFractionDigits: 0,
	})
		.format(amount)
		.replace(/\s/g, '')
		.replace('IDR', 'Rp');
}

// Format expiry date for displaye
export const formatExpiryDate = (dateString: string) => {
	const date = new Date(dateString);
	const options: Intl.DateTimeFormatOptions = {
		day: '2-digit',
		month: 'short',
		year: 'numeric',
		hour: '2-digit',
		minute: '2-digit',
		timeZone: 'Asia/Jakarta',
	};
	return new Intl.DateTimeFormat('id-ID', options).format(date);
};