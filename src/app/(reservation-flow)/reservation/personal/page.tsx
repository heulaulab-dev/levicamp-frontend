'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/common/hero-section';
import {
	PersonalInfoCard,
	PersonalInfoData,
} from '@/components/pages/reservation/personal/personal-info-card';
import { ReservationStepper } from '@/components/pages/reservation/reservation-stepper';
import { ReservationSummary } from '@/components/pages/reservation/reservation-summary';
import { useReservations } from '@/hooks/reservations/use-reservations';
import { useHydration } from '@/hooks/use-hydration';
import { useReservationStore } from '@/store/useReservationStore';

export default function PersonalPage() {
	const router = useRouter();
	const [isLoading, setIsLoading] = useState(true);
	const isHydrated = useHydration();

	// Get the checkPrice function
	const { checkPrice } = useReservations();

	// Use Zustand store
	const {
		reservationData,
		personalInfo,
		hasSubmittedPersonalInfo,
		setPersonalInfo,
		setReservationData,
	} = useReservationStore();

	// Check for missing data and redirect if needed
	useEffect(() => {
		// Only check for redirect after hydration is complete
		if (!isHydrated) return;

		// Redirect if no reservation data
		if (!reservationData) {
			router.push('/reservation');
			return;
		}
		setIsLoading(false);
	}, [router, reservationData, isHydrated]);

	// Fetch prices from API when page loads
	useEffect(() => {
		if (!reservationData || !isHydrated) return;

		const fetchPrices = async () => {
			if (
				reservationData.selectedTents.length > 0 &&
				reservationData.checkInDate &&
				reservationData.checkOutDate
			) {
				try {
					// Get all tent IDs
					const tentIds = reservationData.selectedTents.map((tent) => tent.id);

					// Fetch prices from API
					const priceData = await checkPrice(
						tentIds,
						reservationData.checkInDate,
						reservationData.checkOutDate,
					);

					if (priceData && priceData.data) {
						// Create a map of tent IDs to their API prices
						const priceMap: Record<string, number> = {};
						priceData.data.tents.forEach((t: { id: string; price: number }) => {
							priceMap[t.id] = t.price;
						});

						// Update tent data with API prices
						const updatedTents = reservationData.selectedTents.map((tent) => ({
							...tent,
							api_price: priceMap[tent.id],
						}));

						// Update reservation data with API prices and total
						setReservationData({
							...reservationData,
							selectedTents: updatedTents,
							totalPrice: priceData.data.total_price,
							isLoadingPrices: false,
						});
					}
				} catch (error) {
					console.error('Failed to fetch prices:', error);
					// Set loading to false even if there was an error
					setReservationData({
						...reservationData,
						isLoadingPrices: false,
					});
				}
			}
		};

		if (reservationData.isLoadingPrices) {
			fetchPrices();
		}
	}, [reservationData, setReservationData, isHydrated]);

	const handlePersonalInfoSubmit = (data: PersonalInfoData) => {
		// Save to Zustand store with persist
		setPersonalInfo(data);
		toast.success('Personal information submitted successfully');
	};

	const handleRequestToBook = () => {
		router.push('/reservation/check-detail');
	};

	if (isLoading) {
		return <div>Loading...</div>;
	}

	return (
		<HeroSection
			title='Tell us a bit about yourself!'
			description="Just fill in your details, and we'll take care of the rest."
		>
			<div className='mx-auto my-24 px-4 container'>
				<div className='hidden md:block mb-8'>
					<ReservationStepper currentStep={1} />
				</div>

				<div className='gap-8 grid grid-cols-1 lg:grid-cols-6 pb-12'>
					{/* Personal Information Form */}
					<div className='lg:col-span-4'>
						<PersonalInfoCard
							onSubmit={handlePersonalInfoSubmit}
							initialData={personalInfo || undefined}
						/>
					</div>

					{/* Reservation Summary */}
					<div className='lg:col-span-2'>
						{reservationData && (
							<ReservationSummary
								data={reservationData}
								onContinue={handleRequestToBook}
								showButtons={true}
								showBackButton={false}
								showContinueButton={true}
								backButtonText='Back'
								continueButtonText='Request to Book'
								disableContinue={!hasSubmittedPersonalInfo}
							/>
						)}
					</div>
				</div>
			</div>
		</HeroSection>
	);
}
