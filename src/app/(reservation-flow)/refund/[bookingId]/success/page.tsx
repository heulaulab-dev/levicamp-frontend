/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { CheckCircle2 } from 'lucide-react';
import Link from 'next/link';
import Image from 'next/image';
import HeroSection from '@/components/common/hero-section';
import { useRefundData } from '@/hooks/refund/use-refund-data';
import { format } from 'date-fns';
import { Confetti } from '@/components/ui/confetti';
import { useEffect, useState } from 'react';
import { Separator } from '@/components/ui/separator';

export default function RefundConfirmationPage() {
	const { invoiceData } = useRefundData();
	const [showConfetti, setShowConfetti] = useState(true);

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

				<div className='flex flex-row gap-3'>
					<Button asChild className='w-full'>
						<Link href='/'>Return to Home</Link>
					</Button>
					<Button variant='outline' asChild className='w-full'>
						<Link href='/contact'>Contact Support</Link>
					</Button>
				</div>
			</HeroSection>

			{/* Commented out legacy UI
			<div
				className='flex flex-col justify-center items-center bg-gradient-to-b px-4 py-10 min-h-screen'
				style={{
					backgroundImage: "url('/bg.png')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<div className='w-full max-w-md'>
					<Card className='shadow-lg border-0'>
						<CardContent className='pt-6 pb-4 text-center'>
							<div className='flex justify-center mb-6'>
								<Image
									src='/assets/icons/camp-icon.png'
									alt='Camping Icon'
									width={60}
									height={60}
								/>
							</div>

							<div className='flex justify-center mb-4'>
								<CheckCircle2 className='w-16 h-16 text-green-500' />
							</div>

							<h1 className='mb-2 font-bold text-2xl text-center'>
								Refund Request Submitted
							</h1>

							<p className='mb-6 text-gray-500'>
								Your refund request has been successfully submitted. We&apos;ll
								process your request within 3-5 business days and transfer the
								refund to your provided account.
							</p>

							<div className='bg-blue-50 mb-6 p-4 rounded-md'>
								<p className='text-blue-700 text-sm'>
									A confirmation email has been sent to your registered email
									address with all the details of your refund request.
								</p>
							</div>

							<div className='space-y-2 pt-4 border-gray-100 border-t text-left'>
								<p className='text-gray-500 text-sm'>
									<span className='font-medium'>Refund Status:</span> Processing
								</p>
								<p className='text-gray-500 text-sm'>
									<span className='font-medium'>Estimated Processing Time:</span>{' '}
									3-5 business days
								</p>
							</div>
						</CardContent>

						<CardFooter className='flex flex-col gap-3'>
							<Button asChild className='w-full'>
								<Link href='/'>Return to Home</Link>
							</Button>
							<Button variant='outline' asChild className='w-full'>
								<Link href='/contact'>Contact Support</Link>
							</Button>
						</CardFooter>
					</Card>
				</div>
			</div>
			*/}
		</>
	);
}
