import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Search } from 'lucide-react';
import { useState } from 'react';
import { OTPVerificationModal } from '@/components/pages/reschedule/otp-modal';
import { useReschedules } from '@/hooks/reschedules/use-reschedules';
import { toast } from 'sonner';

export default function SearchBooking() {
	const [bookingCode, setBookingCode] = useState('');
	const [isOTPModalOpen, setIsOTPModalOpen] = useState(false);
	const { loading, requestReschedule } = useReschedules();

	const handleSearch = async () => {
		if (!bookingCode.trim()) {
			toast.error('Please enter your booking code');
			return;
		}

		try {
			// Call the requestReschedule function from the useReschedules hook
			const response = await requestReschedule(bookingCode);

			// If the request is successful (status is 200 or similar success code)
			if (response.status === 200) {
				setIsOTPModalOpen(true);
			} else {
				toast.error(
					response.error?.description || 'Failed to request reschedule',
				);
			}
		} catch (error) {
			console.error(error);
			// Error is already handled in the hook and stored in the error state
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

			<OTPVerificationModal
				open={isOTPModalOpen}
				onOpenChange={setIsOTPModalOpen}
				bookingCode={bookingCode}
			/>
		</>
	);
}
