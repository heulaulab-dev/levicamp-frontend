'use client';

import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerTrigger,
} from '@/components/ui/drawer';
import { PaymentDetails } from '@/types/payments';
import { useMediaQuery } from '@/hooks/use-media-query';
import { formatCurrency } from '@/lib/format';
import { Separator } from '@/components/ui/separator';
import { ReactNode } from 'react';

interface ReservationDetailModalProps {
	paymentData: PaymentDetails;
	children: ReactNode;
}

export function ReservationDetailModal({
	paymentData,
	children,
}: ReservationDetailModalProps) {
	const isMobile = useMediaQuery('(max-width: 768px)');

	// Extract booking information
	const booking = paymentData?.payment?.booking;
	const totalAmount =
		booking?.total_amount || paymentData?.payment.total_amount || 0;

	// Format dates
	const formatDate = (dateString?: string) => {
		if (!dateString) return '';

		const date = new Date(dateString);
		return date.toLocaleDateString('id-ID', {
			day: 'numeric',
			month: 'long',
			year: 'numeric',
		});
	};

	// Calculate days of stay
	const calculateDaysOfStay = () => {
		if (!booking?.start_date || !booking?.end_date) return 0;

		const startDate = new Date(booking.start_date);
		const endDate = new Date(booking.end_date);

		const diffTime = endDate.getTime() - startDate.getTime();
		const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));

		return diffDays;
	};

	const daysOfStay = calculateDaysOfStay();

	// Detail sections renderer
	const renderDetailContent = () => (
		<>
			<div className='space-y-6'>
				{/* Booking Information Section */}
				<div>
					<div className='space-y-2 text-sm'>
						<div className='flex justify-between'>
							<span className='text-gray-500'>Booking Code</span>
							<span className='font-medium'>{paymentData.order_id}</span>
						</div>

						<div className='flex justify-between'>
							<span className='text-gray-500'>Payment Method:</span>
							<span className='font-medium uppercase'>
								{paymentData.payment.payment_method}
							</span>
						</div>

						<div className='flex justify-between'>
							<span className='text-gray-500'>Payment Status:</span>
							<span className='font-medium capitalize'>
								{paymentData.payment.transaction_status}
							</span>
						</div>
					</div>
				</div>

				<Separator />

				{/* Stay Information Section */}
				<div>
					<h3 className='mb-2 font-semibold text-gray-800 text-lg'>
						Informasi Menginap
					</h3>
					<div className='space-y-2 text-sm'>
						<div className='flex justify-between'>
							<span className='text-gray-500'>Check-in:</span>
							<span className='font-medium'>
								{formatDate(booking?.start_date)}
							</span>
						</div>

						<div className='flex justify-between'>
							<span className='text-gray-500'>Check-out:</span>
							<span className='font-medium'>
								{formatDate(booking?.end_date)}
							</span>
						</div>

						<div className='flex justify-between'>
							<span className='text-gray-500'>Duration:</span>
							<span className='font-medium'>
								{daysOfStay} {daysOfStay > 1 ? 'Nights' : 'Night'}
							</span>
						</div>
					</div>
				</div>

				<Separator />

				{/* Payment Information */}
				<div>
					<h3 className='mb-2 font-semibold text-gray-800 text-lg'>
						Rincian Pembayaran
					</h3>
					<div className='space-y-2 text-sm'>
						<div className='flex justify-between font-medium'>
							<span className='text-gray-800'>Total Pembayaran:</span>
							<span className='text-primary text-lg'>
								{formatCurrency(totalAmount)}
							</span>
						</div>
					</div>
				</div>
			</div>
		</>
	);

	if (isMobile) {
		return (
			<Drawer>
				<DrawerTrigger asChild>{children}</DrawerTrigger>
				<DrawerContent className='p-6'>
					<DrawerHeader className='px-0'>
						<DrawerTitle>Detail Reservasi</DrawerTitle>
					</DrawerHeader>
					{renderDetailContent()}
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog>
			<DialogTrigger asChild>{children}</DialogTrigger>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<DialogTitle>Detail Reservasi</DialogTitle>
				</DialogHeader>
				{renderDetailContent()}
			</DialogContent>
		</Dialog>
	);
}
