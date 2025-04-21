export type ReschedulePolicyItem = {
	title: string;
	points: Array<string>;
};

export const RESCHEDULE_POLICY: Array<ReschedulePolicyItem> = [
	{
		title: '1. Eligibility for Reschedule',
		points: [
			'Reschedule requests must be submitted at least 72 hours before the original check-in time.',
			'Only one reschedule is allowed per booking.',
			'Bookings made with promo codes or discounts may have limited reschedule options.',
		],
	},
	{
		title: '2. Reschedule Request Process',
		points: [
			'Guests must input their booking code and verify via OTP sent to their registered email.',
			'A valid reason for reschedule must be provided via the form.',
			'Once verified, guests can view their current booking and proceed to select new dates and tents.',
		],
	},
	{
		title: '3. Approval & Confirmation',
		points: [
			'All reschedule requests are subject to approval by Levi Camp team.',
			'Guests will receive an email confirmation once the reschedule is approved.',
			'If the new dates or tent category have a price difference, adjustments will be applied accordingly.',
		],
	},
	{
		title: '4. Limitations & Exceptions',
		points: [
			'No reschedule allowed within 24 hours of the original check-in time.',
			'Guests who fail to show up without rescheduling will forfeit their booking.',
			'Levi Camp reserves the right to reject reschedules that do not comply with policy.',
		],
	},
	{
		title: '5. Force Majeure & Emergencies',
		points: [
			'In case of force majeure (natural disaster, extreme weather, etc), rescheduling may still be granted based on availability.',
			'Guests must contact support with documentation if applicable.',
		],
	},
	{
		title: '6. Policy Updates',
		points: [
			'Levi Camp may update this policy without prior notice.',
			'The most current version will always be available on our website.',
		],
	},
];
