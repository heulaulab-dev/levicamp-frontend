'use client';

import LocationSection from '@/components/common/location-section';
import FacilitiesSection from '@/components/pages/landing/facilities-section';
import HeroSection from '@/components/pages/landing/hero-section';
import PricingSection from '@/components/pages/landing/pricing-section';
import { defaultTiers } from '@/constants/pricing/pricing-list';

export default function Home() {
	return (
		<div>
			<HeroSection />
			<FacilitiesSection />
			<PricingSection tiers={defaultTiers} />
			<LocationSection />
		</div>
	);
}
