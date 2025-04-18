'use client';

import Image from 'next/image';
import SearchBooking from '@/components/pages/reschedule/search-booking';

export default function RescheduleIndexPage() {
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
			<div className='flex flex-col items-center w-full max-w-3xl'>
				<SearchBooking />
			</div>
		</section>
	);
}
