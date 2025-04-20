'use client';

import HeroSection from '@/components/common/hero-section';
import SearchBooking from '@/components/pages/refund/search-booking';

export default function RefundIndexPage() {
	return (
		<HeroSection
			title={
				<>
					<span className='text-primary'>
						Request a refund or track your status
					</span>{' '}
					just enter your booking code and let’s handle the rest!
				</>
			}
		>
			<SearchBooking />
		</HeroSection>
	);
}
