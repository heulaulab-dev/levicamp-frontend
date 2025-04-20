import { Search } from 'lucide-react';
import { useState } from 'react';

import { OTPVerificationModal } from '@/components/pages/refund/otp-modal';
import { StatusCard } from '@/components/pages/refund/status-card';
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Spinner } from '@/components/ui/ios-spinner';
import { Label } from '@/components/ui/label';
import { useRefund } from '@/hooks/refund/use-refund';
import { errorDescriptionMap } from '@/types/error-description-map';

export default function SearchBooking() {
	const [bookingCode, setBookingCode] = useState('');
	const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
	const [statusInfo, setStatusInfo] = useState<{
		variant:
			| 'eligible'
			| 'processing'
			| 'completed'
			| 'failed'
			| 'error'
			| 'confirmed';
		title: string;
		description: string;
	} | null>(null);
	const { requestRefund, loading } = useRefund();

	// Function to handle booking search
	const handleSearch = async () => {
		try {
			setStatusInfo(null);
			const response = await requestRefund(bookingCode);
			if (
				response.status === 200 &&
				response.message === 'Success request refund'
			) {
				setIsOTPModalOpen(true);
			} else {
				setStatusInfo({
					variant: 'error',
					title: 'Error',
					description: response.message || 'An unexpected error occurred',
				});
			}
		} catch (error: any) {
			const errorDescription = error.error.description;

			if (errorDescription && errorDescriptionMap[errorDescription]) {
				setStatusInfo(errorDescriptionMap[errorDescription]);
			} else {
				setStatusInfo({
					variant: 'error',
					title: 'Error',
					description:
						error.error.description || 'An unexpected error occurred',
				});
			}
		}
	};

	return (
		<>
			<div className='flex md:flex-row flex-col items-center gap-4 bg-secondary shadow-md p-6 rounded-lg w-full max-w-3xl'>
				<div className='space-y-2 w-full'>
					<Label htmlFor='booking-code' className='text-secondary-foreground'>
						Your booking code
					</Label>
					<div className='flex items-center gap-2'>
						<div className='relative w-full'>
							<Input
								id='booking-code'
								className='peer bg-gray-100 ps-9 border-none text-gray-800'
								placeholder='Input your booking code'
								type='search'
								value={bookingCode}
								onChange={(e) => setBookingCode(e.target.value)}
							/>
							<div className='absolute inset-y-0 flex justify-center items-center peer-disabled:opacity-50 ps-3 text-muted-foreground/80 pointer-events-none start-0'>
								<Search size={16} strokeWidth={2} aria-hidden='true' />
							</div>
						</div>
						<Button
							className='group relative'
							data-loading={loading}
							onClick={handleSearch}
							disabled={loading}
						>
							<span className='group-data-[loading=true]:text-transparent'>
								Search Now!
							</span>
							{loading && (
								<div className='absolute inset-0 flex justify-center items-center'>
									<Spinner size='lg' />
								</div>
							)}
						</Button>
					</div>
				</div>
			</div>

			{statusInfo && (
				<div className='mt-4 w-full'>
					<StatusCard
						variant={statusInfo.variant}
						title={statusInfo.title}
						description={statusInfo.description}
					/>
				</div>
			)}

			<OTPVerificationModal
				open={isOTPModalOpen}
				onOpenChange={setIsOTPModalOpen}
				bookingCode={bookingCode}
			/>
		</>
	);
}
