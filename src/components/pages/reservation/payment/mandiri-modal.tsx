'use client';

import { Copy, CheckCircle } from 'lucide-react';
import { useState } from 'react';
import { formatCurrency } from '@/lib/format';
import { PaymentCountdown } from '@/components/pages/reservation/payment/payment-countdown';
import { PaymentInstructions } from '@/components/pages/reservation/payment/payment-intructions';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { PaymentDetails } from '@/types/payments';

interface PaymentStatusCardProps {
	paymentData: PaymentDetails;
}

export function MandiriPaymentModal({ paymentData }: PaymentStatusCardProps) {
	const [copied, setCopied] = useState(false);

	// Find the VA payment detail
	const vaPaymentDetail = paymentData.payment_detail.find(
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

	const copyToClipboard = () => {
		navigator.clipboard.writeText(vaNumber);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
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

	return (
		<div className='bg-white shadow-md hover:shadow-lg rounded-lg w-full overflow-hidden transition-all duration-300'>
			{/* Header with countdown */}
			<div className='p-6 md:p-8 border-b'>
				<div className='flex justify-between items-center'>
					<div className='flex items-center gap-4'>
						<div className='flex justify-center items-center bg-amber-400 rounded-full w-12 h-12 font-bold text-white text-2xl'>
							L
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
				<div className='mb-6'>
					<div className='flex justify-between items-center mb-1'>
						<p className='text-gray-600'>Nomor Virtual Account</p>
						<div className='relative w-16 h-8'>
							<Image
								src='/assets/banks/mandiri.svg'
								alt='Mandiri Logo'
								fill
								style={{ objectFit: 'contain' }}
								unoptimized
							/>
						</div>
					</div>
					<div className='flex justify-between items-center'>
						<span className='font-bold text-gray-800 text-2xl'>{vaNumber}</span>
						<button
							onClick={copyToClipboard}
							className='focus:outline-none text-yellow-600 hover:text-yellow-700 transition-colors'
							aria-label='Copy virtual account number'
						>
							{copied ? (
								<CheckCircle className='w-6 h-6' />
							) : (
								<Copy className='w-6 h-6' />
							)}
						</button>
					</div>
				</div>

				<div className='mb-8'>
					<div className='flex justify-between items-center mb-1'>
						<p className='text-gray-600'>Total Tagihan</p>
						<a
							href='#'
							className='font-medium text-yellow-600 hover:text-yellow-700 text-sm transition-colors'
						>
							Lihat Detail
						</a>
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
							<span className='font-semibold'>Bank Mandiri</span>
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
				<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
					<Button
						variant='outline'
						className='hover:bg-yellow-50 border-yellow-600 rounded-full text-yellow-600 hover:text-yellow-700 transition-all'
					>
						Lihat Cara Bayar
					</Button>
					<Button className='bg-yellow-600 hover:bg-yellow-700 rounded-full text-white transition-all'>
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
					<PaymentInstructions bankName='Mandiri' vaNumber={vaNumber} />
				</div>
			</div>
		</div>
	);
}
