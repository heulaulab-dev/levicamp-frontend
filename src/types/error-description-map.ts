import { StatusVariant } from '@/components/pages/reschedule/status-card';

// types.ts
type ErrorDescriptionMap = Record<
	string,
	{
		variant: StatusVariant;
		title: string;
		description: string;
	}
>;

export const errorDescriptionMap: ErrorDescriptionMap = {
	'The requested booking does not exist': {
		variant: 'error',
		title: 'Invalid Booking ID',
		description:
			'The booking ID you entered was not found in our system. Please check and try again.',
	},
	'Booking is not paid or booking has been rescheduled': {
		variant: 'error',
		title: 'Reschedule Failed',
		description: 'Booking is not paid or booking has been rescheduled',
	},
};
