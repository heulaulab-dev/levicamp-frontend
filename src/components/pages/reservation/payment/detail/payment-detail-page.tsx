'use client';

import { useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { VirtualAccountModal } from '@/components/pages/reservation/payment/virtual-account-modal';
import { ManualTransferModal } from '@/components/pages/reservation/payment/manual-transfer-modal';
import { usePayment } from '@/hooks/payments/use-payments';
import { useReservationStore } from '@/store/useReservationStore';
import HeroSection from '@/components/common/hero-section';
import { ReservationStepper } from '@/components/pages/reservation/reservation-stepper';
import LoadingTent from '@/components/common/loading-tent';

export default function PaymentDetailPage() {
	const searchParams = useSearchParams();
	const bookingId = searchParams.get('bookingId');
	const paymentMethod = searchParams.get('method');
	const { startPolling, stopPolling } = usePayment();
	const { paymentData } = useReservationStore();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		// Start polling for payment status
		if (bookingId) {
			startPolling(bookingId, {
				onSuccess: () => {
					// Payment successful, redirect
					window.location.href = `/reservation/invoice/${bookingId}`;
				},
				onError: (error) => {
					console.error('Payment error:', error);
				},
				onExpired: () => {
					// Handle expired payment
					console.warn('Payment expired');
				},
			});
		}

		setLoading(false);

		// Clean up polling when component unmounts
		return () => {
			stopPolling();
		};
	}, [bookingId, startPolling, stopPolling]);

	// Check if this is a Virtual Account payment
	const isVirtualAccountPayment = () => {
		if (!paymentData) return false;

		// Find the VA payment detail
		return paymentData.payment_detail.some((detail) => detail.type === 'va');
	};

	// Check if this is a Manual Transfer payment
	const isManualTransferPayment = () => {
		if (!paymentData) return false;

		// Check if method is manual_transfer_bca or find the manual transfer detail
		return (
			paymentMethod === 'manual_transfer_bca' ||
			paymentData.payment_detail.some(
				(detail) => (detail.type as string) === 'manual_transfer',
			)
		);
	};

	if (loading) {
		return <LoadingTent />;
	}

	// Render the appropriate payment modal based on type
	const renderPaymentModal = () => {
		if (!paymentData) return null;

		if (isVirtualAccountPayment()) {
			return <VirtualAccountModal paymentData={paymentData} />;
		} else if (isManualTransferPayment()) {
			return <ManualTransferModal paymentData={paymentData} />;
		}

		return null;
	};

	return (
		<HeroSection
			title='Complete Your Payment'
			description='Follow the instructions below to complete your payment'
		>
			<div className='mx-auto px-4 py-12 container'>
				<div className='hidden md:block mb-8'>
					<ReservationStepper currentStep={4} />
				</div>

				{/* Show the appropriate payment modal */}
				{paymentData ? (
					renderPaymentModal() || (
						<div className='py-12 text-center'>
							<h2 className='mb-4 font-bold text-gray-800 text-2xl'>
								Payment Information Not Available
							</h2>
							<p className='mb-6 text-gray-600'>
								We couldn&apos;t find the payment details for this transaction
								or the payment method is not supported.
							</p>
							<button
								onClick={() => (window.location.href = '/reservation/payment')}
								className='bg-primary hover:bg-primary/90 px-6 py-2 rounded-md text-white'
							>
								Return to Payment Page
							</button>
						</div>
					)
				) : (
					<div className='py-12 text-center'>
						<h2 className='mb-4 font-bold text-gray-800 text-2xl'>
							Payment Information Not Available
						</h2>
						<p className='mb-6 text-gray-600'>
							We couldn&apos;t find the payment details for this transaction or
							the payment method is not supported.
						</p>
						<button
							onClick={() => (window.location.href = '/reservation/payment')}
							className='bg-primary hover:bg-primary/90 px-6 py-2 rounded-md text-white'
						>
							Return to Payment Page
						</button>
					</div>
				)}
			</div>
		</HeroSection>
	);
}
