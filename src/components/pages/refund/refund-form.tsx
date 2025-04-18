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
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import Link from 'next/link';
import { toast } from 'sonner';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { CreateRefundRequest } from '@/types/refunds';
import { REFUND_POLICY } from '@/constants/refunds/refund-policy';

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
		<Card className='shadow-sm w-full'>
			<CardHeader>
				<CardTitle className='font-semibold text-2xl'>
					Refund Request Form
				</CardTitle>
				<CardDescription>
					Let us know why you&apos;re requesting a refund! Please provide
					details about your cancellation, and we&apos;ll process your request
					based on our refund policy. Remember, refunds are only available for
					cancellations made at least 24 hours before check-in. If you&apos;d
					rather reschedule, let us know we&apos;re happy to help!
				</CardDescription>
			</CardHeader>

			<CardContent className='space-y-6'>
				{REFUND_POLICY.map((section, i) => (
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
							href='/refund-policy'
							className='font-medium text-primary hover:underline'
						>
							Levi Camp Refund Terms & Conditions
						</Link>
						.
					</label>
				</div>

				<Card>
					<CardContent>
						<div className='flex flex-col gap-2 space-y-4 mt-6'>
							{/* Reason for refund request */}
							<div>
								<Label htmlFor='reason'>Reason for refund request</Label>
								<Select onValueChange={setReason} value={reason}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select a reason' />
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

							{/* Refund destination */}
							<div>
								<Label htmlFor='refundMethod'>Refund Destination</Label>
								<Select onValueChange={setRefundMethod} value={refundMethod}>
									<SelectTrigger className='w-full'>
										<SelectValue placeholder='Select refund destination' />
									</SelectTrigger>
									<SelectContent>
										<SelectItem value='bca'>BCA</SelectItem>
										<SelectItem value='bni'>BNI</SelectItem>
										<SelectItem value='bri'>BRI</SelectItem>
										<SelectItem value='mandiri'>Mandiri</SelectItem>
									</SelectContent>
								</Select>
							</div>

							{/* Account details */}
							<div className='flex gap-4'>
								{/* Account name */}
								<div className='w-1/2'>
									<Label htmlFor='accountName'>Account Name</Label>
									<Input
										id='accountName'
										value={accountName}
										onChange={(e) => setAccountName(e.target.value)}
										placeholder='Enter account holder name'
									/>
								</div>

								{/* Account number */}
								<div className='w-1/2'>
									<Label htmlFor='accountNumber'>Account Number</Label>
									<Input
										id='accountNumber'
										value={accountNumber}
										onChange={(e) => setAccountNumber(e.target.value)}
										placeholder='Enter account number'
									/>
								</div>
							</div>

							<div className='text-xs'>
								<p>
									Refunds will be processed to the same payment method used for
									your original transaction. Processing time may vary depending
									on your provider.
								</p>
							</div>

							<Button
								onClick={handleRequestRefund}
								disabled={!agreed || isLoading}
								className='w-full'
							>
								{isLoading ? 'Processing...' : 'Request Refund'}
							</Button>
						</div>
					</CardContent>
				</Card>
			</CardContent>
		</Card>
	);
}
