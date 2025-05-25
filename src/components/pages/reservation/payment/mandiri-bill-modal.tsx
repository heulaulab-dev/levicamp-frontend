'use client';

import { Copy, Check, Clock3 } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/format';
import { PaymentCountdown } from '@/components/pages/reservation/payment/payment-countdown';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import Image from 'next/image';
import { PaymentDetails } from '@/types/payments';
import {
	mandiriBillInstructions,
	mandiriBillInfo,
} from '@/constants/reservation/payment/mandiri-bill-data';
import { cn } from '@/lib/utils';
import { ReservationDetailModal } from '@/components/pages/reservation/payment/reservation-detail-modal';
import Link from 'next/link';
import { usePayment } from '@/hooks/payments/use-payments';
import { toast } from 'sonner';

interface MandiriBillPaymentModalProps {
	paymentData: PaymentDetails;
}

export function MandiriBillPaymentModal({
	paymentData,
}: MandiriBillPaymentModalProps) {
	const [copiedField, setCopiedField] = useState<string | null>(null);
	const { checkPaymentStatus } = usePayment();

	// Early return if payment_detail is missing
	if (!paymentData.payment_detail) {
		return (
			<Card className='bg-white shadow-md rounded-lg w-full overflow-hidden'>
				<CardContent className='p-8 text-center'>
					<h2 className='mb-4 font-bold text-gray-800 text-2xl'>
						Payment Information Loading...
					</h2>
					<p className='text-gray-600'>
						Please wait while we prepare your payment details.
					</p>
				</CardContent>
			</Card>
		);
	}

	// Find the Mandiri Bill payment detail
	const mandiriBillDetail = paymentData.payment_detail?.find(
		(detail) => detail.type === 'mandiri_bill',
	);

	// Extract Mandiri Bill details
	const companyCode =
		mandiriBillDetail && 'biller_code' in mandiriBillDetail
			? mandiriBillDetail.biller_code
			: '';
	const billKey =
		mandiriBillDetail && 'bill_key' in mandiriBillDetail
			? mandiriBillDetail.bill_key
			: '';

	// If no Mandiri Bill detail found, show error
	if (!mandiriBillDetail) {
		return (
			<Card className='bg-white shadow-md rounded-lg w-full overflow-hidden'>
				<CardContent className='p-8 text-center'>
					<h2 className='mb-4 font-bold text-gray-800 text-2xl'>
						Payment Method Not Supported
					</h2>
					<p className='mb-6 text-gray-600'>
						This payment method is not available or the payment details are
						incomplete.
					</p>
					<Button
						onClick={() => (window.location.href = '/reservation/payment')}
						className='bg-blue-600 hover:bg-blue-700 text-white'
					>
						Return to Payment Page
					</Button>
				</CardContent>
			</Card>
		);
	}

	const totalAmount =
		paymentData.payment.booking?.total_amount ||
		paymentData.payment.total_amount ||
		0;
	const expiryDate = paymentData.expired_at;

	const copyToClipboard = (text: string, field: string) => {
		navigator.clipboard.writeText(text);
		setCopiedField(field);
		toast.success(
			`${
				field === 'company_code' ? 'Company code' : 'Bill key'
			} copied to clipboard.`,
		);
		setTimeout(() => setCopiedField(null), 2000);
	};

	// Format expiry date for display
	const formatExpiryDate = (dateString: string) => {
		const date = new Date(dateString);
		const options: Intl.DateTimeFormatOptions = {
			day: '2-digit',
			month: 'short',
			year: 'numeric',
			hour: '2-digit',
			minute: '2-digit',
			timeZone: 'Asia/Jakarta',
		};
		return new Intl.DateTimeFormat('id-ID', options).format(date);
	};

	const handleCheckPayment = async () => {
		if (!paymentData?.payment?.booking_id) {
			toast.error('Booking ID not found');
			return;
		}

		const promise = async () => {
			await new Promise((resolve) => setTimeout(resolve, 500));
			const { transaction_status: status } = await checkPaymentStatus(
				paymentData.payment.booking_id,
			);
			return { status };
		};

		toast.promise(promise, {
			loading: 'Checking payment status...',
			success: ({ status }) => `Payment status: ${status.toUpperCase()}`,
			error: 'Failed to check payment status',
		});
	};

	return (
		<Card className='bg-white shadow-md hover:shadow-lg rounded-lg w-full overflow-hidden transition-all duration-300'>
			<CardContent className='p-0'>
				{/* Header with countdown */}
				<div className='p-6 md:p-8 border-b'>
					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-4'>
							<div className='flex justify-center items-center bg-primary rounded-full size-12 font-bold text-primary-foreground text-2xl'>
								<Clock3 />
							</div>
							<div>
								<h2 className='font-semibold text-gray-800 text-2xl'>
									Bayar sebelum
								</h2>
								<p className='text-gray-500'>{formatExpiryDate(expiryDate)}</p>
							</div>
						</div>
						<PaymentCountdown expiryDate={expiryDate} />
					</div>
				</div>

				{/* Payment details */}
				<div className='p-6 md:p-8'>
					{/* Company Code */}
					<div className='mb-6'>
						<div className='flex justify-between items-center mb-1'>
							<p className='text-gray-600'>Kode Perusahaan</p>
							<div className='relative w-16 h-8'>
								<Image
									src={mandiriBillInfo.logo}
									alt='Mandiri Logo'
									fill
									style={{ objectFit: 'contain' }}
									unoptimized
								/>
							</div>
						</div>
						<div className='flex justify-between items-center'>
							<span className='font-bold text-gray-800 text-2xl'>
								{companyCode}
							</span>
							<button
								onClick={() => copyToClipboard(companyCode, 'company_code')}
								className='focus:outline-none text-blue-600 hover:text-blue-700 transition-colors'
								aria-label='Copy company code'
							>
								{copiedField === 'company_code' ? (
									<Check className='w-6 h-6' />
								) : (
									<Copy className='w-6 h-6' />
								)}
							</button>
						</div>
					</div>

					{/* Bill Key */}
					<div className='mb-6'>
						<div className='flex justify-between items-center mb-1'>
							<p className='text-gray-600'>Kode Pembayaran (Bill Key)</p>
						</div>
						<div className='flex justify-between items-center'>
							<span className='font-bold text-gray-800 text-2xl'>
								{billKey}
							</span>
							<button
								onClick={() => copyToClipboard(billKey, 'bill_key')}
								className='focus:outline-none text-blue-600 hover:text-blue-700 transition-colors'
								aria-label='Copy bill key'
							>
								{copiedField === 'bill_key' ? (
									<Check className='w-6 h-6' />
								) : (
									<Copy className='w-6 h-6' />
								)}
							</button>
						</div>
					</div>

					{/* Total Amount */}
					<div className='mb-8'>
						<div className='flex justify-between items-center mb-1'>
							<p className='text-gray-600'>Total Tagihan</p>
							<ReservationDetailModal paymentData={paymentData}>
								<Link
									href='#'
									className={cn(
										'font-medium hover:text-opacity-80 text-sm transition-colors  text-blue-600 hover:text-blue-700',
									)}
								>
									Lihat Detail
								</Link>
							</ReservationDetailModal>
						</div>
						<p className='font-bold text-gray-800 text-2xl'>
							{formatCurrency(totalAmount)}
						</p>
					</div>

					{/* Important notes */}
					<div className='space-y-3 mb-8'>
						{mandiriBillInfo.notes.map((note, index) => (
							<div key={index} className='flex gap-2'>
								<span className='text-gray-500'>•</span>
								<p className='text-gray-700'>
									{index === 0 && (
										<span className='font-semibold'>Penting:</span>
									)}{' '}
									{note}
								</p>
							</div>
						))}
					</div>

					{/* Action buttons */}
					<div className='w-full'>
						<Button
							onClick={handleCheckPayment}
							className='bg-blue-600 hover:bg-blue-700 w-full text-white'
						>
							Cek Status Bayar
						</Button>
					</div>
				</div>

				{/* Payment instructions */}
				<div className='border-t'>
					<div className='p-6 md:p-8'>
						<h3 className='mb-6 font-semibold text-gray-800 text-xl'>
							Cara pembayaran
						</h3>
						<div className='space-y-4'>
							{mandiriBillInstructions.map((instruction, index) => (
								<Accordion
									key={index}
									type='single'
									collapsible
									className='border rounded-lg w-full'
								>
									<AccordionItem value={`item-${index}`} className='border-0'>
										<AccordionTrigger className={cn('px-4 py-3 font-semibold')}>
											{instruction.title}
										</AccordionTrigger>
										<AccordionContent className='px-4 pt-0 pb-3'>
											<ol className='space-y-2 pl-5 list-decimal'>
												{instruction.steps.map((step, stepIndex) => (
													<li key={stepIndex} className='text-gray-700'>
														{step}
													</li>
												))}
											</ol>
										</AccordionContent>
									</AccordionItem>
								</Accordion>
							))}
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
