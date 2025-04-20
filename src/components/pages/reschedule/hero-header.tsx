import Image from 'next/image';
import { toast } from 'sonner';

import InvoiceDetail from '@/components/pages/reschedule/invoice-detail';
import RescheduleForm from '@/components/pages/reschedule/reschedule-form';
import SearchAvailableTent from '@/components/pages/reschedule/search-available-tent';
import SearchBooking from '@/components/pages/reschedule/search-booking';
import { StatusCard } from '@/components/pages/reschedule/status-card';
import { useRescheduleData } from '@/hooks/reschedules/use-reschedule-data';

export default function HeroHeader() {
	const {
		bookingData,
		validationData,
		invoiceData,
		showTentCollection,
		setShowTentCollection,
	} = useRescheduleData();

	const handleRescheduleRequest = async () => {
		if (!bookingData || !validationData || !invoiceData) {
			toast.error('Missing booking information. Please try again.');
			return;
		}

		try {
			// Logic to be implemented when user confirms the reschedule
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
		<section
			className='flex flex-col justify-center items-center bg-gradient-to-b mt-20 px-4 py-10 min-h-screen'
			style={{
				backgroundImage: "url('/bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* Header Section */}
			<div className='flex flex-col items-center'>
				<Image
					src='/assets/icons/camp-icon.png'
					alt='Camping Icon'
					width={50}
					height={50}
				/>

				<div className='mt-4 mb-6 max-w-3xl text-center'>
					<h1 className='font-bold text-primary dark:text-primary-foreground text-4xl md:text-5xl leading-tight'>
						Enter your booking code to{' '}
						<span className='text-primary'>Reschedule</span> your adventure.
						Your next escape is just a few clicks away!
					</h1>
				</div>
			</div>

			{/* Search Section */}
			<section className='flex flex-col items-center w-full max-w-3xl'>
				<SearchBooking />
			</section>

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
							<div className='mt-10'>
								<SearchAvailableTent />
							</div>
						)}
					</div>
				)}
			</div>
		</section>
	);
}
