/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/common/hero-section';
import InvoiceDetail from '@/components/pages/reservation/invoice/invoice-detail';
import { ReservationStepper } from '@/components/pages/reservation/reservation-stepper';
import { Button } from '@/components/ui/button';
import { Confetti } from '@/components/ui/confetti';
import { useHydration } from '@/hooks/use-hydration';
import { useReservationStore } from '@/store/useReservationStore';
import LoadingTent from '@/components/common/loading-tent';
import { downloadInvoice, triggerFileDownload } from '@/lib/api';

export default function InvoicePage() {
	const params = useParams();
	const bookingId = params.bookingId as string;
	const [loading, setLoading] = useState(true);
	const isHydrated = useHydration();
	const [showConfetti, setShowConfetti] = useState(true);

	const { reservationData, personalInfo, bookingResponseData, paymentData } =
		useReservationStore();

	useEffect(() => {
		if (!isHydrated) return;

		// Verify that we have the required data
		if (
			!reservationData ||
			!personalInfo ||
			!bookingResponseData ||
			!paymentData
		) {
			// If missing data, you could either redirect or attempt to fetch it using the bookingId
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

	const handleDownload = async () => {
		try {
			toast.info('Preparing your invoice for download...');

			// Download the PDF blob from the API
			const pdfBlob = await downloadInvoice(bookingId);

			// Generate filename with booking ID
			const filename = `invoice-${bookingId}.pdf`;

			// Trigger the download
			triggerFileDownload(pdfBlob, filename);

			toast.success('Invoice downloaded successfully!');
		} catch (error) {
			console.error('Download error:', error);
			toast.error('Failed to download invoice. Please try again.');
		}
	};

	if (loading) {
		return <LoadingTent />;
	}

	// Format dates for display
	const formattedCheckInDate = reservationData?.checkInDate
		? format(new Date(reservationData.checkInDate), 'EEE, MMM dd yyyy')
		: 'N/A';

	const formattedCheckOutDate = reservationData?.checkOutDate
		? format(new Date(reservationData.checkOutDate), 'EEE, MMM dd yyyy')
		: 'N/A';

	const paymentDate = paymentData?.payment?.created_at
		? format(new Date(paymentData.payment.created_at), 'MMMM d, yyyy')
		: 'N/A';

	// Prepare tents data for the InvoiceDetail component
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
