'use client';

import { useState } from 'react';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { toast } from 'sonner';

interface RescheduleFormProps {
	onRescheduleRequest: () => void;
}

export default function RescheduleForm({
	onRescheduleRequest,
}: RescheduleFormProps) {
	const [agreed, setAgreed] = useState(false);
	const [reason, setReason] = useState('');
	const [loading, setLoading] = useState(false);

	const handleRequestReschedule = async () => {
		if (!agreed) return;

		setLoading(true);
		try {
			// Simulate brief loading state for better UX
			setTimeout(() => {
				onRescheduleRequest();
				setLoading(false);
			}, 500);
		} catch (error) {
			toast.error('An error occurred while processing your request');
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-center items-center p-4 min-h-screen'>
			<Card className='shadow-sm w-full max-w-4xl'>
				<CardHeader>
					<CardTitle className='font-semibold text-2xl'>
						Reschedule Form
					</CardTitle>
					<CardDescription>
						Let us know why you&apos;re requesting a reschedule! Please provide
						details about your rescheduling request, and we&apos;ll process it
						based on our rescheduling policy. Remember, rescheduling is only
						available for requests made at least [X hours/days] before the
						original scheduled time/date. If you&apos;d rather cancel, let us
						know, and we&apos;ll assist you based on our cancellation policy.
						We&apos;re happy to help!
					</CardDescription>
				</CardHeader>

				<CardContent className='space-y-6'>
					<section>
						<h2 className='mb-2 font-medium'>1. Reschedule Eligibility</h2>
						<ul className='space-y-1 pl-6 list-disc'>
							<li>
								Rescheduling requests must be made at least 72 hours before your
								scheduled check-in time.
							</li>
							<li>
								Requests made within 72 hours of check-in will be subject to
								additional fees.
							</li>
							<li>Maximum of one reschedule per booking is allowed.</li>
						</ul>
					</section>

					<section>
						<h2 className='mb-2 font-medium'>
							2. Reschedule Process & Timeline
						</h2>
						<ul className='space-y-1 pl-6 list-disc'>
							<li>
								Approved refunds will be processed within 3–5 business days
								after approval.
							</li>
							<li>
								Refunds will be transferred back to the original payment method
								used during booking. Processing times may vary depending on your
								bank or payment provider.
							</li>
							<li>
								Levi Camp is not responsible for delays caused by third-party
								payment providers.
							</li>
						</ul>
					</section>

					<section>
						<h2 className='mb-2 font-medium'>3. Tent Selection</h2>
						<ul className='space-y-1 pl-6 list-disc'>
							<li>
								Rescheduled bookings must adhere to the original number of tents
								booked.
							</li>
							<li>
								Changes to the number of tents are not allowed unless explicitly
								approved by management.
							</li>
							<li>
								Rescheduled bookings must retain the same tent type and
								configuration as originally booked (e.g., standard tent, or VIP
								tent). Upgrades or downgrades are subject to availability and
								may incur additional charges.
							</li>
						</ul>
					</section>

					<section>
						<h2 className='mb-2 font-medium'>4. Non-Reschedule Cases</h2>
						<ul className='space-y-1 pl-6 list-disc'>
							<li>
								Bookings marked as &quot;non-refundable&quot; or
								&quot;non-changeable&quot; at the time of purchase are not
								eligible for rescheduling. Any requests for rescheduling will be
								automatically declined.
							</li>
							<li>
								Cancellations due to force majeure (e.g., natural disasters,
								extreme weather, pandemics) are non-refundable, but rescheduling
								options may be available.
							</li>
							<li>
								Reschedule requests submitted after the specified deadline
								(e.g., [X days/hours] before check-in) will not be processed.
								The original booking will remain valid as per the confirmed
								date.
							</li>
							<li>
								If the requested reschedule date is fully booked or unavailable,
								the reschedule request will be denied, and the original booking
								will stand.
							</li>
						</ul>
					</section>

					<section>
						<h2 className='mb-2 font-medium'>5. Reschedule Policy</h2>
						<ul className='space-y-1 pl-6 list-disc'>
							<li>
								The reschedule option is subject to availability and the terms
								of the original booking.
							</li>
							<li>
								Rescheduling must be requested at least 72 hours before check-in
								and is subject to approval.
							</li>
							<li>
								Date changes may be subject to price adjustments based on
								current rates.
							</li>
						</ul>
					</section>

					<section>
						<h2 className='mb-2 font-medium'>6. How to Request a Reschedule</h2>
						<ul className='space-y-1 pl-6 list-disc'>
							<li>
								Reschedule requests must be submitted via our website or by
								contacting Levi Camp&apos;s support team.
							</li>
							<li>
								Guests are required to provide their Booking ID and a reason for
								rescheduling.
							</li>
							<li>
								Levi Camp reserves the right to reject refund requests if the
								request does not meet the terms stated in this policy.
							</li>
						</ul>
					</section>

					<section>
						<h2 className='mb-2 font-medium'>
							7. Changes to Reschedule Policy
						</h2>
						<ul className='space-y-1 pl-6 list-disc'>
							<li>
								Levi Camp reserves the right to modify, update, or revise this
								refund policy at any time without prior notice.
							</li>
							<li>
								The latest version of this policy will always be available on
								our official website.
							</li>
						</ul>
					</section>

					<div className='flex items-start space-x-2 mt-4'>
						<Checkbox
							id='terms'
							checked={agreed}
							onCheckedChange={(checked) => setAgreed(checked as boolean)}
						/>
						<label htmlFor='terms' className='text-sm'>
							I have read and agree to the{' '}
							<Link
								href='/reschedule-policy'
								className='font-medium text-primary hover:underline'
							>
								Levi Camp Reschedule Terms & Conditions
							</Link>
							.
						</label>
					</div>

					<Card className='mt-4'>
						<CardContent className='pt-6'>
							<div className='mb-4'>
								<label htmlFor='reason' className='block mb-2'>
									Why are you requesting a reschedule?
								</label>
								<Select onValueChange={setReason} value={reason}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Change of plans' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='plans'>Change of plans</SelectItem>
										<SelectItem value='weather'>Weather concerns</SelectItem>
										<SelectItem value='emergency'>
											Personal emergency
										</SelectItem>
										<SelectItem value='travel'>Travel issues</SelectItem>
										<SelectItem value='other'>Other</SelectItem>
									</SelectContent>
								</Select>
							</div>

							<p className='text-sm'>
								Reschedule will be processed to the same payment method used for
								your original transaction. Processing time may vary depending on
								your provider.
							</p>
						</CardContent>
						<CardFooter className='justify-end pb-6'>
							<Button
								disabled={!agreed || loading}
								onClick={handleRequestReschedule}
								className={loading ? 'opacity-70 cursor-not-allowed' : ''}
							>
								{loading ? 'Processing...' : 'Request Reschedule'}
							</Button>
						</CardFooter>
					</Card>
				</CardContent>
			</Card>
		</div>
	);
}
