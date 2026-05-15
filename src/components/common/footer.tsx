'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, LoaderCircle } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

const ASSETS_URL = process.env.NEXT_PUBLIC_ASSETS_URL || 'https://assets.tazkiyaworks.fun:9001/'; // eslint-disable-line @typescript-eslint/no-unused-vars

type FooterStatus = {
	name: string;
	color: string;
};



interface FooterProps extends React.HTMLAttributes<HTMLDivElement> {
	onSubscribe?: (email: string) => Promise<{ success: boolean; error?: string }>;
}

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

export default function Footer({ onSubscribe }: FooterProps) {
	const [formState, setFormState] = useState({
		email: '',
		status: 'idle' as FormStatus,
		message: '',
	});

	const isLoading = formState.status === 'loading';

	const handleSubmit = async (e: React.FormEvent) => {
		e.preventDefault();
		if (!onSubscribe) return;

		setFormState((prev) => ({ ...prev, status: 'loading', message: '' }));

		try {
			const result = await onSubscribe(formState.email);
			if (!result.success) {
				setFormState((prev) => ({
					...prev,
					status: 'error',
					message: result.error || '',
				}));
			} else {
				setFormState({
					email: '',
					status: 'success',
					message: 'Thanks for subscribing!',
				});
			}
		} catch (error) {
			setFormState((prev) => ({
				...prev,
				status: 'error',
				message: error instanceof Error ? error.message : 'Failed to subscribe',
			}));
		}
	};

	const footerStatus: FooterStatus[] = [
		{
			name: 'All Systems Normal',
			color: 'bg-green-500',
		},
		{
			name: 'Maintenance',
			color: 'bg-yellow-500',
		},
		{
			name: 'Down',
			color: 'bg-red-500',
		},
	];

	return (
		<footer className='relative overflow-hidden'>
			{/* Background Pattern */}
			<div className='absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent' />
			<div
				className='absolute inset-0 opacity-[0.03]'
				style={{
					backgroundImage:
						'linear-gradient(rgba(255,255,255,0.02) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.02) 1px, transparent 1px)',
					backgroundSize: '40px 40px',
				}}
			/>

			<div className='max-w-7xl mx-auto px-4 sm:px-8 relative z-10'>
				<div className='grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 py-8 sm:py-12 md:py-16'>
					{/* Brand Column */}
					<div className='col-span-1 md:col-span-5 flex flex-col gap-6'>
						<div className='flex items-center gap-3'>
							<div className='relative w-40 h-24'>
								<Image
									src='/assets/logo/levicamp-logo-orange.svg'
									alt='Levi Camp Logo'
									fill
									className='object-contain'
								/>
							</div>
						</div>
						<p className='text-sm text-muted-foreground leading-relaxed max-w-sm'>
							The best camping experience in Indonesia&apos;s great outdoors.
							Enjoy unforgettable adventures with family and friends.
						</p>

						{/* Newsletter Input */}
						<div className='flex items-center gap-2 mt-2 group'>
							<form onSubmit={handleSubmit} className='flex items-center gap-2 w-full'>
								<div className='relative flex-1 max-w-xs'>
									<Input
										type='email'
										placeholder='Enter your email...'
										value={formState.email}
										onChange={(e) =>
											setFormState((prev) => ({ ...prev, email: e.target.value }))
										}
										disabled={isLoading}
										className='bg-white/50 dark:bg-black/20 border-border/40 rounded-lg px-4 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary/50 transition-colors'
									/>
								</div>
								<Button
									type='submit'
									disabled={isLoading}
									className='p-2.5 bg-primary hover:bg-primary/90 rounded-lg text-primary-foreground transition-colors'
								>
									{isLoading ? (
										<LoaderCircle className='animate-spin' size={18} />
									) : (
										<ArrowRight size={18} />
									)}
								</Button>
							</form>
						</div>
						{formState.message && (
							<p
								className={cn(
									'text-xs',
									formState.status === 'error'
										? 'text-destructive'
										: 'text-green-600 dark:text-green-400',
								)}
								role='alert'
							>
								{formState.message}
							</p>
						)}
					</div>

					{/* Links Columns */}
					{[
						{
							title: 'Navigation',
							links: [
								{ label: 'Reservation', href: '/reservation' },
								{ label: 'Facilities', href: '/facilities' },
								{ label: 'Article', href: '/article' },
								{ label: 'Catalog', href: '/catalog' },
							],
						},
						{
							title: 'Company',
							links: [
								{ label: 'About Us', href: '/about' },
								{ label: 'Careers', href: '/careers' },
								{ label: 'Blog', href: '/blog' },
								{ label: 'Contact', href: '/contact' },
							],
						},
						{
							title: 'Legal',
							links: [
								{ label: 'Terms & Conditions', href: '/terms' },
								{ label: 'Privacy Policy', href: '/privacy' },
								{ label: 'Cookie Policy', href: '/cookies' },
								{ label: 'FAQ', href: '/faq' },
							],
						},
					].map((section, idx) => (
						<div key={idx} className='col-span-6 md:col-span-2 flex flex-col gap-4'>
							<h4 className='text-xs font-semibold text-foreground/70 uppercase tracking-widest'>
								{section.title}
							</h4>
							<ul className='flex flex-col gap-3'>
								{section.links.map((link) => (
									<li key={link.label}>
										<Link
											href={link.href}
											className='text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2 group w-fit'
										>
											<span className='w-2 h-2 rounded-full bg-muted/90 group-hover:bg-primary transition-all group-hover:w-4 duration-200' />
											{link.label}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>

				{/* Bottom Bar */}
				<div className='flex flex-col md:flex-row items-center justify-between gap-6 py-8 border-t border-border/20'>
					<div>
						<div className='flex flex-wrap items-center gap-x-2 gap-y-1 pt-1'>
							<Link href='https://heulaulab.tazkiyaworks.fun' target='_blank' rel='noopener noreferrer'>
								<div className='flex items-center gap-x-2'>
									<Image
										src='/heulaulab.svg'
										alt='HeulauLab'
										width={100}
										height={100}
										className='dark:invert w-auto h-10'
									/>
									<span
										className='text-muted-foreground/40 select-none'
										aria-hidden
									>
										|
									</span>
									<span className='text-[11px] text-muted-foreground/90'>
										Proudly partnered with HeulauLab
									</span>
								</div>
							</Link>
						</div>
						<p className='text-xs text-muted-foreground'>
							© {new Date().getFullYear()} Levi Camp. All rights reserved.
						</p>
					</div>

					<div className='flex items-center gap-6'>
						{/* Social Links Placeholder */}
						<div className='flex gap-4 border-r border-border/20 pr-6 mr-2'>
							{['facebook', 'instagram', 'twitter'].map((social) => (
								<Link
									key={social}
									href={`https://${social}.levicamp`}
									target='_blank'
									className='text-muted-foreground hover:text-primary transition-colors text-xs uppercase font-medium'
								>
									{social}
								</Link>
							))}
						</div>

						{/* Status Badge */}
						<div className='flex items-center gap-2 px-3 py-1 rounded-full bg-primary/5 border border-primary/10'>
							<Link href='https://statuslevicamp.tazkiyaworks.fun' target='_blank' rel='noopener noreferrer'>
								<div className='flex items-center gap-2'>
									<div className={cn('w-1.5 h-1.5 rounded-full', footerStatus[0].color)} />
									<span className='text-xs uppercase font-medium text-primary/80 tracking-wider'>
										{footerStatus[0].name}
									</span>
								</div>
							</Link>	
						</div>
					</div>
				</div>
			</div>
		</footer>
	);
}