'use client';

import CardTent from '@/components/ui/card-tent';
import SummaryTent from '@/components/pages/reschedule/summary-tent';
import { useState } from 'react';
import { Tent, Category } from '@/types/reservations';
import { Grid, Tent as TentIcon, Star, Info } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useReservationStore } from '@/store/useReservationStore';
import { useReschedules } from '@/hooks/reschedules/use-reschedules';
import { useRescheduleData } from '@/hooks/reschedules/use-reschedule-data';
import { format } from 'date-fns';

interface TentCollectionProps {
	categories:
		| {
				id: string;
				name: string;
				status?: string;
				tents: Tent[];
		  }[]
		| null;
	loading: boolean;
	error: string | null;
	checkInDate?: Date;
	checkOutDate?: Date;
	isReschedule?: boolean;
	requiredTentCount?: number;
}

export default function TentCollection({
	loading,
	error,
	categories,
	checkInDate,
	checkOutDate,
	isReschedule = false,
	requiredTentCount = 0,
}: TentCollectionProps) {
	const [selectedTentIds, setSelectedTentIds] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const [isSubmitting, setIsSubmitting] = useState(false);
	const router = useRouter();

	// Add Zustand stores
	const {
		setReservationData,
		clearReservationData,
		clearPersonalInfo,
		clearPaymentData,
		clearBookingResponseData,
	} = useReservationStore();

	// Reschedule hooks
	const { createReschedule } = useReschedules();
	const { invoiceData, validationData } = useRescheduleData();

	const reservationData = categories ?? [];
	const filteredCategories =
		selectedCategory === 'All'
			? reservationData
			: reservationData.filter(
					(category) => category.name === selectedCategory,
			  );

	const handleSelectTent = (tentId: string) => {
		if (
			isReschedule &&
			selectedTentIds.length >= requiredTentCount &&
			!selectedTentIds.includes(tentId)
		) {
			toast.error(
				`You can only select ${requiredTentCount} tent(s) for rescheduling.`,
			);
			return;
		}

		setSelectedTentIds((prev) => {
			return prev.includes(tentId)
				? prev.filter((id) => id !== tentId) // Remove if already selected
				: [...prev, tentId]; // Add if not selected
		});
	};

	const handleRemoveTent = (tentId: string) => {
		setSelectedTentIds((prev) => prev.filter((id) => id !== tentId));
	};

	const handleRequestBook = async () => {
		// For rescheduling, check if the correct number of tents are selected
		if (isReschedule && selectedTentIds.length !== requiredTentCount) {
			toast.error(
				`Please select exactly ${requiredTentCount} tent(s) to proceed with rescheduling.`,
			);
			return;
		}

		// Set submitting state
		setIsSubmitting(true);

		try {
			// If this is a reschedule request and we have the necessary data
			if (
				isReschedule &&
				invoiceData &&
				validationData &&
				checkInDate &&
				checkOutDate
			) {
				// Format dates for API
				const startDate = format(checkInDate, 'yyyy-MM-dd');
				const endDate = format(checkOutDate, 'yyyy-MM-dd');

				// Create reschedule request data
				const rescheduleData = {
					booking_id: invoiceData.bookingId,
					token: validationData.token,
					tent_id: selectedTentIds,
					start_date: startDate,
					end_date: endDate,
				};

				// Call the API
				const response = await createReschedule(rescheduleData);

				// Handle successful response
				if (response.status === 200 || response.status === 201) {
					// Store the response data in sessionStorage for the success page
					sessionStorage.setItem(
						`reschedule_data_${response.data.id}`,
						JSON.stringify(response),
					);

					toast.success('Reschedule requested successfully!');

					// Navigate to success page with booking ID
					router.push(`/reschedule/${response.data.id}/success`);
					return;
				}
			}

			// If not a reschedule or if reschedule API call wasn't made, proceed with normal flow
			// Clear all previous data from store
			clearReservationData();
			clearPersonalInfo();
			clearPaymentData();
			clearBookingResponseData();

			// Get prices from the SummaryTent component
			const tentsWithApiPrices = selectedTents.map((tent) => {
				// Create a copy of the tent with the api_price field
				// This will be populated later when the API responds
				return {
					...tent,
					api_price: undefined,
				};
			});

			// Create reservation data
			const reservationData = {
				selectedTents: tentsWithApiPrices,
				checkInDate,
				checkOutDate,
				totalPrice: 0, // This will be updated by the API
				isLoadingPrices: true, // Set loading state to true
				isReschedule: isReschedule,
			};

			// Save to Zustand store instead of localStorage
			setReservationData(reservationData);

			// Show success toast
			toast.success(
				isReschedule
					? 'Great! Please confirm your rescheduling details.'
					: 'Great choice! Please fill in your details to continue.',
			);

			// Navigate to personal info page
			console.log('Navigating to personal info page');
			router.push(
				isReschedule ? '/reschedule/personal' : '/reservation/personal',
			);
		} catch (error) {
			console.error('Error in handleRequestBook:', error);
			toast.error('Failed to process your request. Please try again.');
		} finally {
			setIsSubmitting(false);
		}
	};

	// Get all selected tents with their full data
	const selectedTents = selectedTentIds
		.map((id) => {
			const tent = (categories ?? [])
				.flatMap((category) => category.tents)
				.find((tent) => tent.id === id);

			if (!tent) return null;

			// Create a new tent object with required fields
			const defaultCategory: Category = {
				id: tent.category_id,
				name:
					(categories ?? []).find((c) => c.id === tent.category_id)?.name ??
					'Unknown',
				price: 0,
				description: '',
				tents: [],
			};

			const tentWithCategory: Tent = {
				...tent,
				category: tent.category ?? defaultCategory,
			};

			return tentWithCategory;
		})
		.filter((tent): tent is NonNullable<typeof tent> => tent !== null);

	// Check if the book button should be disabled
	const isBookButtonDisabled =
		(isReschedule && selectedTentIds.length !== requiredTentCount) ||
		isSubmitting;

	return (
		<div className='flex gap-10'>
			{/* SECTION KIRI */}
			<div className='flex flex-col gap-6 w-full'>
				{/* Header Section */}
				<div className='relative flex justify-between items-center'>
					{isReschedule && requiredTentCount > 0 && (
						<div className='flex items-center gap-2 bg-secondary shadow-md px-5 py-2.5 rounded-lg font-semibold text-primary'>
							<Info className='w-5 h-5' />
							<span>
								{selectedTentIds.length}/{requiredTentCount} You Selected
							</span>
						</div>
					)}

					<div className='flex items-center gap-2 bg-primary/10 shadow-md p-1 rounded-lg'>
						{[
							{ name: 'All', icon: <Grid className='w-4 h-4' /> },
							{ name: 'Standard', icon: <TentIcon className='w-4 h-4' /> },
							{ name: 'VIP', icon: <Star className='w-4 h-4' /> },
						].map((category) => (
							<button
								key={category.name}
								className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ease-in-out ${
									selectedCategory === category.name
										? 'bg-primary text-primary-foreground shadow-md'
										: 'bg-transparent text-secondary-foreground dark:text-primary-foreground  hover:bg-primary/50 hover:text-primary-foreground'
								}`}
								onClick={() => setSelectedCategory(category.name)}
							>
								{category.icon}
								{category.name}
							</button>
						))}
					</div>
				</div>

				{/* Loading & Error Handling */}
				{loading && <p className='text-center'>Loading reservations...</p>}
				{error && <p className='text-red-500 text-center'>{error}</p>}

				{/* Tent List */}
				{!loading && !error && (
					<div className='gap-8 grid grid-cols-3'>
						{filteredCategories.length > 0 ? (
							<div className='gap-8 grid grid-cols-3 col-span-3'>
								{filteredCategories.flatMap((category) =>
									category.tents.map((tent) => (
										<CardTent
											key={tent.id}
											status={
												category.id === 'unavailable'
													? 'unavailable'
													: 'available'
											}
											tent={{
												...tent,
												category: tent.category ?? {
													id: category.id,
													name: category.name,
													price: 0,
													description: '',
													tents: [],
												},
											}}
											isSelected={selectedTentIds.includes(tent.id)}
											onSelect={() => handleSelectTent(tent.id)}
										/>
									)),
								)}
							</div>
						) : (
							<p className='col-span-3 text-gray-500 text-center'>
								No tents available
							</p>
						)}
					</div>
				)}
			</div>

			{/* SECTION KANAN (Summary Card) */}
			<div className='w-full'>
				<SummaryTent
					selectedTents={selectedTents}
					onRemove={handleRemoveTent}
					checkInDate={checkInDate}
					checkOutDate={checkOutDate}
					onRequestBook={handleRequestBook}
					isReschedule={isReschedule}
					isButtonDisabled={isBookButtonDisabled}
					requiredTentCount={requiredTentCount}
				/>
			</div>
		</div>
	);
}
