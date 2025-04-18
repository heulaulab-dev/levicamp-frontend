/* eslint-disable @typescript-eslint/no-explicit-any */
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { OTPVerificationModal } from '@/components/pages/reschedule/otp-modal';
import { useReschedules } from '@/hooks/reschedules/use-reschedules';
import { StatusCard } from '@/components/pages/reschedule/status-card';
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
	const { requestReschedule, loading } = useReschedules();

	// Function untuk handle pencarian booking
	const handleSearch = async () => {
		try {
			setStatusInfo(null);
			const response = await requestReschedule(bookingCode);
			if (response.data?.token) {
				setIsOTPModalOpen(true);
			} else {
				console.log(response);
			}
			console.log(response);
		} catch (error: any) {
			console.error(error.error.description);
			console.log(error);

			// Extract error description from API response
			const errorDescription = error.error.description;

			console.log(errorDescription);

			if (errorDescription && errorDescriptionMap[errorDescription]) {
				// If error description exists in the map, use the predefined status info
				setStatusInfo(errorDescriptionMap[errorDescription]);
			} else {
				// Fallback for unknown errors
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
						<Button type='submit' onClick={handleSearch} disabled={loading}>
							{loading ? 'Searching...' : 'Search'}
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
