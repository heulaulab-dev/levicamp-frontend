'use client';

import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'sonner';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@components/ui/card';

import HeroSection from '@/components/common/hero-section';
import { PersonalInfoCard } from '@/components/pages/reservation/payment/personal-info-card';
import QRISModal from '@/components/pages/reservation/payment/qris-modal';
import { ManualTransferModal } from '@/components/pages/reservation/payment/manual-transfer-modal';
import { ReservationStepper } from '@/components/pages/reservation/reservation-stepper';
import { ReservationSummary } from '@/components/pages/reservation/reservation-summary';
import { usePayment } from '@/hooks/payments/use-payments';
import { useHydration } from '@/hooks/use-hydration';
import { useReservationStore } from '@/store/useReservationStore';
import { PaymentCategory } from '@/components/pages/reservation/payment/payment-category';
import { paymentMethods } from '@/constants/reservation/payment/payment-data';
import LoadingTent from '@/components/common/loading-tent';

export default function PaymentPage() {
	const router = useRouter();
	const { createPayment, startPolling, stopPolling } = usePayment();
	const [loading, setLoading] = useState(true);
	const [selectedMethod, setSelectedMethod] = useState('qris');
	const [selectedCategory, setSelectedCategory] = useState('qris');
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [isProcessing, setIsProcessing] = useState(false);
	const isHydrated = useHydration();

	// Use Zustand store
	const {
		reservationData,
		personalInfo,
		paymentData,
		setPaymentData,
		clearPaymentData,
		bookingResponseData,
	} = useReservationStore();

	useEffect(() => {
		// Only check for redirect after hydration is complete
		if (!isHydrated) return;

		// Redirect if data is missing
		if (!reservationData || !personalInfo || !bookingResponseData) {
			router.push('/reservation');
			return;
		}

		// Check for existing payment data
		if (paymentData) {
			// Check if payment is not expired
			const expiry = new Date(paymentData.expired_at);
			const now = new Date();
			if (expiry <= now) {
				// Remove expired payment data
				clearPaymentData();
			}
		}

		setLoading(false);
	}, [
		router,
		reservationData,
		personalInfo,
		bookingResponseData,
		paymentData,
		clearPaymentData,
		isHydrated,
	]);

	const handlePayNow = async () => {
		try {
			setIsProcessing(true);

			// Check if we already have valid payment details
			if (paymentData) {
				const expiry = new Date(paymentData.expired_at);
				const now = new Date();

				if (expiry > now) {
					// If payment method is VA or manual transfer, redirect to payment detail page
					if (
						selectedMethod.startsWith('va_') ||
						selectedMethod.startsWith('manual_transfer')
					) {
						const bookingId = bookingResponseData?.data.booking.id;
						if (bookingId) {
							router.push(
								`/reservation/payment/detail?bookingId=${bookingId}&method=${selectedMethod}`,
							);
							return;
						}
					}

					// For other methods, show modal
					setIsModalOpen(true);

					// Start polling for payment status
					if (bookingResponseData) {
						const bookingId = bookingResponseData.data.booking.id;
						startPollingForPayment(bookingId);
					}
					return;
				}
			}

			if (!bookingResponseData) {
				toast.error('Reservation data not found');
				return;
			}

			const bookingId = bookingResponseData.data.booking.id;

			// Create a new payment
			try {
				const response = await createPayment(bookingId, {
					payment_method: selectedMethod,
				});

				// Store payment data in the store
				if (response && response.data) {
					setPaymentData(response.data);

					// If payment method is VA or manual transfer, redirect to payment detail page
					if (
						selectedMethod.startsWith('va_') ||
						selectedMethod.startsWith('manual_transfer')
					) {
						router.push(
							`/reservation/payment/detail?bookingId=${bookingId}&method=${selectedMethod}`,
						);
						return;
					}

					// For other methods, show modal
					setIsModalOpen(true);

					// Start polling for payment status
					startPollingForPayment(bookingId);
				} else {
					toast.error('Failed to create payment - no data returned');
				}
			} catch (error) {
				console.error('Payment creation error:', error);
				toast.error(
					error instanceof Error ? error.message : 'Failed to create payment',
				);
			}
		} catch (error) {
			toast.error(
				error instanceof Error ? error.message : 'Failed to process payment',
			);
		} finally {
			setIsProcessing(false);
		}
	};

	const startPollingForPayment = (bookingId: string) => {
		startPolling(bookingId, {
			onSuccess: () => {
				toast.success('Payment successful!');
				router.push(`/reservation/invoice/${bookingId}`);
			},
			onError: (error) => {
				toast.error(error.message);
				setIsModalOpen(false);
			},
			onExpired: () => {
				toast.warning('Payment has expired');
				// Clear expired payment data
				clearPaymentData();
				setIsModalOpen(false);
			},
		});
	};

	const handleCloseModal = () => {
		setIsModalOpen(false);
		stopPolling();
	};

	const renderPaymentModal = () => {
		const props = {
			isOpen: isModalOpen,
			onClose: handleCloseModal,
			paymentDetails: paymentData,
			paymentMethod: selectedMethod,
		};

		// Only render payment modals if we have payment data
		if (!paymentData) return null;

		// Render the appropriate modal based on selected method
		switch (selectedMethod) {
			case 'qris':
				return <QRISModal {...props} />;
			case 'manual_transfer_bca':
				return <ManualTransferModal paymentData={paymentData} />;
			default:
				return null;
		}
	};

	if (loading) {
		return <LoadingTent />;
	}

	if (!personalInfo || !reservationData) return null;

	return (
		<HeroSection
			title="You're almost there, Secure your spot by completing your payment now"
			description='Choose your preferred payment method for completing your reservation.'
		>
			{/* Content Section */}
			<div className='mx-auto my-24 px-4 container'>
				<div className='hidden md:block mb-8'>
					<ReservationStepper currentStep={4} />
				</div>
				<div className='gap-8 grid grid-cols-1 lg:grid-cols-6 pb-12'>
					{/* Personal Information Form */}
					<div className='lg:col-span-4'>
						<PersonalInfoCard />
						{/* Payment Methods Selection */}
						<div className='lg:col-span-4 mt-4'>
							{/* Payment Method Accordion */}
							<Card>
								<CardHeader>
									<CardTitle className='text-primary'>Payment Method</CardTitle>
									<CardDescription>
										Select your preferred payment method to complete your
										reservation.
									</CardDescription>
								</CardHeader>
								<CardContent>
									<div className='bg-card mx-auto p-1 sm:p-4 border border-border rounded-xl w-full'>
										<div className='space-y-2'>
											{paymentMethods.map((category) => (
												<PaymentCategory
													key={category.id}
													category={category}
													isSelected={selectedCategory === category.id}
													selectedMethod={selectedMethod}
													onSelectCategory={() =>
														setSelectedCategory(category.id)
													}
													onSelectMethod={(methodId) =>
														setSelectedMethod(methodId)
													}
												/>
											))}
										</div>
									</div>
								</CardContent>
							</Card>
						</div>
					</div>

					{/* Reservation Summary */}
					<div className='lg:col-span-2'>
						{reservationData && (
							<ReservationSummary
								data={reservationData}
								onContinue={handlePayNow}
								showButtons={true}
								showBackButton={false}
								showContinueButton={true}
								backButtonText='Back'
								continueButtonText='Pay Now'
								isLoading={isProcessing}
							/>
						)}
					</div>
				</div>
			</div>

			{/* Payment Modals */}
			{renderPaymentModal()}
		</HeroSection>
	);
}
