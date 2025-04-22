'use client';

import HeroSection from '@/components/common/hero-section';
import SearchBooking from '@/components/pages/reschedule/search-booking';

export default function RescheduleIndexPage() {
	return (
		<HeroSection
			title={
				<>
					Enter your booking code to{' '}
					<span className='text-primary'>Reschedule</span> your adventure.
				</>
			}
			description='Your next escape is just a few clicks away!'
		>
			<div className='flex flex-col items-center w-full max-w-3xl'>
				<SearchBooking />
			</div>
		</HeroSection>
	);
}
