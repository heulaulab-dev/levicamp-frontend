import Image from 'next/image';
import SearchBooking from '@/components/pages/reschedule/search-booking';
import StatusCard from '@/components/pages/reschedule/status-card';
import InvoiceDetail from '@/components/pages/reschedule/invoice-detail';
import { useReschedules } from '@/hooks/reschedules/use-reschedules';
import RescheduleForm from '@/components/pages/reschedule/reschedule-form';
import { useMemo, useState } from 'react';

interface ReservationTent {
	id: string;
	name: string;
	tent_images: string[];
	category:
		| {
				id: string;
				name: string;
				weekday_price: number;
				weekend_price: number;
		  }
		| string;
	weekday_price: number;
	weekend_price: number;
	capacity?: number;
}

export default function HeroHeader() {
	const { validationData, bookingData } = useReschedules();

	const [showTentCollection, setShowTentCollection] = useState(false);

	const invoiceData = useMemo(() => {
		if (!validationData?.booking) return null;

		const booking = validationData.booking;
		const detailBooking = booking.detail_booking || [];

		const tents = detailBooking.map((detail) => {
			const tent = detail.reservation.tent as ReservationTent;

			return {
				id: tent.id,
				name: tent.name,
				image: tent.tent_images?.[0] || '',
				category:
					typeof tent.category === 'object'
						? tent.category.name
						: String(tent.category),
				capacity: tent.capacity || 0,
				price: tent.weekday_price || 0,
			};
		});

		return {
			bookingId: booking.id || '',
			paymentDate: booking.created_at || '',
			guestName: booking.guest_id || '',
			guestEmail: booking.guest_id || '',
			guestPhone: booking.guest_id || '',
			guestCount: String(detailBooking.length),
			checkInDate: booking.start_date || '',
			checkOutDate: booking.end_date || '',
			tents,
			totalPrice: booking.total_amount || 0,
		};
	}, [validationData]);

	const handleRescheduleRequest = () => {
		setShowTentCollection(true);
	};

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

			<div className='flex flex-col items-center mt-20 w-full container'>
				{bookingData && validationData && invoiceData && (
					<div className='flex flex-col items-center w-full container'>
						<StatusCard />

						{!showTentCollection && (
							<>
								<InvoiceDetail {...invoiceData} />
								<RescheduleForm onRescheduleRequest={handleRescheduleRequest} />
							</>
						)}
					</div>
				)}
			</div>
		</section>
	);
}
