import { useState } from 'react';
import { toast } from 'sonner';

import TentCollection from '@/components/pages/reservation/tent-collection';
import { Button } from '@/components/ui/button';
import DateRangePicker from '@/components/ui/date-picker';
import { Spinner } from '@/components/ui/ios-spinner';
import Loading from '@/components/ui/loading';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useReservations } from '@/hooks/reservations/use-reservations';

export default function ReservationForm() {
	const {
		date,
		setDate,
		reservationData,
		loading,
		error,
		handleSearch,
		showResults,
		setSelectedCategory,
		selectedCategory,
	} = useReservations();

	const [tempSelectedCategory, setTempSelectedCategory] =
		useState(selectedCategory);

	return (
		<div className='flex flex-col items-center gap-32 w-full'>
			{/* Reservation Date Picker */}
			<div className='flex md:flex-row flex-col items-center md:gap-4 bg-secondary shadow-xl p-6 rounded-lg w-full max-w-3xl'>
				{/* Search Form Section */}
				<div className='flex md:flex-row flex-col gap-4 w-full'>
					<div className='flex flex-col gap-2 w-full'>
						<label className='font-medium text-secondary-foreground text-sm'>
							Category
						</label>
						<Select onValueChange={setTempSelectedCategory}>
							<SelectTrigger className='bg-white w-full text-secondary-foreground'>
								<SelectValue placeholder='All' />
							</SelectTrigger>
							<SelectContent className='bg-white'>
								<SelectItem className='text-secondary-foreground' value='All'>
									All
								</SelectItem>
								<SelectItem className='text-secondary-foreground' value='VIP'>
									VIP
								</SelectItem>
								<SelectItem
									className='text-secondary-foreground'
									value='Standard'
								>
									Standard
								</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<DateRangePicker date={date} setDate={setDate} label='Booking Date' />
				</div>

				{/* Search Button Section */}
				<div className='flex flex-col gap-2 w-full md:w-auto'>
					<label className='opacity-0 font-medium text-secondary-foreground text-sm'>
						Action
					</label>
					<Button
						className='group relative'
						data-loading={loading}
						onClick={() => {
							setSelectedCategory(tempSelectedCategory);
							handleSearch((message: string) => {
								toast(message);
							});
						}}
						disabled={loading}
					>
						<span className='group-data-[loading=true]:text-transparent'>
							Search Now!
						</span>
						{loading && (
							<div className='absolute inset-0 flex justify-center items-center'>
								<Spinner size='lg' />
							</div>
						)}
					</Button>
				</div>
			</div>

			{/* Search Results Section */}
			<section>
				{loading && <Loading />}
				{error && toast.error(error)}
				{!loading && !error && showResults && (
					<TentCollection
						categories={(reservationData ?? []).filter(
							(category) =>
								selectedCategory === 'All' ||
								category.name === selectedCategory,
						)}
						loading={loading}
						error={error}
						checkInDate={date?.from}
						checkOutDate={date?.to}
					/>
				)}
			</section>
		</div>
	);
}
