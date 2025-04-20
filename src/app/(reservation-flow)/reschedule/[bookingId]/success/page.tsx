/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Loader2 } from 'lucide-react';
import { useParams, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

import InvoiceDetail from '@/components/pages/reschedule/invoice-detail';
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

	// Extract booking data from the response
	const booking = rescheduleData.data;

	// Format dates for display
	const formattedPaymentDate = new Date(booking.created_at).toLocaleDateString(
		'en-US',
		{
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		},
	);

	// Format check-in and check-out dates
	const checkInDate = new Date(booking.start_date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	const checkOutDate = new Date(booking.end_date).toLocaleDateString('en-US', {
		year: 'numeric',
		month: 'long',
		day: 'numeric',
	});

	// Map reservation details to tent format for InvoiceDetail
	const tents = booking.detail_booking.map((detail) => ({
		id: detail.reservation.tent.id,
		name: detail.reservation.tent.name,
		image: detail.reservation.tent.tent_images[0] || '',
		category: detail.reservation.tent.category.name,
		capacity: detail.reservation.tent.capacity,
		price: detail.reservation.price,
	}));

	// Calculate total guest capacity
	const guestCount = booking.detail_booking
		.reduce((sum, detail) => sum + detail.reservation.tent.capacity, 0)
		.toString();

	return (
		<div className='mx-auto py-8 container'>
			<h1 className='mb-6 font-bold text-2xl text-center'>
				Reschedule Confirmed!
			</h1>

			{invoiceData && <InvoiceDetail {...invoiceData} />}
		</div>
	);
}
