'use client';

import { useRouter } from 'next/navigation';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Checkbox } from '@/components/ui/checkbox';
import { useReservationStore } from '@/store/useReservationStore';

export function PersonalInfoCard() {
	const router = useRouter();
	const { personalInfo } = useReservationStore();

	if (!personalInfo) {
		router.push('/reservation/personal');
		return null;
	}

	return (
		<Card>
			<CardHeader className='border-b'>
				<CardTitle className='font-semibold text-primary text-2xl'>
					Review Personal Information
				</CardTitle>
			</CardHeader>
			<CardContent className='pt-6'>
				<div className='space-y-6'>
					<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='display-name'>Full Name</Label>
							<Input id='display-name' value={personalInfo.name} disabled />
						</div>
						<div className='space-y-2'>
							<Label htmlFor='display-phone'>Phone Number</Label>
							<Input id='display-phone' value={personalInfo.phone} disabled />
						</div>
					</div>

					<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='display-email'>Email</Label>
							<Input
								id='display-email'
								value={personalInfo.email || 'Not provided'}
								disabled
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='display-guest-count'>Number of Guests</Label>
							<Input
								id='display-guest-count'
								value={personalInfo.guestCount}
								disabled
							/>
						</div>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='display-address'>Address</Label>
						<Textarea id='display-address' value={personalInfo.address} disabled />
					</div>

					<div className='space-y-2'>
						<Label htmlFor='display-source'>How did you hear about us?</Label>
						<Input id='display-source' value={personalInfo.source} disabled />
					</div>

					<div className='space-y-4 pt-4 border-t'>
						<div className='flex items-center space-x-2'>
							<Checkbox checked={personalInfo.agreeToTerms} disabled />
							<p className='text-sm'>Terms and Conditions</p>
						</div>
						<div className='flex items-center space-x-2'>
							<Checkbox checked={personalInfo.agreeToPrivacy} disabled />
							<p className='text-sm'>Privacy Policy</p>
						</div>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}