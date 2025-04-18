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
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateRefundRequest } from '@/types/refunds';

interface RefundFormProps {
	onRefundRequest: (formData: Omit<CreateRefundRequest, 'token'>) => void;
	isLoading?: boolean;
}

export default function RefundForm({
	onRefundRequest,
	isLoading = false,
}: RefundFormProps) {
	const [agreed, setAgreed] = useState(false);
	const [reason, setReason] = useState('');
	const [refundMethod, setRefundMethod] = useState('');
	const [accountName, setAccountName] = useState('');
	const [accountNumber, setAccountNumber] = useState('');

	const handleRequestRefund = async () => {
		if (!agreed) {
			toast.error('Please agree to the terms and conditions');
			return;
		}

		if (!reason || !refundMethod || !accountName || !accountNumber) {
			toast.error('Please fill in all required fields');
			return;
		}

		try {
			onRefundRequest({
				reason,
				refund_method: refundMethod,
				account_name: accountName,
				account_number: accountNumber,
			});
		} catch (error) {
			toast.error('An error occurred while processing your request');
			console.error(error);
		}
	};

	return (
		<div className='flex justify-center items-center p-4 min-h-screen'>
			<Card className='shadow-sm w-full max-w-4xl'>
				<CardHeader>
					<CardTitle className='font-semibold text-2xl'>
						Refund Request Form
					</CardTitle>
					<CardDescription>
						Let us know why you&apos;re requesting a refund. Please provide
						details about your refund request, and we&apos;ll process it based
						on our refund policy. Remember, refunds are only available for
						requests made at least 72 hours before the original scheduled
						time/date.
					</CardDescription>
				</CardHeader>

				<CardContent className='space-y-6'>
					<section>
						<h2 className='mb-2 font-medium'>1. Refund Eligibility</h2>
						<ul className='space-y-1 pl-6 list-disc'>
							<li>
								Refund requests must be made at least 72 hours before your
								scheduled check-in time.
							</li>
							<li>
								Requests made within 72 hours of check-in may be subject to
								partial refunds or no refund.
							</li>
							<li>Non-refundable bookings are not eligible for refunds.</li>
						</ul>
					</section>

					<section>
						<h2 className='mb-2 font-medium'>2. Refund Process & Timeline</h2>
						<ul className='space-y-1 pl-6 list-disc'>
							<li>
								Approved refunds will be processed within 3–5 business days
								after approval.
							</li>
							<li>
								Refunds will be transferred to the account details you provide
								below.
							</li>
							<li>
								Levi Camp is not responsible for delays caused by third-party
								payment providers.
							</li>
						</ul>
					</section>

					<section>
						<h2 className='mb-2 font-medium'>3. Refund Policy</h2>
						<ul className='space-y-1 pl-6 list-disc'>
							<li>
								Full refunds are provided for cancellations made at least 7 days
								before check-in.
							</li>
							<li>
								Cancellations made 3-7 days before check-in receive a 50%
								refund.
							</li>
							<li>
								Cancellations made less than 72 hours before check-in are not
								eligible for refunds.
							</li>
						</ul>
					</section>

					<div className='space-y-4 mt-6'>
						<div>
							<Label htmlFor='reason'>Reason for refund request</Label>
							<Select onValueChange={setReason} value={reason}>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select a reason' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='plans'>Change of plans</SelectItem>
									<SelectItem value='weather'>Weather concerns</SelectItem>
									<SelectItem value='emergency'>Personal emergency</SelectItem>
									<SelectItem value='travel'>Travel issues</SelectItem>
									<SelectItem value='other'>Other</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label htmlFor='refundMethod'>Refund Method</Label>
							<Select onValueChange={setRefundMethod} value={refundMethod}>
								<SelectTrigger className='w-full'>
									<SelectValue placeholder='Select payment method' />
								</SelectTrigger>
								<SelectContent>
									<SelectItem value='bca'>BCA</SelectItem>
									<SelectItem value='bni'>BNI</SelectItem>
									<SelectItem value='bri'>BRI</SelectItem>
									<SelectItem value='mandiri'>Mandiri</SelectItem>
								</SelectContent>
							</Select>
						</div>

						<div>
							<Label htmlFor='accountName'>Account Name</Label>
							<Input
								id='accountName'
								value={accountName}
								onChange={(e) => setAccountName(e.target.value)}
								placeholder='Enter account holder name'
							/>
						</div>

						<div>
							<Label htmlFor='accountNumber'>Account Number</Label>
							<Input
								id='accountNumber'
								value={accountNumber}
								onChange={(e) => setAccountNumber(e.target.value)}
								placeholder='Enter account number'
							/>
						</div>
					</div>

					<div className='flex items-start space-x-2 mt-4'>
						<Checkbox
							id='terms'
							checked={agreed}
							onCheckedChange={(checked) => setAgreed(checked as boolean)}
						/>
						<label htmlFor='terms' className='text-sm'>
							I have read and agree to the{' '}
							<Link
								href='/refund-policy'
								className='font-medium text-primary hover:underline'
							>
								Levi Camp Refund Terms & Conditions
							</Link>
							.
						</label>
					</div>
				</CardContent>

				<CardFooter>
					<Button
						onClick={handleRequestRefund}
						disabled={!agreed || isLoading}
						className='w-full'
					>
						{isLoading ? 'Processing...' : 'Request Refund'}
					</Button>
				</CardFooter>
			</Card>
		</div>
	);
}
