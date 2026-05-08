'use client';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
	Select,
	SelectContent,
	SelectItem,
	SelectTrigger,
	SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import Link from 'next/link';

interface PersonalInfoCardProps {
	onSubmit: (data: PersonalInfoData) => void;
	initialData?: PersonalInfoData;
}

export interface PersonalInfoData {
	name: string;
	phone: string;
	email?: string;
	guestCount: string;
	address: string;
	source: string;
	agreeToTerms: boolean;
	agreeToPrivacy: boolean;
}

export function PersonalInfoCard({
	onSubmit,
	initialData,
}: PersonalInfoCardProps) {
	const handleSubmit = (e: React.FormEvent) => {
		e.preventDefault();
		const formData = new FormData(e.target as HTMLFormElement);
		const emailValue = formData.get('email') as string;
		const data: PersonalInfoData = {
			name: formData.get('name') as string,
			phone: formData.get('phone') as string,
			email: emailValue && emailValue.trim() ? emailValue : undefined,
			guestCount: formData.get('guestCount') as string,
			address: formData.get('address') as string,
			source: formData.get('source') as string,
			agreeToTerms: formData.get('agreeToTerms') === 'on',
			agreeToPrivacy: formData.get('agreeToPrivacy') === 'on',
		};
		onSubmit(data);
	};

	return (
		<Card>
			<CardHeader className='border-b'>
				<CardTitle className='font-semibold text-primary text-2xl'>
					Personal Information
				</CardTitle>
			</CardHeader>
			<CardContent className='pt-6'>
				<form onSubmit={handleSubmit} className='space-y-6'>
					<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='name'>Full Name *</Label>
							<Input
								id='name'
								name='name'
								required
								placeholder='Enter your full name'
								defaultValue={initialData?.name || ''}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='phone'>Phone Number *</Label>
							<div className='relative'>
								<Input
									className='peer ps-16'
									id='phone'
									name='phone'
									required
									type='tel'
									placeholder='Enter your phone number'
									defaultValue={initialData?.phone || ''}
									onChange={(e) => {
										let value = e.target.value;
										if (value.startsWith('+62')) {
											value = value.slice(3);
										} else if (value.startsWith('62')) {
											value = value.slice(2);
										} else if (value.startsWith('0')) {
											value = value.slice(1);
										}
										value = value.replace(/\D/g, '');
										e.target.value = value;
									}}
								/>
								<span className='absolute inset-y-0 flex justify-center items-center pointer-events-none start-0 ps-3 text-muted-foreground text-sm'>
									+62
								</span>
							</div>
						</div>
					</div>

					<div className='gap-4 grid grid-cols-1 md:grid-cols-2'>
						<div className='space-y-2'>
							<Label htmlFor='email'>Email</Label>
							<Input
								id='email'
								name='email'
								type='email'
								placeholder='your@email.com'
								defaultValue={initialData?.email || ''}
							/>
						</div>
						<div className='space-y-2'>
							<Label htmlFor='guestCount'>Total Guests *</Label>
							<div className='relative flex shadow-sm rounded-lg'>
								<Input
									className='z-10 shadow-none -me-px ps-6 rounded-e-none'
									id='guestCount'
									name='guestCount'
									required
									type='number'
									min='1'
									placeholder='1'
									defaultValue={initialData?.guestCount || ''}
								/>
								<span className='inline-flex items-center border border-input bg-background px-3 rounded-e-lg text-muted-foreground text-sm'>
									Guests
								</span>
							</div>
						</div>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='address'>Address *</Label>
						<Textarea
							id='address'
							name='address'
							required
							placeholder='Enter your address'
							defaultValue={initialData?.address || ''}
						/>
					</div>

					<div className='space-y-2'>
						<Label htmlFor='source'>How did you hear about us? *</Label>
						<Select name='source' required defaultValue={initialData?.source}>
							<SelectTrigger id='source'>
								<SelectValue placeholder='Select an option' />
							</SelectTrigger>
							<SelectContent>
								<SelectItem value='Social Media'>Social Media</SelectItem>
								<SelectItem value='Friend/Family'>Friend/Family</SelectItem>
								<SelectItem value='Search Engine'>Search Engine</SelectItem>
								<SelectItem value='Other'>Other</SelectItem>
							</SelectContent>
						</Select>
					</div>

					<div className='space-y-4 pt-4 border-t'>
						<div className='flex items-center space-x-2'>
							<Checkbox
								id='agreeToTerms'
								name='agreeToTerms'
								required
								defaultChecked={initialData?.agreeToTerms}
							/>
							<Label htmlFor='agreeToTerms' className='text-sm'>
								I agree to the{' '}
								<Link
									href='/terms-and-conditions'
									className='font-medium text-primary hover:underline'
								>
									Terms and Conditions
								</Link>
							</Label>
						</div>
						<div className='flex items-center space-x-2'>
							<Checkbox
								id='agreeToPrivacy'
								name='agreeToPrivacy'
								required
								defaultChecked={initialData?.agreeToPrivacy}
							/>
							<Label htmlFor='agreeToPrivacy' className='text-sm'>
								I agree to the{' '}
								<Link
									href='/privacy-policy'
									className='font-medium text-primary hover:underline'
								>
									Privacy Policy
								</Link>
							</Label>
						</div>
					</div>

					<Button type='submit' className='w-full'>
						Save
					</Button>
				</form>
			</CardContent>
		</Card>
	);
}