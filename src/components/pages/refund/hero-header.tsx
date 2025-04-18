import Image from 'next/image';
import SearchBooking from '@/components/pages/refund/search-booking';
import { StatusCard } from '@/components/pages/refund/status-card';
import InvoiceDetail from '@/components/pages/refund/invoice-detail';
import RefundForm from '@/components/pages/refund/refund-form';
import { useRefundData } from '@/hooks/refund/use-refund-data';
import { toast } from 'sonner';
import { useRefund } from '@/hooks/refund/use-refund';
import { useRouter } from 'next/navigation';
import { CreateRefundRequest } from '@/types/refunds';

export default function HeroHeader() {
	const { bookingData, validationData, invoiceData } = useRefundData();
	const { createRefund, loading } = useRefund();
	const router = useRouter();

	console.log(bookingData);

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
			router.push(`/refund/${bookingData.id}/confirmation`);
		} catch (error) {
			toast.error('Failed to process your refund request. Please try again.');
			console.error('Refund request error:', error);
		}
	};

	return (
		<section
			className='flex flex-col justify-center items-center bg-gradient-to-b mt-20 px-4 py-10 min-h-screen'
			style={{
				backgroundImage: "url('/bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* Header Section */}
			<div className='flex flex-col items-center'>
				<Image
					src='/assets/icons/camp-icon.png'
					alt='Camping Icon'
					width={50}
					height={50}
				/>

				<div className='mt-4 mb-6 max-w-3xl text-center'>
					<h1 className='font-bold text-primary dark:text-primary-foreground text-4xl md:text-5xl leading-tight'>
						<span className='text-primary'>
							Request a refund or track your status
						</span>{' '}
						just enter your booking code and let’s handle the rest!
					</h1>
				</div>
			</div>

			{/* Search Section */}
			<section className='flex flex-col items-center w-full max-w-3xl'>
				<SearchBooking />
			</section>

			<div className='flex flex-col items-center mt-4 w-full max-w-3xl'>
				{bookingData && validationData && invoiceData && (
					<div className='flex flex-col items-center w-full'>
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
		</section>
	);
}
