import { format, isBefore, startOfToday } from 'date-fns';
import { CalendarIcon } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { toast } from 'sonner';

import Loading from '@components/ui/loading';

import TentCollection from '@/components/pages/reservation/tent-collection';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';
import { Card, CardContent } from '@/components/ui/card';
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
import { useReservations } from '@/hooks/reservations/use-reservations'; // Import custom hook

export function HeroHeader() {
	const today = startOfToday();
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
			<section
				className='flex flex-col justify-center items-center bg-gradient-to-b mt-[80px] px-4 py-10 min-h-screen'
				style={{
					backgroundImage: "url('/bg.png')",
					backgroundSize: 'cover',
					backgroundPosition: 'center',
					backgroundRepeat: 'no-repeat',
				}}
			>
				<Image
					src='/assets/icons/camp-icon.png'
					alt='Camping Icon'
					width={50}
					height={50}
				/>

				<div className='mt-4 mb-6 max-w-3xl text-center'>
					<h1 className='font-bold text-primary dark:text-primary-foreground text-4xl md:text-5xl leading-tight'>
						Your <span className='text-primary'>Reservation,</span> Your Way!
						Fast, Flexible, and hassle-free. Book now and take control of your
						plans today!
					</h1>
				</div>

				{/* Form Reservasi */}
				<div className='flex md:flex-row flex-col items-center gap-4 bg-secondary shadow-md p-6 rounded-lg w-full max-w-3xl'>
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
				</div>
				<div className='flex md:flex-row flex-col gap-4 mt-6'>
					<Card className='w-full md:w-72'>
						<CardContent className='p-4'>
							<h3 className='font-semibold text-primary text-lg'>
								Need to Reschedule?
							</h3>
							<p className='text-secondary-foreground text-sm'>
								Flexible booking changes up to 48 hours before check-in
							</p>
							<Button asChild className='mt-2 w-full'>
								<Link href='/reschedule'>Request Change</Link>
							</Button>
						</CardContent>
					</Card>

					<Card className='w-full md:w-72'>
						<CardContent className='p-4'>
							<h3 className='font-semibold text-primary text-lg'>
								Request a Refund
							</h3>
							<p className='text-secondary-foreground text-sm'>
								Our hassle-free refund process for eligible bookings
							</p>
							<Button asChild className='mt-2 w-full'>
								<Link href='/refund'>Request Refund</Link>
							</Button>
						</CardContent>
					</Card>
				</div>
			</section>

			{/* Bagian Hasil Pencarian */}
			<section className='mb-20 w-full'>
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
		</>
	);
}
