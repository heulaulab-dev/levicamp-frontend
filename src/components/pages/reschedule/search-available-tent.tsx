import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { format, isBefore, startOfToday } from 'date-fns';
import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from '@/components/ui/popover';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { useReservations } from '@/hooks/reservations/use-reservations';
import { CalendarIcon } from 'lucide-react';
import { toast } from 'sonner';
import { useState } from 'react';
import Loading from '@/components/ui/loading';
import TentCollection from '@/components/pages/reschedule/tent-collection';
import { useRescheduleData } from '@/hooks/reschedules/use-reschedule-data';

export default function SearchAvailableTent() {
	const today = startOfToday();
	const { invoiceData } = useRescheduleData();

	// Get the required tent count from the original booking
	const requiredTentCount = invoiceData?.tents?.length || 0;

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
		<>
			<section className='flex md:flex-row flex-col items-center gap-4 bg-secondary shadow-md p-6 rounded-lg w-full'>
				<div className='w-full'>
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

				<div className='w-full'>
					<label className='font-medium text-secondary-foreground text-sm'>
						Booking Date
					</label>
					<Popover>
						<PopoverTrigger asChild>
							<Button className='flex justify-between bg-white hover:bg-white w-full text-secondary-foreground'>
								{date?.from ? (
									date.to ? (
										<>
											{format(date.from, 'PPP')} - {format(date.to, 'PPP')}
										</>
									) : (
										format(date.from, 'PPP')
									)
								) : (
									'Select date range'
								)}
								<CalendarIcon className='ml-2 w-4 h-4' />
							</Button>
						</PopoverTrigger>
						<PopoverContent className='p-0 w-auto'>
							<Calendar
								mode='range'
								selected={date}
								onSelect={setDate}
								numberOfMonths={2}
								className='rounded-md'
								disabled={(date) => isBefore(date, today)}
								initialFocus
							/>
						</PopoverContent>
					</Popover>
				</div>

				<div>
					<label className='opacity-0 font-medium text-secondary-foreground text-sm'>
						Action
					</label>
					<Button
						className='bg-primary rounded-lg w-full h-10 text-primary-foreground'
						onClick={() => {
							setSelectedCategory(tempSelectedCategory);
							handleSearch((message: string) => {
								toast(message);
							});
						}}
						disabled={loading}
					>
						{loading ? 'Loading...' : 'Search'}
					</Button>
				</div>
			</section>
			{/* Bagian Hasil Pencarian */}
			<section className='items-center mt-4 mb-20'>
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
						isReschedule={true}
						requiredTentCount={requiredTentCount}
					/>
				)}
			</section>
		</>
	);
}
