'use client';

import Image from 'next/image';

import {
	Card,
	CardContent,
	CardDescription,
	CardHeader,
	CardTitle,
} from '@/components/ui/card';
import { CreateRefundResponse } from '@/types/refunds';

interface RefundDetailCardProps {
	refundDetail: CreateRefundResponse;
}

export default function RefundDetailCard({
	refundDetail,
}: RefundDetailCardProps) {
	const tents = refundDetail.data.booking.detail_booking.map(
		(detailBooking) => detailBooking.reservation.tent,
	);

	return (
		<Card className='my-24 w-full max-w-4xl'>
			<CardHeader>
				<CardTitle>Refund Details</CardTitle>
				<CardDescription>
					A confirmation email has been sent to your registered email address
				</CardDescription>
			</CardHeader>
			<CardContent>
				<div className='space-y-3 w-full'>
					<div className='gap-y-3 grid grid-cols-2'>
						<p className='text-muted-foreground'>Booking Code</p>
						<p className='font-medium text-primary text-right'>
							#{refundDetail.data.booking_id}
						</p>

						<p className='text-muted-foreground'>Refund Amount</p>
						<p className='font-medium text-primary text-right'>
							Rp {refundDetail.data.refund_amount.toLocaleString()}
						</p>

						<p className='text-muted-foreground'>Refund Method</p>
						<p className='font-medium text-primary text-right'>
							{refundDetail.data.refund_method.toUpperCase()}
						</p>

						<p className='text-muted-foreground'>Account Name</p>
						<p className='font-medium text-primary text-right'>
							{refundDetail.data.account_name}
						</p>

						<p className='text-muted-foreground'>Account Number</p>
						<p className='font-medium text-primary text-right'>
							{refundDetail.data.account_number}
						</p>

						<p className='text-muted-foreground'>Refund Reason</p>
						<p className='font-medium text-primary text-right'>
							{refundDetail.data.reason}
						</p>

						<p className='text-muted-foreground'>Refund Status</p>
						<p className='font-medium text-primary text-right'>
							{refundDetail.data.status}
						</p>

						<p className='text-muted-foreground'>Estimated Processing Time</p>
						<p className='font-medium text-primary text-right'>
							3–5 business days
						</p>
					</div>
				</div>

				<section className='mt-10'>
					<h2 className='mb-4 font-medium text-lg'>Reservation Details</h2>

					{tents.map((tent, index) => (
						<div key={tent.id} className={index > 0 ? 'mt-6' : 'mb-6'}>
							<div className='flex gap-4'>
								<div className='relative rounded-md w-28 h-20 overflow-hidden'>
									<Image
										src='/tent-image.jpg'
										alt={tent.name}
										fill
										className='object-cover'
									/>
								</div>
								<div className='flex-1'>
									<h3 className='font-medium text-primary'>{tent.name}</h3>
									<div className='gap-y-2 grid grid-cols-2 mt-1'>
										<div className='text-muted-foreground'>Category</div>
										<div className='text-right'>{tent.category.name}</div>

										<div className='text-muted-foreground'>Max. Capacity</div>
										<div className='text-right'>{tent.capacity} Guests</div>
									</div>
								</div>
							</div>
						</div>
					))}
				</section>
			</CardContent>
		</Card>
	);
}
