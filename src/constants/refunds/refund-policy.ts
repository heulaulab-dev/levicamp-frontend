export type RefundPolicyItem = {
	title: string;
	points: Array<string>;
};

export const REFUND_POLICY: Array<RefundPolicyItem> = [
	{
		title: '1. Refund Eligibility',
		points: [
			'Refund requests must be submitted at least 24 hours before the check-in date.',
			'Requests made less than 24 hours before check-in will not be eligible for a refund.',
			'Refunds apply only to confirmed bookings. Any bookings under special promotions, non-refundable rates, or discount packages are not eligible for a refund.',
		],
	},
	{
		title: '2. Refund Process & Timeline',
		points: [
			'Approved refunds will be processed within 3-5 business days after approval.',
			'Refunds will be transferred back to the original payment method used during booking. Processing times may vary depending on your bank or payment provider.',
			'Levi Camp is not responsible for delays caused by third-party payment providers.',
		],
	},
	{
		title: '3. Refund Amount & Deductions',
		points: [
			'Full refunds will be issued for eligible requests.',
			'Any applicable service fees, transaction charges, or administrative costs may be non-refundable.',
			'If a partial refund applies, the exact amount will be communicated before processing.',
		],
	},
	{
		title: '4. Non-Refundable Cases',
		points: [
			'No-shows or cancellations made less than 24 hours before check-in.',
			'Cancellations due to force majeure (e.g., natural disasters, extreme weather, pandemics) are non-refundable, but rescheduling options may be available.',
			'Refunds are not provided for early check-outs or unused nights after check-in.',
			'If a guest is found violating Levi Camp’s policies (e.g., causing damage, unauthorized activities), the booking becomes non-refundable.',
		],
	},
	{
		title: '5. Reschedule Policy',
		points: [
			'Instead of a refund, guests may reschedule their stay (subject to availability).',
			'Rescheduling must be requested at least 24 hours before check-in and is subject to approval.',
			'Date changes may be subject to price adjustments based on current rates.',
		],
	},
	{
		title: '6. How to Request a Refund',
		points: [
			'Refund requests must be submitted via our website or by contacting Levi Camp’s support team.',
			'Guests must provide their Booking ID and a reason for cancellation.',
			'Levi Camp reserves the right to reject refund requests if the request does not meet the terms stated in this policy.',
		],
	},
	{
		title: '7. Changes to Refund Policy',
		points: [
			'Levi Camp reserves the right to modify, update, or revise this refund policy at any time without prior notice.',
			'The latest version of this policy will always be available on our official website.',
		],
	},
];
