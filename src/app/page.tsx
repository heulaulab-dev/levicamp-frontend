/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import Hero from '@/components/pages/landing/hero-section';
import WhyUsSection from '@/components/pages/landing/why-us-section';
import FacilitiesSection from '@/components/pages/landing/facilities';
import TentPrice from '@/components/pages/landing/tent-price';
import FacilitesDemo from '@/components/pages/landing/facilities-demo';
import PricingSection from '@/components/pages/landing/pricing-section';
import { Zap, ArrowDownToDot, Tent } from 'lucide-react';
import { defaultTiers } from '@/constants/pricing/pricing-list';

export default function Home() {
	return (
		<div>
			<Hero />
			<FacilitesDemo />
			<PricingSection tiers={defaultTiers} />
			{/* <FacilitiesSection />
			<WhyUsSection />
			<TentPrice /> */}
		</div>
	);
}
