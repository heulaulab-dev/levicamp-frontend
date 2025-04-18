'use client';

import HeroHeader from '@/components/pages/landing/hero-header';
import WhyUsSection from '@/components/pages/landing/why-us-section';
import Facilities from '@/components/pages/landing/facilities';
import TentPrice from '@/components/pages/landing/tent-price';

export default function Home() {
	return (
		<div className='bg-background'>
			<HeroHeader />
			<Facilities />
			<WhyUsSection />
			<TentPrice />
		</div>
	);
}