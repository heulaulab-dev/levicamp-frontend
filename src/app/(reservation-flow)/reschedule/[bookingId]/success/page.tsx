/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Loader2 } from 'lucide-react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import InvoiceDetail from '@/components/pages/reschedule/invoice-detail';
import { Button } from '@/components/ui/button';
import { useRescheduleData } from '@/hooks/reschedules/use-reschedule-data';
import { CreateRescheduleResponse } from '@/types/reschedules';

export default function RescheduleSuccessPage() {
	const params = useParams();
	const router = useRouter();
	const [loading, setLoading] = useState(true);
	const [rescheduleData, setRescheduleData] =
		useState<CreateRescheduleResponse | null>(null);
	const [error, setError] = useState<string | null>(null);
	const { invoiceData } = useRescheduleData();

	// Get the booking ID from the URL params
	const bookingId = params.bookingId as string;

	useEffect(() => {
		// If there's no booking ID, redirect to home
		if (!bookingId) {
			router.push('/');
			return;
		}

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
		return (
			<div className='flex flex-col justify-center items-center min-h-screen'>
				<Loader2 className='w-10 h-10 text-primary animate-spin' />
				<p className='mt-4'>Loading your booking details...</p>
			</div>
		);
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
		<div className='mx-auto py-8 container'>
			<h1 className='mb-6 font-bold text-2xl text-center'>
				Reschedule Confirmed!
			</h1>

			<div className='flex flex-row gap-3'>
				<Button asChild className='w-full'>
					<Link href='/'>Return to Home</Link>
				</Button>
				<Button variant='outline' asChild className='w-full'>
					<Link href='/contact'>Contact Support</Link>
				</Button>
			</div>

			{invoiceData && <InvoiceDetail {...invoiceData} />}
		</div>
	);
}
