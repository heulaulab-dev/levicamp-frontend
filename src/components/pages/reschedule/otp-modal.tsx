import * as React from 'react';

import { cn } from '@/lib/utils';
import { useMediaQuery } from '@/hooks/use-media-query';
import { Button } from '@/components/ui/button';
import {
	Dialog,
	DialogContent,
	DialogDescription,
	DialogHeader,
	DialogTitle,
} from '@/components/ui/dialog';
import {
	Drawer,
	DrawerClose,
	DrawerContent,
	DrawerDescription,
	DrawerFooter,
	DrawerHeader,
	DrawerTitle,
} from '@/components/ui/drawer';
import { useReschedules } from '@/hooks/reschedules/use-reschedules';
import { toast } from 'sonner';
import {
	InputOTP,
	InputOTPGroup,
	InputOTPSeparator,
	InputOTPSlot,
} from '@/components/ui/input-otp';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
	Form,
	FormControl,
	FormDescription,
	FormField,
	FormItem,
	FormLabel,
	FormMessage,
} from '@/components/ui/form';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useRescheduleData } from '@/hooks/reschedules/use-reschedule-data';

interface OTPVerificationModalProps {
	open: boolean;
	onOpenChange: (open: boolean) => void;
	bookingCode: string;
}

export function OTPVerificationModal({
	open,
	onOpenChange,
	bookingCode,
}: OTPVerificationModalProps) {
	const isDesktop = useMediaQuery('(min-width: 768px)');
	const { validateReschedule, loading } = useReschedules();
	const { setRescheduleData } = useRescheduleData();
	const router = useRouter();

	const FormSchema = z.object({
		pin: z.string().min(6, {
			message: 'Your one-time password must be 6 characters.',
		}),
	});

	const handleVerifyOTP = async (data: z.infer<typeof FormSchema>) => {
		const otp = data.pin;

		if (!otp.trim()) {
			toast.error('Please enter the OTP sent to your email/phone');
			return;
		}

		if (!otp) {
			toast.error('Session expired. Please request a new OTP');
			return;
		}

		try {
			// Use the validateRescheduleToken to verify the OTP (token)
			const response = await validateReschedule(otp);

			// If validation successful, redirect to booking-specific page
			if (response.status >= 200 && response.status < 300) {
				// Store the validation data in persistent storage
				setRescheduleData(response.data.booking, {
					id: response.data.id,
					token: response.data.token,
					used: response.data.used,
					expired_at: response.data.expired_at,
				});

				toast.success(
					'Your identity has been verified. Redirecting to reschedule page.',
				);

				// Close the modal
				onOpenChange(false);

				// Redirect to the booking-specific page with the booking ID as slug
				if (bookingCode) {
					router.push(`/reschedule/${bookingCode}`);
				}
			} else {
				toast.error(response.message || 'Failed to verify OTP');
			}
		} catch (error) {
			console.error('Error validating OTP:', error);
			// Error is already handled in the hook and stored in the error state
			toast.error(
				error instanceof Error ? error.message : 'Failed to verify OTP',
			);
		}
	};

	const InputOTPForm = ({ className }: React.ComponentProps<'form'>) => {
		const form = useForm<z.infer<typeof FormSchema>>({
			resolver: zodResolver(FormSchema),
			defaultValues: {
				pin: '',
			},
		});

		return (
			<Form {...form}>
				<form
					className={cn('space-y-6', className)}
					onSubmit={form.handleSubmit(handleVerifyOTP)}
				>
					<FormField
						control={form.control}
						name='pin'
						render={({ field }) => (
							<FormItem>
								<FormLabel>Verification Code</FormLabel>
								<FormControl>
									<InputOTP
										maxLength={6}
										{...field}
										className='justify-between w-full'
									>
										<InputOTPGroup className='w-full'>
											<InputOTPSlot index={0} className='flex-1 h-12' />
											<InputOTPSlot index={1} className='flex-1 h-12' />
											<InputOTPSlot index={2} className='flex-1 h-12' />
										</InputOTPGroup>
										<InputOTPSeparator />
										<InputOTPGroup className='w-full'>
											<InputOTPSlot index={3} className='flex-1 h-12' />
											<InputOTPSlot index={4} className='flex-1 h-12' />
											<InputOTPSlot index={5} className='flex-1 h-12' />
										</InputOTPGroup>
									</InputOTP>
								</FormControl>
								<FormDescription className='text-xs'>
									Didn&apos;t receive the code?{' '}
									<Link
										href='/reschedule/search-booking'
										className='text-primary hover:underline'
									>
										Click to resend
									</Link>
								</FormDescription>
								<FormMessage />
							</FormItem>
						)}
					/>
					<div className='flex gap-2'>
						<Button
							variant='outline'
							type='button'
							className='w-full'
							onClick={() => onOpenChange(false)}
						>
							Cancel
						</Button>
						<Button type='submit' className='w-full' disabled={loading}>
							{loading ? 'Verifying...' : 'Confirm Code'}
						</Button>
					</div>
				</form>
			</Form>
		);
	};

	if (isDesktop) {
		return (
			<Dialog open={open} onOpenChange={onOpenChange}>
				<DialogContent className='sm:max-w-[425px]'>
					<DialogHeader>
						<DialogTitle>Verify Your Identity</DialogTitle>
						<DialogDescription>
							We&apos;ve sent a one-time password (OTP) to your email contact
							details.
						</DialogDescription>
					</DialogHeader>
					<InputOTPForm className='w-full' />
				</DialogContent>
			</Dialog>
		);
	}

	return (
		<Drawer open={open} onOpenChange={onOpenChange}>
			<DrawerContent>
				<DrawerHeader className='text-left'>
					<DrawerTitle>Verify Your Identity</DrawerTitle>
					<DrawerDescription>
						We&apos;ve sent a one-time password (OTP) to your email contact
						details.
					</DrawerDescription>
				</DrawerHeader>
				<InputOTPForm className='px-4' />
				<DrawerFooter className='pt-2'>
					<DrawerClose asChild>
						<Button variant='outline'>Cancel</Button>
					</DrawerClose>
				</DrawerFooter>
			</DrawerContent>
		</Drawer>
	);
}
