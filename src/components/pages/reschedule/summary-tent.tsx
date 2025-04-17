/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { Card, CardContent, CardHeader, CardFooter } from '@components/ui/card';
import { Button } from '@/components/ui/button';
import { Separator } from '@components/ui/separator';
import { Bookmark, HelpCircle, Trash2 } from 'lucide-react';
import { Tent } from '@/types/reservations';
import { useRescheduleData } from '@/hooks/reschedules/use-reschedule-data';
import { differenceInDays } from 'date-fns';
import { useReservations } from '@/hooks/reservations/use-reservations';
import { useEffect, useState } from 'react';

interface SummaryTentProps {
	selectedTents: Tent[];
	onRemove: (tentId: string) => void;
	checkInDate?: Date;
	checkOutDate?: Date;
	onRequestBook?: () => void;
	isReschedule?: boolean;
	isButtonDisabled?: boolean;
	requiredTentCount?: number;
}

export default function SummaryTent({
	selectedTents,
	onRemove,
	checkInDate = new Date(),
	checkOutDate = new Date(),
	onRequestBook,
	isReschedule = false,
	isButtonDisabled = false,
	requiredTentCount = 0,
}: SummaryTentProps) {
	// State variables
	const { invoiceData } = useRescheduleData();
	// Get the checkPrice function from the hook
	const { checkPrice } = useReservations();

	// Add missing state variables
	const [loading, setLoading] = useState(false);
	const [loadingPerTent, setLoadingPerTent] = useState<Record<string, boolean>>(
		{},
	);
	const [totalPrice, setTotalPrice] = useState(0);
	const [tentsWithPrices, setTentsWithPrices] = useState<
		Record<string, number>
	>({});
	const [tentCategoryFromApi, setTentCategoryFromApi] = useState<
		Record<string, string>
	>({});
	const [tentCapacityFromApi, setTentCapacityFromApi] = useState<
		Record<string, string>
	>({});
	const [days, setDays] = useState(1);

	// Calculate duration between check-in and check-out dates for the new booking
	const duration =
		checkInDate && checkOutDate
			? differenceInDays(checkOutDate, checkInDate) || 1
			: 1;

	// Fetch prices when tents or dates change
	useEffect(() => {
		const fetchPrice = async () => {
			setLoading(true);
			// Set all tents to loading state
			const newLoadingState: Record<string, boolean> = {};
			selectedTents.forEach((tent) => {
				newLoadingState[tent.id] = true;
			});
			setLoadingPerTent(newLoadingState);

			try {
				if (selectedTents.length > 0 && checkInDate && checkOutDate) {
					const data = await checkPrice(
						selectedTents.map((t) => t.id),
						checkInDate,
						checkOutDate,
					);

					if (data !== null && data.data) {
						setTotalPrice(data.data.total_price);
						const priceMap: Record<string, number> = {};
						const categoryMap: Record<string, string> = {};
						const capacityMap: Record<string, string> = {};
						const loadingMap: Record<string, boolean> = {};

						data.data.tents.forEach(
							(t: {
								id: string;
								price: number;
								category: string;
								capacities: string;
							}) => {
								priceMap[t.id] = t.price;
								categoryMap[t.id] = t.category;
								capacityMap[t.id] = t.capacities;
								loadingMap[t.id] = false;
							},
						);

						setTentsWithPrices(priceMap);
						setTentCategoryFromApi(categoryMap);
						setTentCapacityFromApi(capacityMap);
						setLoadingPerTent(loadingMap);
					}
				} else {
					setTotalPrice(0);
				}
			} catch (err) {
				console.error('Failed to fetch price', err);
				// Reset loading state on error
				const resetLoadingState: Record<string, boolean> = {};
				selectedTents.forEach((tent) => {
					resetLoadingState[tent.id] = false;
				});
				setLoadingPerTent(resetLoadingState);
			} finally {
				setLoading(false);
			}
		};

		fetchPrice();
	}, [selectedTents, checkInDate, checkOutDate, checkPrice]);

	// Calculate days between start and end dates
	useEffect(() => {
		if (checkInDate && checkOutDate) {
			const diff = differenceInDays(checkOutDate, checkInDate);
			setDays(diff);
		}
	}, [checkInDate, checkOutDate]);

	// Check if we have prices for all tents
	const allPricesLoaded = selectedTents.every(
		(tent) =>
			tentsWithPrices[tent.id] !== undefined && !loadingPerTent[tent.id],
	);

	// Calculate total price only if all prices are loaded
	const calculatedTotalPrice = allPricesLoaded
		? selectedTents.reduce(
				(sum, tent) => sum + (tentsWithPrices[tent.id] || 0),
				0,
		  )
		: 0;

	// Get price per night (avoid using weekend_price as fallback)
	const getPricePerNight = (tent: Tent) => {
		if (!tentsWithPrices[tent.id] || loadingPerTent[tent.id]) {
			return null; // No price available yet
		}
		return tentsWithPrices[tent.id] / (days || 1);
	};

	// Get total price for a tent
	const getTotalTentPrice = (tent: Tent) => {
		if (!tentsWithPrices[tent.id] || loadingPerTent[tent.id]) {
			return null; // No price available yet
		}
		return tentsWithPrices[tent.id];
	};

	// Use the calculated total price from API instead of simple addition
	const displayTotalPrice = loading ? 0 : totalPrice;

	return (
		<div className='bg-background p-4 border rounded-xl'>
			<Card className='shadow-none border-0'>
				<CardContent className='p-0'>
					{/* Current Order */}
					{invoiceData && (
						<div className='bg-secondary/10 mb-4 p-5 border-2 border-primary rounded-lg'>
							{/* Header */}
							<div className='inline-flex items-center bg-primary mb-3 px-3 py-2 rounded-md'>
								<Bookmark className='mr-2 w-4 h-4' />
								<span className='font-medium'>Current Order</span>
							</div>

							{/* Order ID */}
							<div>
								<p className='text-sm'>
									Order ID :{' '}
									<span className='font-medium text-primary'>
										{invoiceData.bookingId}
									</span>
								</p>
							</div>
							<Separator className='my-2' />

							{/* Check-in/Check-out */}
							<div className='flex items-center space-x-4 mb-4 w-full h-20'>
								<div>
									<p className='mb-1'>Check-In</p>
									<p className='font-medium'>
										{new Date(invoiceData.checkInDate).toLocaleDateString(
											'en-US',
											{
												weekday: 'short',
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											},
										)}
									</p>
									<p className='text-sm'>from 14:00 WIB</p>
								</div>
								<Separator orientation='vertical' />
								<div>
									<p className='mb-1'>Check-Out</p>
									<p className='font-medium'>
										{new Date(invoiceData.checkOutDate).toLocaleDateString(
											'en-US',
											{
												weekday: 'short',
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											},
										)}
									</p>
									<p className='text-sm'>to 11:00 WIB</p>
								</div>
							</div>

							<p className='font-medium text-sm'>You Selected</p>
							<Separator className='my-2' />

							{/* Original booked tents */}
							{invoiceData.tents.map((tent) => (
								<div key={tent.id} className='mb-4'>
									<div className='flex justify-between items-center mb-1'>
										<h3 className='font-medium'>{tent.name}</h3>
									</div>
									<div className='grid grid-cols-2 text-sm'>
										<p className=''>Category</p>
										<p className='text-right'>{tent.category}</p>
										<p className=''>Max. Capacity</p>
										<p className='text-right'>{tent.capacity} guests</p>
										<p className=''>Price</p>
										<p className='font-medium text-right'>
											IDR {tent.price.toLocaleString()}
										</p>
									</div>
								</div>
							))}

							{/* Duration */}
							<div className='bg-primary mb-4 py-2 rounded-full text-primary-foreground text-center'>
								{differenceInDays(
									new Date(invoiceData.checkOutDate),
									new Date(invoiceData.checkInDate),
								) || 1}{' '}
								{differenceInDays(
									new Date(invoiceData.checkOutDate),
									new Date(invoiceData.checkInDate),
								) === 1
									? 'Day'
									: 'Days'}
							</div>

							<Separator className='my-2' />

							{/* Total Price */}
							<div className='flex justify-between items-center'>
								<div className='flex items-center'>
									<p className='font-medium'>Total Price</p>
									<HelpCircle className='ml-1 w-4 h-4' />
								</div>
								<p className='font-bold text-lg'>
									IDR {invoiceData.totalPrice.toLocaleString()}
								</p>
							</div>
						</div>
					)}

					{/* Reschedule Summary */}
					{checkInDate && checkOutDate && (
						<Card className='mb-4'>
							<CardHeader className='pb-2'>
								<h3 className='font-bold text-lg'>Reschedule Summary</h3>
							</CardHeader>
							<CardContent>
								{/* Check-in/Check-out */}
								<div className='flex items-center space-x-4 mb-4 w-full h-20'>
									<div>
										<p className='mb-1'>Check-In</p>
										<p className='font-medium'>
											{checkInDate.toLocaleDateString('en-US', {
												weekday: 'short',
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											})}
										</p>
										<p className='text-sm'>from 14:00 WIB</p>
									</div>
									<Separator orientation='vertical' />
									<div>
										<p className='mb-1'>Check-Out</p>
										<p className='font-medium'>
											{checkOutDate.toLocaleDateString('en-US', {
												weekday: 'short',
												month: 'short',
												day: 'numeric',
												year: 'numeric',
											})}
										</p>
										<p className='text-sm'>to 11:00 WIB</p>
									</div>
								</div>

								{/* Duration */}
								<div className='bg-primary mb-4 py-2 rounded-full text-primary-foreground text-center'>
									{duration} {duration === 1 ? 'Day' : 'Days'}
								</div>

								<p className='mb-2'>You Selected</p>
								<Separator className='my-2' />

								{/* Selected Tents for reschedule */}
								{selectedTents.length > 0 ? (
									selectedTents.map((tent) => (
										<div key={tent.id} className='mb-4'>
											<div className='flex justify-between items-center mb-1'>
												<h3 className='font-medium'>{tent.name}</h3>
												<button onClick={() => onRemove(tent.id)}>
													<Trash2 className='w-5 h-5' />
												</button>
											</div>
											<div className='grid grid-cols-2 text-sm'>
												<p className=''>Category</p>
												<p className='text-right'>
													{tentCategoryFromApi[tent.id] ||
														tent.category?.name ||
														'Standard'}
												</p>
												<p className=''>Max. Capacity</p>
												<p className='text-right'>
													{tentCapacityFromApi[tent.id] || tent.capacity || 4}{' '}
													guests
												</p>
												<p className=''>Price</p>
												<p className='font-medium text-right'>
													{loadingPerTent[tent.id]
														? 'Loading...'
														: `IDR ${(
																tentsWithPrices[tent.id] ||
																tent.price ||
																0
														  ).toLocaleString()}`}
												</p>
											</div>
										</div>
									))
								) : (
									<p className='text-muted-foreground text-sm text-center'>
										No tents selected yet
									</p>
								)}
							</CardContent>
						</Card>
					)}

					{/* Price Summary */}
					{selectedTents.length > 0 && (
						<Card className='mb-4'>
							<CardHeader className='pb-2'>
								<h3 className='font-bold text-lg'>Price Summary</h3>
							</CardHeader>
							<CardContent>
								<div className='gap-2 grid grid-cols-2 mb-4 text-sm'>
									<p className=''>Prices</p>
									<p className='font-medium text-right'>
										{loading
											? 'Calculating...'
											: `IDR ${displayTotalPrice.toLocaleString()}`}
									</p>
								</div>

								<Separator className='my-2' />

								<div className='flex justify-between items-center mt-2'>
									<p className='font-medium'>Total Price</p>
									<p className='font-bold text-lg'>
										{loading
											? 'Calculating...'
											: `IDR ${displayTotalPrice.toLocaleString()}`}
									</p>
								</div>
							</CardContent>
						</Card>
					)}

					{/* Note */}
					<div className='flex items-start mb-4 text-sm'>
						<div className='mt-1 mr-2'>
							<HelpCircle className='w-4 h-4' />
						</div>
						<p>
							You must select tents based on the number of tents you previously
							booked.
						</p>
					</div>
				</CardContent>

				{/* Request Book Button */}
				{onRequestBook && (
					<CardFooter className='flex gap-2 mt-2 p-0'>
						<Button
							className='w-full'
							onClick={onRequestBook}
							disabled={isButtonDisabled || loading}
						>
							{isReschedule
								? selectedTents.length === requiredTentCount
									? 'Reschedule Now'
									: `Select ${requiredTentCount || 0} tent${
											requiredTentCount !== 1 ? 's' : ''
									  } to continue`
								: 'Book Now'}
						</Button>
					</CardFooter>
				)}
			</Card>
		</div>
	);
}
