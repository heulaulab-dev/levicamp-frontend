'use client';

import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { RESCHEDULE_POLICY } from '@/constants/reschedule/reschedule-policy';
import { useRescheduleData } from '@/hooks/reschedules/use-reschedule-data';

interface RescheduleFormProps {
	onRescheduleRequest: () => void;
}

export default function RescheduleForm({
	onRescheduleRequest,
}: RescheduleFormProps) {
	const [agreed, setAgreed] = useState(false);
	const [loading, setLoading] = useState(false);
	const { rescheduleReason, setRescheduleReason } = useRescheduleData();

	const handleRequestReschedule = async () => {
		if (!agreed) return;

		setLoading(true);
		try {
			onRescheduleRequest();
			setLoading(false);
		} catch (error) {
			toast.error('An error occurred while processing your request');
			console.error(error);
			setLoading(false);
		}
	};

	return (
		<div className='flex justify-center items-center w-full min-h-screen'>
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
					{RESCHEDULE_POLICY.map((section, i) => (
						<section key={i}>
							<h2 className='mb-2 font-medium'>{section.title}</h2>
							<ul className='space-y-1 pl-6 text-sm list-disc'>
								{section.points.map((point, j) => (
									<li key={j}>{point}</li>
								))}
							</ul>
						</section>
					))}

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
								<label htmlFor='rescheduleReason' className='block mb-2'>
									Why are you requesting a reschedule?
								</label>
								<Select
									onValueChange={setRescheduleReason}
									value={rescheduleReason}
								>
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
