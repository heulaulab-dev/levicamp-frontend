'use client';

import { useState } from 'react';
import type { DateRange } from 'react-day-picker';
import { GuestCalendar } from '@/components/pages/availability/guest-calendar';
import { TentList } from '@/components/pages/availability/tent-list';
import { useAvailability } from '@/hooks/useAvailability';

export default function CheckAvailabilityPage() {
	const [selectedDates, setSelectedDates] = useState<DateRange | undefined>(
		undefined,
	);

	const startDate = selectedDates?.from?.toISOString().split('T')[0] || '';
	const endDate = selectedDates?.to?.toISOString().split('T')[0] || '';

	const hasRange = !!selectedDates?.from && !!selectedDates?.to;

	const { data, loading, error } = useAvailability(startDate, endDate);

	const handleBookNow = (tentId: string) => {
		window.location.href = `/booking?tent=${tentId}&start=${startDate}&end=${endDate}`;
	};

	return (
		<div className='bg-gray-50 py-8 min-h-screen'>
			<div className='mx-auto px-4 container'>
				<div className='mb-8 text-center'>
					<h1 className='mb-2 font-bold text-4xl'>Cek Ketersediaan</h1>
					<p className='text-muted-foreground'>
						Pilih tanggal dan lihat tenda yang tersedia
					</p>
				</div>

				<div className='gap-8 grid grid-cols-1 lg:grid-cols-3'>
					<div className='lg:col-span-1'>
						<GuestCalendar
							selected={selectedDates}
							onSelect={setSelectedDates}
						/>

						{hasRange && (
							<div className='bg-white mt-4 p-4 border rounded-lg'>
								<p className='font-medium'>Tanggal Terpilih:</p>
								<p className='text-muted-foreground'>
									{selectedDates!.from!.toLocaleDateString('id-ID', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
									{' - '}
									{selectedDates!.to!.toLocaleDateString('id-ID', {
										weekday: 'long',
										year: 'numeric',
										month: 'long',
										day: 'numeric',
									})}
								</p>
							</div>
						)}
					</div>

					<div className='lg:col-span-2'>
						{loading ? (
							<div className='py-12 text-center'>
								<div className='mx-auto border-4 border-primary border-t-transparent rounded-full w-8 h-8 animate-spin' />
								<p className='mt-4 text-muted-foreground'>
									Memuat ketersediaan...
								</p>
							</div>
						) : error ? (
							<div className='py-12 text-red-500 text-center'>{error}</div>
						) : !hasRange ? (
							<div className='bg-white py-12 border rounded-lg text-center'>
								<p className='text-muted-foreground'>
									Pilih rentang tanggal untuk melihat ketersediaan
								</p>
							</div>
						) : (
							<TentList
								availabilityData={data}
								selectedDates={selectedDates}
								onBookNow={handleBookNow}
							/>
						)}
					</div>
				</div>
			</div>
		</div>
	);
}
