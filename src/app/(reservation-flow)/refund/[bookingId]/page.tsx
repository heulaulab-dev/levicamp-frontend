/* eslint-disable @typescript-eslint/no-unused-vars */
'use client';

import { useParams, useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { toast } from 'sonner';

import HeroSection from '@/components/common/hero-section';
import InvoiceDetail from '@/components/pages/refund/invoice-detail';
import RefundForm from '@/components/pages/refund/refund-form';
import SearchBooking from '@/components/pages/refund/search-booking';
import { StatusCard } from '@/components/pages/refund/status-card';
import { useRefund } from '@/hooks/refund/use-refund';
import { useRefundData } from '@/hooks/refund/use-refund-data';
import { CreateRefundRequest } from '@/types/refunds';

export default function RefundPage() {
	const params = useParams();
	const router = useRouter();
	const bookingId = params.bookingId as string;
	const { createRefund, loading } = useRefund();
	const { bookingData, validationData, invoiceData } = useRefundData();

	// We need to load booking data if it's not already loaded
	// This handles cases where users might directly visit this URL
	useEffect(() => {
		if (!bookingData && !validationData && bookingId) {
			// Show a message to the user
			toast.info('Please verify your booking first');

			// Redirect to the search page
			router.push('/refund');
		}
	}, [bookingId, bookingData, validationData, router]);

	const handleRefundRequest = async (
		formData: Omit<CreateRefundRequest, 'token'>,
	) => {
		if (!bookingData || !validationData || !invoiceData) {
			toast.error('Missing booking information. Please try again.');
			return;
		}

		try {
			const refundRequest: CreateRefundRequest = {
				token: validationData.token,
				reason: formData.reason,
				refund_method: formData.refund_method,
				account_name: formData.account_name,
				account_number: formData.account_number,
			};

			await createRefund(refundRequest);
			toast.success('Refund request submitted successfully!');
			router.push(`/refund/${bookingData.id}/success`);
		} catch (error) {
			toast.error('Failed to process your refund request. Please try again.');
			console.error('Refund request error:', error);
		}
	};

	return (
		<HeroSection
			title={
				<>
					<span className='text-primary'>
						Request a refund or track your status
					</span>{' '}
					just enter your booking code and let’s handle the rest!
				</>
			}
		>
			<div className='flex flex-col items-center m-24 w-full'>
				{bookingData && validationData && invoiceData && (
					<div className='flex flex-col items-center gap-8 w-full'>
						<StatusCard
							variant={
								bookingData.status === 'confirmed' ? 'eligible' : 'processing'
							}
							title={
								bookingData.status === 'confirmed'
									? 'Eligible for Refund'
									: 'Processing Booking'
							}
							description={
								bookingData.status === 'confirmed'
									? 'Your booking is eligible for a refund. Please review the details below.'
									: 'Your booking is being processed. Some features may be limited.'
							}
						/>

						<InvoiceDetail {...invoiceData} />
						<RefundForm
							onRefundRequest={handleRefundRequest}
							isLoading={loading}
						/>
					</div>
				)}
			</div>
		</HeroSection>
	);
}
