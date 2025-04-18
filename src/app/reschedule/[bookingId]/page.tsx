'use client';

import { useEffect } from 'react';
import { useParams, useRouter } from 'next/navigation';
import HeroHeader from '@/components/pages/reschedule/hero-header';
import { useRescheduleData } from '@/hooks/reschedules/use-reschedule-data';
import { toast } from 'sonner';

export default function ReschedulePage() {
	const params = useParams();
	const router = useRouter();
	const bookingId = params.bookingId as string;
	const { bookingData, validationData } = useRescheduleData();

	// We need to load booking data if it's not already loaded
	// This handles cases where users might directly visit this URL
	useEffect(() => {
		if (!bookingData && !validationData && bookingId) {
			// Show a message to the user
			toast.info('Please verify your booking first');

			// Redirect to the search page
			router.push('/reschedule');
		}
	}, [bookingId, bookingData, validationData, router]);

	return (
		<div className='bg-background'>
			<HeroHeader />
		</div>
	);
}
