'use client';

import { Building, CreditCard, QrCode, Wallet } from 'lucide-react';
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
import BankTransferModal from '@/components/pages/reservation/payment/bank-transfer-modal';
import CreditCardModal from '@/components/pages/reservation/payment/credit-card-modal';
import EWalletModal from '@/components/pages/reservation/payment/ewallet-modal';
import { PersonalInfoCard } from '@/components/pages/reservation/payment/personal-info-card';
import QRISModal from '@/components/pages/reservation/payment/qris-modal';
import { ReservationStepper } from '@/components/pages/reservation/reservation-stepper';
import { ReservationSummary } from '@/components/pages/reservation/reservation-summary';
import { Label } from '@/components/ui/label';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { usePayment } from '@/hooks/payments/use-payments';
import { useHydration } from '@/hooks/use-hydration';
import { useReservationStore } from '@/store/useReservationStore';

export default function PaymentPage() {
	const router = useRouter();
	const { createPayment, startPolling, stopPolling } = usePayment();
	const [loading, setLoading] = useState(true);
	const [selectedMethod, setSelectedMethod] = useState('qris');
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

	const paymentMethods = [
		{ id: 'qris', name: 'QRIS', icon: <QrCode className='w-5 h-5' /> },
		{
			id: 'e-wallet',
			name: 'E-Wallet',
			icon: <Wallet className='w-5 h-5' />,
		},
		{
			id: 'bank',
			name: 'Bank Transfer',
			icon: <Building className='w-5 h-5' />,
		},
		{
			id: 'credit-card',
			name: 'Credit Card',
			icon: <CreditCard className='w-5 h-5' />,
		},
	];

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
					// Reuse existing payment details
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

			const response = await createPayment(bookingId, {
				payment_method: selectedMethod,
			});

			// Store payment data in the store
			setPaymentData(response.data);
			setIsModalOpen(true);

			// Start polling for payment status
			startPollingForPayment(bookingId);
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

		switch (selectedMethod) {
			case 'qris':
				return <QRISModal {...props} />;
			case 'bank':
				return <BankTransferModal {...props} />;
			case 'e-wallet':
				return <EWalletModal {...props} />;
			case 'credit-card':
				return <CreditCardModal {...props} />;
			default:
				return null;
		}
	};

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='border-b-4 border-blue-500 rounded-full w-16 h-16 animate-spin'></div>
			</div>
		);
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
					<ReservationStepper currentStep={3} />
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
									<RadioGroup
										value={selectedMethod || ''}
										onValueChange={setSelectedMethod}
										className='space-y-1'
									>
										{paymentMethods.map((method) => (
											<div
												key={method.id}
												className={`flex items-center space-x-2 rounded-lg border p-4 transition-colors ${
													selectedMethod === method.id
														? 'border-primary'
														: 'hover:bg-muted/50'
												}`}
											>
												<RadioGroupItem
													value={method.id}
													id={method.id}
													className='sr-only'
												/>
												<Label
													htmlFor={method.id}
													className='flex flex-1 justify-between items-center cursor-pointer'
												>
													<div className='flex items-center space-x-3'>
														{method.icon}
														<span>{method.name}</span>
													</div>
													{selectedMethod === method.id ? (
														<div className='flex justify-center items-center border-2 border-primary rounded-full w-6 h-6'>
															<div className='bg-primary rounded-full w-3 h-3'></div>
														</div>
													) : (
														<div className='border-2 border-gray-300 rounded-full w-6 h-6'></div>
													)}
												</Label>
											</div>
										))}
									</RadioGroup>
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
