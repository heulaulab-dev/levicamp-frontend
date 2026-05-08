'use client';

import { format } from 'date-fns';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';

import HeroSection from '@/components/common/hero-section';
import LoadingTent from '@/components/common/loading-tent';
import InvoiceDetail from '@/components/pages/reservation/invoice/invoice-detail';
import { ReservationStepper } from '@/components/pages/reservation/reservation-stepper';
import { Confetti } from '@/components/ui/confetti';
import { useHydration } from '@/hooks/use-hydration';
import { useReservationStore } from '@/store/useReservationStore';

export default function InvoicePage() {
	const bookingId = (useParams() as { bookingId?: string }).bookingId ?? '';
	const [loading, setLoading] = useState(true);
	const isHydrated = useHydration();
	const [showConfetti] = useState(true);

	const { reservationData, personalInfo, bookingResponseData, paymentData } =
		useReservationStore();

	useEffect(() => {
		if (!isHydrated) return;

		if (
			!reservationData ||
			!personalInfo ||
			!bookingResponseData ||
			!paymentData
		) {
			console.error('Missing required data for invoice');
		}

		setLoading(false);
	}, [
		isHydrated,
		reservationData,
		personalInfo,
		bookingResponseData,
		paymentData,
	]);

	if (loading) {
		return <LoadingTent />;
	}

	const formattedCheckInDate = reservationData?.checkInDate
		? format(new Date(reservationData.checkInDate), 'EEE, MMM dd yyyy')
		: 'N/A';

	const formattedCheckOutDate = reservationData?.checkOutDate
		? format(new Date(reservationData.checkOutDate), 'EEE, MMM dd yyyy')
		: 'N/A';

	const paymentDate = paymentData?.payment?.created_at
		? format(new Date(paymentData.payment.created_at), 'MMMM d, yyyy')
		: 'N/A';

	const tents =
		reservationData?.selectedTents?.map((tent) => ({
			id: tent.id,
			name: tent.name,
			image: tent.tent_images[0],
			category: tent.category?.name || 'Standard',
			capacity: tent.capacity,
			price: tent.api_price || tent.weekend_price || 0,
		})) || [];

	return (
		<>
			{showConfetti && (
				<Confetti
					style={{
						position: 'fixed',
						width: '100%',
						height: '100%',
						zIndex: 100,
						pointerEvents: 'none',
					}}
					options={{
						particleCount: 100,
						spread: 70,
						origin: { y: 0.3 },
					}}
				/>
			)}

			<HeroSection
				title='Thank you for choosing Levi Camp!'
				description='Here is your invoice. Download it, screenshot it, or check your email for a copy.'
				showActionButtons={true}
			>
				<div className='mx-auto my-24 px-4 container'>
					<div className='hidden md:block mb-8'>
						<ReservationStepper currentStep={5} />
					</div>
					<InvoiceDetail
						bookingId={bookingId}
						paymentDate={paymentDate}
						guestName={personalInfo?.name || ''}
						guestEmail={personalInfo?.email || ''}
						guestPhone={personalInfo?.phone ? `+62${personalInfo.phone}` : ''}
						guestCount={personalInfo?.guestCount || '1'}
						checkInDate={formattedCheckInDate}
						checkOutDate={formattedCheckOutDate}
						tents={tents}
						totalPrice={reservationData?.totalPrice || 0}
					/>
				</div>
			</HeroSection>
		</>
	);
}
