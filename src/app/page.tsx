'use client';

import HeroHeader from "@components/Landing/HeroHeader";
import WhyUsSection from "@components/Landing/WhyUsSection";
import Facilities from "@components/Landing/Facilities";
import TentPrice from "@components/Landing/TentPrice";

export default function Home() {
	return (
		<div className="bg-white text-gray-900">
			<HeroHeader />
			<Facilities/>
			<WhyUsSection />
			<TentPrice/>
		</div>
	);
}