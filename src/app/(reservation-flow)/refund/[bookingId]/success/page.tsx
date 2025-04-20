'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import HeroSection from '@/components/common/hero-section';
import { Button } from '@/components/ui/button';
import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Confetti } from '@/components/ui/confetti';
import { useRefundData } from '@/hooks/refund/use-refund-data';

export default function RefundConfirmationPage() {
	const { invoiceData } = useRefundData();
	console.log(invoiceData);
	const [showConfetti, setShowConfetti] = useState(true);

	useEffect(() => {
		setShowConfetti(true);
	}, []);

	return (
		<>
			{showConfetti && (
				<Confetti
					style={{
						position: 'fixed',
						width: '100%',
						height: '100%',
						zIndex: 100,
						pointerEvents: 'none',
					}}
					options={{
						particleCount: 100,
						spread: 70,
						origin: { y: 0.3 },
					}}
				/>
			)}
			<HeroSection
				title={
					<>
						<span className='text-primary'>Refund Request Submitted</span>{' '}
					</>
				}
				description="Your refund request has been successfully submitted. We'll process your request within 3-5 business days and transfer the refund to your provided account."
			>
				<div className='flex flex-row gap-3'>
					<Button asChild className='w-full'>
						<Link href='/'>Return to Home</Link>
					</Button>
					<Button variant='outline' asChild className='w-full'>
						<Link href='/contact'>Contact Support</Link>
					</Button>
				</div>

				<Card className='mb-6'>
					<CardHeader>
						<CardTitle>Refund Details</CardTitle>
						<CardDescription>
							A confirmation email has been sent to your registered email
							address with all the details of your refund request.
						</CardDescription>
					</CardHeader>
					<CardContent>
						<div className='flex flex-col'>
							{invoiceData && (
								<div className='space-y-3'>
									<p className='text-sm'>
										<span className='font-medium'>Booking ID:</span>{' '}
										{invoiceData.bookingId}
									</p>
									<p className='text-sm'>
										<span className='font-medium'>Refund Amount:</span> Rp
										{invoiceData.refundAmount.toLocaleString()}
									</p>
									<p className='text-sm'>
										<span className='font-medium'>Refund Method:</span>{' '}
										{invoiceData.refundMethod.toUpperCase()}
									</p>
									<p className='text-sm'>
										<span className='font-medium'>Account Name:</span>{' '}
										{invoiceData.accountName}
									</p>
									<p className='text-sm'>
										<span className='font-medium'>Account Number:</span>{' '}
										{invoiceData.accountNumber}
									</p>
									<p className='text-sm'>
										<span className='font-medium'>Refund Status:</span>{' '}
										Processing
									</p>
									<p className='text-sm'>
										<span className='font-medium'>
											Estimated Processing Time:
										</span>{' '}
										3-5 business days
									</p>
								</div>
							)}
						</div>
					</CardContent>
				</Card>
			</HeroSection>
		</>
	);
}
