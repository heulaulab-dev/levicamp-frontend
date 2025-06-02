import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogDescription,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { PaymentModalProps } from '@/types/payments';
import { Clock, Copy } from 'lucide-react';
import { toast } from 'sonner';
import { useMediaQuery } from '@/hooks/use-media-query';
import {
	Drawer,
	DrawerContent,
	DrawerHeader,
	DrawerTitle,
	DrawerDescription,
} from '@/components/ui/drawer';

export default function QRISModal({
	isOpen,
	onClose,
	paymentDetails,
}: PaymentModalProps) {
	const [timeLeft, setTimeLeft] = useState<string>('');
	const isMobile = useMediaQuery('(max-width: 768px)');
	// Format currency to IDR
	const formatCurrency = (amount: number) => {
		return new Intl.NumberFormat('id-ID', {
			style: 'currency',
			currency: 'IDR',
			minimumFractionDigits: 0,
		}).format(amount);
	};

	// Format date to readable format
	const formatDate = (dateString: string) => {
		const date = new Date(dateString);
		return date.toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric',
		});
	};

	// Copy order ID to clipboard
	const copyOrderId = () => {
		navigator.clipboard.writeText(paymentDetails?.order_id || '');
		toast.success('Copied to clipboard');
	};

	// Calculate time left until expiration
	useEffect(() => {
		if (!paymentDetails?.expired_at) return;

		const calculateTimeLeft = () => {
			const expiryTime = new Date(paymentDetails?.expired_at || '').getTime();
			const now = new Date().getTime();
			const difference = expiryTime - now;

			if (difference <= 0) {
				setTimeLeft('Expired');
				return;
			}

			const hours = Math.floor(difference / (1000 * 60 * 60));
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			setTimeLeft(
				`${hours.toString().padStart(2, '0')}:${minutes
					.toString()
					.padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`,
			);
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(timer);
	}, [paymentDetails?.expired_at]);

	// Get QR image URL from payment details
	const getQRImageUrl = () => {
		// Try to get QR code from payment_detail first (QRIS specific)
		const qrDetail = paymentDetails?.payment_detail?.find(
			(detail) => detail.type === 'qr',
		);

		if (qrDetail && 'url' in qrDetail) {
			return qrDetail.url;
		}

		// Fallback to payment_reference if available
		if (paymentDetails?.payment?.payment_reference) {
			return paymentDetails.payment.payment_reference;
		}

		// Final fallback
		return '/placeholder.svg';
	};

	if (isMobile) {
		return (
			<Drawer open={isOpen} onOpenChange={onClose}>
				<DrawerContent className='p-4'>
					<DrawerHeader>
						<div className='flex justify-center items-center'>
							<DrawerTitle>QR Payment</DrawerTitle>
						</div>
						<DrawerDescription>
							Scan the QR code below to complete your payment
						</DrawerDescription>
					</DrawerHeader>
					<div className='flex flex-col items-center space-y-4'>
						{/* QR Code */}
						<Card className='w-full'>
							<CardContent className='flex flex-col items-center p-6'>
								<div className='relative mb-4 w-64 h-64'>
									<Image
										src={getQRImageUrl()}
										alt='QR Code'
										fill
										className='object-contain'
									/>
								</div>

								{/* Expiration Timer */}
								<div className='flex justify-center items-center space-x-2 font-medium text-destructive'>
									<Clock className='w-4 h-4' />
									<span>Expires in: {timeLeft}</span>
								</div>
							</CardContent>
						</Card>

						{/* Payment Details */}
						<Card className='w-full'>
							<CardContent className='p-6'>
								<div className='space-y-4'>
									<div className='flex justify-between'>
										<span className='text-muted-foreground'>Booking Code</span>
										<div className='flex items-center space-x-1'>
											<span className='font-medium'>
												{paymentDetails?.order_id}
											</span>
											<Button
												variant='ghost'
												size='icon'
												className='w-6 h-6'
												onClick={copyOrderId}
											>
												<Copy className='w-3 h-3' />
											</Button>
										</div>
									</div>

									<div className='flex justify-between'>
										<span className='text-muted-foreground'>
											Payment Method
										</span>
										<span className='font-medium uppercase'>
											{paymentDetails?.payment.payment_method}
										</span>
									</div>

									<Separator />

									<div className='flex justify-between'>
										<span className='text-muted-foreground'>Check-in</span>
										<span className='font-medium'>
											{formatDate(
												paymentDetails?.payment.booking?.start_date || '',
											)}
										</span>
									</div>

									<div className='flex justify-between'>
										<span className='text-muted-foreground'>Check-out</span>
										<span className='font-medium'>
											{formatDate(
												paymentDetails?.payment.booking?.end_date || '',
											)}
										</span>
									</div>

									<Separator />

									<div className='flex justify-between'>
										<span className='text-muted-foreground'>Total Amount</span>
										<span className='font-bold text-lg'>
											{formatCurrency(
												paymentDetails?.payment.booking?.total_amount ||
													paymentDetails?.payment.total_amount ||
													0,
											)}
										</span>
									</div>
								</div>
							</CardContent>
						</Card>

						<div className='text-muted-foreground text-sm text-center'>
							Please do not close this page until your payment is complete
						</div>
					</div>
				</DrawerContent>
			</Drawer>
		);
	}

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<div className='flex justify-between items-center'>
						<DialogTitle>QR Payment</DialogTitle>
					</div>
					<DialogDescription>
						Scan the QR code below to complete your payment
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col items-center space-y-4'>
					{/* QR Code */}
					<Card className='w-full'>
						<CardContent className='flex flex-col items-center p-6'>
							<div className='relative mb-4 rounded-lg w-64 h-64'>
								<Image
									src={getQRImageUrl()}
									alt='QR Code'
									fill
									className='rounded-lg object-contain'
								/>
							</div>

							{/* Expiration Timer */}
							<div className='flex justify-center items-center space-x-2 font-medium text-destructive'>
								<Clock className='w-4 h-4' />
								<span>Expires in: {timeLeft}</span>
							</div>
						</CardContent>
					</Card>

					{/* Payment Details */}
					<Card className='w-full'>
						<CardContent className='p-6'>
							<div className='space-y-4'>
								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Booking Code</span>
									<div className='flex items-center space-x-1'>
										<span className='font-medium'>
											{paymentDetails?.order_id}
										</span>
										<Button
											variant='ghost'
											size='icon'
											className='w-6 h-6'
											onClick={copyOrderId}
										>
											<Copy className='w-3 h-3' />
										</Button>
									</div>
								</div>

								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Payment Method</span>
									<span className='font-medium uppercase'>
										{paymentDetails?.payment.payment_method}
									</span>
								</div>

								<Separator />

								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Check-in</span>
									<span className='font-medium'>
										{formatDate(
											paymentDetails?.payment.booking?.start_date || '',
										)}
									</span>
								</div>

								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Check-out</span>
									<span className='font-medium'>
										{formatDate(
											paymentDetails?.payment.booking?.end_date || '',
										)}
									</span>
								</div>

								<Separator />

								<div className='flex justify-between'>
									<span className='text-muted-foreground'>Total Amount</span>
									<span className='font-bold text-lg'>
										{formatCurrency(
											paymentDetails?.payment.booking?.total_amount ||
												paymentDetails?.payment.total_amount ||
												0,
										)}
									</span>
								</div>
							</div>
						</CardContent>
					</Card>

					<div className='text-muted-foreground text-sm text-center'>
						Please do not close this page until your payment is complete
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
