'use client';

import { Copy, Clock3, Check, AlertTriangle } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/format';
import { PaymentCountdown } from '@/components/pages/reservation/payment/payment-countdown';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PaymentDetails } from '@/types/payments';
import {
	bankPaymentInstructions,
	virtualAccountBanks,
	PaymentStep,
} from '@/constants/reservation/payment/virtual-account-data';
import { cn } from '@/lib/utils';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import Link from 'next/link';
import { Card, CardContent } from '@/components/ui/card';
import { toast } from 'sonner';
import { formatExpiryDate } from '@/lib/format';
import { ReservationDetailModal } from './reservation-detail-modal';
import { usePayment } from '@/hooks/payments/use-payments';
import { useEffect } from 'react';

interface VirtualAccountModalProps {
	paymentData: PaymentDetails;
}

export function VirtualAccountModal({ paymentData }: VirtualAccountModalProps) {
	const [copied, setCopied] = useState(false);
	const [isExpired, setIsExpired] = useState(false);
	const { checkPaymentStatus } = usePayment();

	// Find the VA payment detail
	const vaPaymentDetail = paymentData.payment_detail?.find(
		(detail) => detail.type === 'va',
	);

	// Access va_number only if it exists in the payment detail
	const vaNumber =
		vaPaymentDetail && 'va_number' in vaPaymentDetail
			? vaPaymentDetail.va_number
			: paymentData.payment.payment_reference || '';

	const totalAmount =
		paymentData.payment.booking?.total_amount ||
		paymentData.payment.total_amount ||
		0;

	const expiryDate = paymentData.expired_at;

	useEffect(() => {
		const interval = setInterval(() => {
			const now = new Date();
			const expired = new Date(expiryDate);
			if (now > expired) {
				setIsExpired(true);
				clearInterval(interval);
			}
		}, 1000); // cek setiap 1 detik

		return () => clearInterval(interval);
	}, [expiryDate]);

	// Determine bank from payment details
	let bankId = 'default';
	if (vaPaymentDetail && 'bank' in vaPaymentDetail) {
		const bankName = vaPaymentDetail.bank.toLowerCase();

		if (bankName.includes('bca')) bankId = 'bca';
		else if (bankName.includes('bni')) bankId = 'bni';
		else if (bankName.includes('mandiri')) bankId = 'mandiri';
		else if (bankName.includes('bri')) bankId = 'bri';
	}

	const bankInfo = virtualAccountBanks[bankId] || {
		id: 'default',
		name: 'Bank',
		code: '',
		logoSrc: '/assets/banks/default.svg',
		primaryColor: 'text-gray-600',
		secondaryColor: 'border-gray-600',
	};

	const instructions =
		bankPaymentInstructions[bankId] || bankPaymentInstructions.default;

	const copyToClipboard = () => {
		navigator.clipboard.writeText(vaNumber);
		setCopied(true);
		toast.success('Virtual account number copied to clipboard.'); // 2000);
		setTimeout(() => setCopied(false), 2000);
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
		<Card className='bg-background shadow-md hover:shadow-lg rounded-lg w-full overflow-hidden transition-all duration-300'>
			<CardContent>
				{/* Header with countdown */}
				<div className='p-6 md:p-8 border-b'>
					<div className='flex justify-between items-center'>
						{isExpired ? (
							<div className='flex flex-col w-full'>
								<div className='flex items-center gap-4 mb-4'>
									<div className='flex justify-center items-center bg-red-100 rounded-full size-12 text-red-600 text-2xl animate-pulse'>
										<AlertTriangle size={24} />
									</div>
									<div>
										<h2 className='font-semibold text-gray-800 text-2xl'>
											Batas waktu pembayaran telah berakhir
										</h2>
										<p className='text-gray-500'>
											{formatExpiryDate(expiryDate)}
										</p>
									</div>
								</div>
								<div className='bg-red-50 mb-4 p-4 border border-red-100 rounded-lg'>
									<p className='mb-2 text-red-700'>
										Maaf, batas waktu pembayaran Anda telah berakhir. Pesanan
										Anda telah dibatalkan.
									</p>
									<p className='text-gray-600 text-sm'>
										Silakan mulai pesanan baru atau hubungi layanan pelanggan
										kami jika Anda memerlukan bantuan.
									</p>
								</div>
								<div className='flex justify-end'>
									<Button asChild>
										<Link href='/reservation'>Mulai Pesanan Baru</Link>
									</Button>
								</div>
							</div>
						) : (
							<>
								<div className='flex items-center gap-4'>
									<div className='flex justify-center items-center bg-primary rounded-full size-12 font-bold text-primary-foreground text-2xl'>
										<Clock3 />
									</div>
									<div>
										<h2 className='font-semibold text-gray-800 text-2xl'>
											Bayar sebelum
										</h2>
										<p className='text-gray-500'>
											{formatExpiryDate(expiryDate)}
										</p>
									</div>
								</div>
								<PaymentCountdown expiryDate={expiryDate} />
							</>
						)}
					</div>
				</div>

				{/* Payment details */}
				<div className='p-6 md:p-8'>
					<div className='mb-6'>
						<div className='flex justify-between items-center mb-1'>
							<p className='text-gray-600'>Nomor Virtual Account</p>
							<div className='relative w-16 h-8'>
								{bankInfo.logoSrc && (
									<Image
										src={bankInfo.logoSrc}
										alt={`${bankInfo.name} Logo`}
										fill
										style={{ objectFit: 'contain' }}
										loading='lazy'
									/>
								)}
							</div>
						</div>
						<div className='flex justify-between items-center'>
							<span className='font-bold text-gray-800 text-2xl'>
								{vaNumber}
							</span>
							<button
								onClick={copyToClipboard}
								className={cn(
									'focus:outline-none hover:text-opacity-80 transition-colors text-primary',
								)}
								aria-label='Copy virtual account number'
							>
								{copied ? (
									<Check className='size-5' />
								) : (
									<Copy className='size-5' />
								)}
							</button>
						</div>
					</div>

					<div className='mb-8'>
						<div className='flex justify-between items-center mb-1'>
							<p className='text-gray-600'>Total Tagihan</p>
							<ReservationDetailModal paymentData={paymentData}>
								<Link
									href='#'
									className={cn(
										'font-medium hover:text-opacity-80 text-sm transition-colors',
										'text-primary',
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
						<div className='flex gap-2'>
							<span className='text-gray-500'>•</span>
							<p className='text-gray-700'>
								<span className='font-semibold'>Penting:</span> Transfer Virtual
								Account hanya bisa dilakukan dari{' '}
								<span className='font-semibold'>{bankInfo.name}</span>
							</p>
						</div>
						<div className='flex gap-2'>
							<span className='text-gray-500'>•</span>
							<p className='text-gray-700'>
								Transaksi kamu baru akan diproses setelah pembayaran berhasil
								diverifikasi.
							</p>
						</div>
					</div>

					{/* Action buttons */}
					<div className='w-full'>
						<Button onClick={handleCheckPayment} className='w-full'>
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
							{instructions.map((instruction: PaymentStep, index: number) => (
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
