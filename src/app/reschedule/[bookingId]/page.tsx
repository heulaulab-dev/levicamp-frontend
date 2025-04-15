'use client';

import { useEffect } from 'react';
import { useParams } from 'next/navigation';
import HeroHeader from '@/components/pages/reschedule/hero-header';
import { useReschedules } from '@/hooks/reschedules/use-reschedules';
import { toast } from 'sonner';

export default function ReschedulePage() {
	const params = useParams();
	const bookingId = params.bookingId as string;
	const { bookingData, validationData } = useReschedules();

	// We need to load booking data if it's not already loaded
	// This handles cases where users might directly visit this URL
	useEffect(() => {
		if (!bookingData && !validationData && bookingId) {
			// Show a message to the user
			toast.info('Please verify your booking first');

			// In a real implementation, you might want to:
			// 1. Redirect to the search page, or
			// 2. Show a verification form directly on this page
		}
	}, [bookingId, bookingData, validationData]);

	return (
		<div className='bg-background'>
			<HeroHeader />
		</div>
	);
}
