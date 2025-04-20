'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/common/hero-section';
import InvoiceDetail from '@/components/pages/reschedule/invoice-detail';
import RescheduleForm from '@/components/pages/reschedule/reschedule-form';
import SearchAvailableTent from '@/components/pages/reschedule/search-available-tent';
import { StatusCard } from '@/components/pages/reschedule/status-card';
import { useRescheduleData } from '@/hooks/reschedules/use-reschedule-data';

export default function ReschedulePage() {
	const params = useParams();
	const router = useRouter();
	const bookingId = params.bookingId as string;
	const {
		bookingData,
		validationData,
		invoiceData,
		showTentCollection,
		setShowTentCollection,
	} = useRescheduleData();

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

	// Handle reschedule request
	const handleRescheduleRequest = async () => {
		if (!bookingData || !validationData || !invoiceData) {
			toast.error('Missing booking information. Please try again.');
			return;
		}

		try {
			// Logic to be implemented when user conf	irms the reschedule
			setShowTentCollection(true);
			toast.success('Reschedule request initiated. Please select new dates.');
		} catch (error) {
			toast.error(
				'Failed to process your reschedule request. Please try again.',
			);
			console.error('Reschedule request error:', error);
		}
	};

	return (
		<HeroSection
			title={
				<>
					Enter your booking code to{' '}
					<span className='text-primary'>Reschedule</span> your adventure. Your
					next escape is just a few clicks away!
				</>
			}
		>
			<div className='flex flex-col items-center mt-4 w-full'>
				{bookingData && validationData && invoiceData && (
					<div className='flex flex-col items-center w-full'>
						<StatusCard
							variant={
								bookingData.status === 'confirmed' ? 'eligible' : 'processing'
							}
							title={
								bookingData.status === 'confirmed'
									? 'Eligible for Reschedule'
									: 'Processing Booking'
							}
							description={
								bookingData.status === 'confirmed'
									? 'Your booking is eligible for rescheduling. Please review the details below.'
									: 'Your booking is being processed. Some features may be limited.'
							}
						/>

						{!showTentCollection && (
							<>
								<InvoiceDetail {...invoiceData} />
								<RescheduleForm onRescheduleRequest={handleRescheduleRequest} />
							</>
						)}

						{showTentCollection && (
							<div className='mt-10 container'>
								<SearchAvailableTent />
							</div>
						)}
					</div>
				)}
			</div>
		</HeroSection>
	);
}
