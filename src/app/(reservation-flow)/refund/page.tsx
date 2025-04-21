'use client';

import HeroSection from '@/components/common/hero-section';
import SearchBooking from '@/components/pages/refund/search-booking';

export default function RefundIndexPage() {
	return (
		<HeroSection
			title='Request a refund or track your status'
			description='Just enter your booking code and let’s handle the rest!'
		>
			<SearchBooking />
		</HeroSection>
	);
}
