'use client';
import { format } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/common/hero-section';
import { PersonalInfoCard } from '@/components/pages/reservation/check-detail/personal-info-card';
import { ReservationStepper } from '@/components/pages/reservation/reservation-stepper';
import { ReservationSummary } from '@/components/pages/reservation/reservation-summary';
import { useReservations } from '@/hooks/reservations/use-reservations';
import { useHydration } from '@/hooks/use-hydration';
import { useReservationStore } from '@/store/useReservationStore';

export default function CheckDetailPage() {
	const router = useRouter();
	const { createReservation } = useReservations();
	const setDate = useReservations((state) => state.setDate);
	const handleSearch = useReservations((state) => state.handleSearch);
	const [isLoading, setIsLoading] = useState(true);
	const [isSubmitting, setIsSubmitting] = useState(false);
	const isHydrated = useHydration();

	const { reservationData, personalInfo, setBookingResponseData } =
		useReservationStore();

	useEffect(() => {
		// Only check for redirect after hydration is complete
		if (!isHydrated) return;

		// Redirect if data is missing
		if (!reservationData) {
			router.push('/reservation');
			return;
		}

		if (!personalInfo) {
			router.push('/reservation/personal');
			return;
		}

		setIsLoading(false);
	}, [router, reservationData, personalInfo, isHydrated]);

	if (isLoading) {
		return <div>Loading...</div>;
	}

	const handleChangeBookingDate = async () => {
		if (reservationData?.checkInDate && reservationData?.checkOutDate) {
			// Set the dates in the Zustand store
			setDate({
				from: reservationData.checkInDate,
				to: reservationData.checkOutDate,
			});

			// Trigger API search
			await handleSearch((message) => {
				toast.error(message);
			});
		}
		router.push('/reservation');
	};

	const handleProceedToPayment = async () => {
		try {
			setIsSubmitting(true);

			if (!reservationData?.checkInDate || !reservationData?.checkOutDate) {
				toast.error('Invalid booking dates');
				return;
			}

			if (!personalInfo) {
				toast.error('Personal information not found');
				return;
			}

			const reservationRequest = {
				name: personalInfo.name,
				email: personalInfo.email,
				phone: personalInfo.phone,
				address: personalInfo.address,
				tent_id: reservationData.selectedTents.map((tent) => tent.id),
				start_date: format(reservationData.checkInDate, 'yyyy-MM-dd'),
				end_date: format(reservationData.checkOutDate, 'yyyy-MM-dd'),
			};

			const response = await createReservation(reservationRequest);

			// Store the reservation response in the Zustand store instead of localStorage
			setBookingResponseData(response);

			// Navigate to payment page
			router.push('/reservation/payment');
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Failed to create reservation',
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	return (
		<HeroSection
			title="Take a moment to review your details and confirm everything's set"
			description='Confirm your payment details and complete your reservation.'
		>
			<div className='mx-auto my-24 px-4 container'>
				<div className='hidden md:block mb-8'>
					<ReservationStepper currentStep={2} />
				</div>

				<div className='gap-8 grid grid-cols-1 lg:grid-cols-6 pb-12'>
					{/* Personal Information Form */}
					<div className='lg:col-span-4'>
						<PersonalInfoCard />
					</div>

					{/* Reservation Summary */}
					<div className='lg:col-span-2'>
						{reservationData && (
							<ReservationSummary
								data={reservationData}
								showButtons={true}
								showBackButton={true}
								showContinueButton={true}
								onBack={handleChangeBookingDate}
								onContinue={handleProceedToPayment}
								backButtonText='Change Booking Date'
								continueButtonText='Proceed to Payment'
								isLoading={isSubmitting}
							/>
						)}
					</div>
				</div>
			</div>
		</HeroSection>
	);
}
