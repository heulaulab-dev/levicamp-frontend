'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { ClipboardCheck, ClipboardCopy } from 'lucide-react';
import { formatCurrency } from '@/lib/format';
import {
	Accordion,
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from '@/components/ui/accordion';
import { cn } from '@/lib/utils';
import { manualTransferInstructions } from '@/constants/reservation/payment/manual-transfer-data';
import { PaymentDetails } from '@/types/payments';
import { useRouter } from 'next/navigation';

interface ManualTransferModalProps {
	paymentData: PaymentDetails | null;
}

export function ManualTransferModal({ paymentData }: ManualTransferModalProps) {
	const [copied, setCopied] = useState(false);
	const router = useRouter();

	const {
		bankName,
		accountNumber,
		accountName,
		importantNotes,
		confirmationNotes,
		paymentSteps,
	} = manualTransferInstructions;

	// Handle case where paymentData might be null
	if (!paymentData) {
		return (
			<Card className='w-full'>
				<CardContent className='p-6 text-center'>
					<h2 className='mb-4 font-bold text-gray-800 text-2xl'>
						Payment Information Not Available
					</h2>
					<p className='mb-6 text-gray-600'>
						We couldn&apos;t load the payment details. Please try again or
						return to the payment page.
					</p>
					<Button onClick={() => router.push('/reservation/payment')}>
						Return to Payment Page
					</Button>
				</CardContent>
			</Card>
		);
	}

	const totalAmount = paymentData.payment.total_amount;
	const orderId = paymentData.order_id;
	const expiredAt = new Date(paymentData.expired_at);

	const copyToClipboard = (text: string) => {
		navigator.clipboard.writeText(text);
		setCopied(true);
		setTimeout(() => setCopied(false), 2000);
	};

	const handleCheckPayment = () => {
		router.push(`/reservation/payment/status/${orderId}`);
	};

	return (
		<Card className='w-full'>
			<CardContent className='p-0'>
				<div className='p-6 md:p-8'>
					<h2 className='mb-6 font-bold text-2xl'>
						Transfer Manual ke {bankName}
					</h2>

					{/* Bank account details */}
					<div className='mb-6'>
						<div className='bg-yellow-50 mb-4 p-4 border border-yellow-100 rounded-lg'>
							<p className='mb-4 font-medium text-yellow-800 text-sm'>
								Harap transfer ke rekening berikut:
							</p>

							<div className='space-y-3'>
								<div>
									<p className='text-gray-500 text-sm'>Bank</p>
									<div className='flex justify-between'>
										<p className='font-semibold'>{bankName}</p>
									</div>
								</div>

								<div>
									<p className='text-gray-500 text-sm'>Nomor Rekening</p>
									<div className='flex justify-between'>
										<p className='font-semibold'>{accountNumber}</p>
										<button
											onClick={() => copyToClipboard(accountNumber)}
											className='text-gray-500 hover:text-gray-700'
										>
											{copied ? (
												<ClipboardCheck size={18} />
											) : (
												<ClipboardCopy size={18} />
											)}
										</button>
									</div>
								</div>

								<div>
									<p className='text-gray-500 text-sm'>Atas Nama</p>
									<p className='font-semibold'>{accountName}</p>
								</div>
							</div>
						</div>
					</div>

					{/* Amount and deadline */}
					<div className='mb-6'>
						<div className='flex justify-between items-center mb-1'>
							<p className='text-gray-600'>Total Tagihan</p>
						</div>
						<p className='font-bold text-gray-800 text-2xl'>
							{formatCurrency(totalAmount)}
						</p>

						<div className='mt-2'>
							<p className='text-red-600 text-sm'>
								Harap selesaikan pembayaran sebelum{' '}
								{expiredAt.toLocaleTimeString('id-ID', {
									hour: '2-digit',
									minute: '2-digit',
									day: 'numeric',
									month: 'long',
									year: 'numeric',
								})}
							</p>
						</div>
					</div>

					{/* Important notes */}
					<div className='mb-6'>
						<h3 className='mb-2 font-semibold text-gray-800'>
							Catatan Penting:
						</h3>
						<div className='space-y-2'>
							{importantNotes.map((note, index) => (
								<div key={index} className='flex gap-2'>
									<span className='text-gray-500'>•</span>
									<p className='text-gray-700'>{note}</p>
								</div>
							))}
						</div>
					</div>

					{/* Confirmation notes */}
					<div className='mb-6'>
						<h3 className='mb-2 font-semibold text-gray-800'>
							Konfirmasi Reservasi Anda:
						</h3>
						<p className='mb-2 text-gray-700'>
							Reservasi Anda akan dianggap sah jika:
						</p>
						<div className='space-y-2'>
							{confirmationNotes.map((note, index) => (
								<div key={index} className='flex gap-2'>
									<span className='text-gray-500'>•</span>
									<p className='text-gray-700'>{note}</p>
								</div>
							))}
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
							{paymentSteps.map((instruction, index) => (
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
