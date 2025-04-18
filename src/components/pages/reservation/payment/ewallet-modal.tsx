import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Card, CardContent } from '@/components/ui/card';
import { useState, useEffect } from 'react';
import { PaymentModalProps } from '@/types/payments';
import { Clock, Copy, ExternalLink } from 'lucide-react';
import { toast } from 'sonner';

export default function EWalletModal({
	isOpen,
	onClose,
	paymentDetails,
}: PaymentModalProps) {
	const [timeLeft, setTimeLeft] = useState<string>('');

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

			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			setTimeLeft(
				`${minutes.toString().padStart(2, '0')}:${seconds
					.toString()
					.padStart(2, '0')}`,
			);
		};

		calculateTimeLeft();
		const timer = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(timer);
	}, [paymentDetails?.expired_at]);

	return (
		<Dialog open={isOpen} onOpenChange={onClose}>
			<DialogContent className='sm:max-w-md'>
				<DialogHeader>
					<div className='flex justify-between items-center'>
						<DialogTitle>E-Wallet Payment</DialogTitle>
					</div>
					<DialogDescription>
						Complete payment using your e-wallet
					</DialogDescription>
				</DialogHeader>

				<div className='flex flex-col space-y-4'>
					{/* E-Wallet Payment Link */}
					<Card className='w-full'>
						<CardContent className='p-6'>
							{paymentDetails?.payment_detail?.map((detail, index) => (
								<div key={index} className='mb-4'>
									<h3 className='font-semibold text-lg'>{detail.name}</h3>
									{detail.url && (
										<Button
											className='flex justify-center items-center mt-2 w-full text-white'
											onClick={() => window.open(detail.url, '_blank')}
										>
											<span>Open E-Wallet App</span>
											<ExternalLink className='ml-2 w-4 h-4' />
										</Button>
									)}
								</div>
							))}

							{/* Expiration Timer */}
							<div className='flex justify-center items-center space-x-2 mt-4 font-medium text-destructive'>
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
									<span className='text-muted-foreground'>Order ID</span>
									<div className='flex items-center space-x-1'>
										<span className='font-medium'>
											{paymentDetails?.order_id}
										</span>
										<Button
											variant='ghost'
											size='icon'
											className='w-6 h-6'
											onClick={() => {
												navigator.clipboard.writeText(
													paymentDetails?.order_id || '',
												);
												toast.success('Order ID copied to clipboard');
											}}
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

								{paymentDetails?.payment.booking?.start_date && (
									<>
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
									</>
								)}

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
						You will be redirected to your e-wallet app to complete the payment
					</div>
				</div>
			</DialogContent>
		</Dialog>
	);
}
