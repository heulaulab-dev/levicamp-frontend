'use client';

import FacilitiesCard from '@/components/ui/facilities-card';
import { ListFacilities } from '@/constants/facilities/list-facilities';

export default function Page() {
	return (
		<div className='relative bg-[#f5f3ff] my-24 px-6 py-10 h-screen'>
			{/* Tombol */}
			<div className='flex gap-6'>
				{ListFacilities.map((facility, i) => (
					<FacilitiesCard key={i} {...facility} />
				))}
			</div>
		</div>
	);
}
