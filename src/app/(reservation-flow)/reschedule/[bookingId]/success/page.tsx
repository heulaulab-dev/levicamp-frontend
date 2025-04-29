/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import HeroSection from '@/components/common/hero-section';
import InvoiceDetail from '@/components/pages/reschedule/invoice-detail';
import { Confetti } from '@/components/ui/confetti';
import { useRescheduleData } from '@/hooks/reschedules/use-reschedule-data';
import { CreateRescheduleResponse } from '@/types/reschedules';
import LoadingTent from '@/components/common/loading-tent';

export default function RescheduleSuccessPage() {
	const params = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [rescheduleData, setRescheduleData] =
		useState<CreateRescheduleResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const { invoiceData } = useRescheduleData();
	const [showConfetti, setShowConfetti] = useState(true);

	// Get the booking ID from the URL params
	const bookingId = params.bookingId as string;

	useEffect(() => {
		// If there's no booking ID, redirect to home
		if (!bookingId) {
			router.push('/');
			return;
		}

		setShowConfetti(true);

		// If we have reschedule data in sessionStorage, use that
		const storedData = sessionStorage.getItem(`reschedule_data_${bookingId}`);
		if (storedData) {
			try {
				const parsedData = JSON.parse(storedData);
				setRescheduleData(parsedData);
				setLoading(false);
			} catch {
				// Ignore the specific error, just handle the failure
				setError('Failed to parse reschedule data');
				setLoading(false);
			}
		} else {
			setError('No booking data found');
			setLoading(false);
		}
	}, [bookingId, router]);

	// Function to download invoice
	const handleDownload = () => {
		// Implement download functionality here
		alert('Download functionality will be implemented here');
	};

	// Display loading state
	if (loading) {
		return <LoadingTent />;
	}

	// Display error state
	if (error || !rescheduleData) {
		return (
			<div className='flex flex-col justify-center items-center min-h-screen'>
				<h1 className='font-semibold text-red-500 text-xl'>
					Something went wrong
				</h1>
				<p className='mt-2'>{error || 'Failed to load booking details'}</p>
				<button
					className='bg-primary mt-4 px-4 py-2 rounded-md text-white'
					onClick={() => router.push('/')}
				>
					Go to Homepage
				</button>
			</div>
		);
	}

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
						<span className='text-primary'>Reschedule Request Submitted</span>{' '}
					</>
				}
				description="Your reschedule request has been successfully submitted. We'll process your request within 3-5 business days and transfer the reschedule to your new date."
				showActionButtons={true}
			>
				<div className='mx-auto container'>
					{invoiceData && <InvoiceDetail {...invoiceData} />}
				</div>
			</HeroSection>
		</>
	);
}
