'use client';

import CardTent from '@/components/ui/card-tent';
import SummaryTent from '@/components/ui/summary-tent';
import { useState } from 'react';
import { Tent, Category } from '@/types/reservations';
import { Award, Grid, Tent as TentIcon, Star } from 'lucide-react';
import { toast } from 'sonner';
import { useRouter } from 'next/navigation';
import { useReservationStore } from '@/store/useReservationStore';

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
}

export default function TentCollection({
	loading,
	error,
	categories,
	checkInDate,
	checkOutDate,
}: TentCollectionProps) {
	const [selectedTentIds, setSelectedTentIds] = useState<string[]>([]);
	const [selectedCategory, setSelectedCategory] = useState<string>('All');
	const router = useRouter();

	// Add Zustand store
	const {
		setReservationData,
		clearReservationData,
		clearPersonalInfo,
		clearPaymentData,
		clearBookingResponseData,
	} = useReservationStore();

	const reservationData = categories ?? [];
	const filteredCategories =
		selectedCategory === 'All'
			? reservationData
			: reservationData.filter(
					(category) => category.name === selectedCategory,
			  );

	const handleSelectTent = (tentId: string) => {
		setSelectedTentIds((prev) => {
			return prev.includes(tentId)
				? prev.filter((id) => id !== tentId) // Remove if already selected
				: [...prev, tentId]; // Add if not selected
		});
	};

	const handleRemoveTent = (tentId: string) => {
		setSelectedTentIds((prev) => prev.filter((id) => id !== tentId));
	};

	const handleRequestBook = () => {
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
		};

		// Save to Zustand store instead of localStorage
		setReservationData(reservationData);

		// Show success toast
		toast.success('Great choice! Please fill in your details to continue.');

		// Navigate to personal info page
		console.log('Navigating to personal info page');
		router.push('/reservation/personal');
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

	return (
		<div className='flex gap-10 ml-20'>
			{/* SECTION KIRI */}
			<div className='flex flex-col gap-6 w-2/3'>
				{/* Header Section */}
				<div className='relative flex justify-between items-center'>
					<div className='flex items-center gap-2 bg-card bg-secondary shadow-md px-5 py-2.5 rounded-lg text-primary'>
						<Award className='w-5 h-5' />
						<span>Our Tent Category</span>
					</div>
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
			<div className='w-1/3'>
				<SummaryTent
					selectedTents={selectedTents}
					onRemove={handleRemoveTent}
					checkInDate={checkInDate}
					checkOutDate={checkOutDate}
					onRequestBook={handleRequestBook}
				/>
			</div>
		</div>
	);
}
