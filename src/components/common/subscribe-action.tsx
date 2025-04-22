'use client';

import { ArrowRight, LoaderCircle } from 'lucide-react';
import { useState } from 'react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';

type FormStatus = 'idle' | 'loading' | 'success' | 'error';

interface NewsletterSectionProps extends React.HTMLAttributes<HTMLElement> {
	title?: string;
	onSubscribe?: (
		email: string,
	) => Promise<{ success: boolean; error?: string }>;
}

export function NewsletterSection({
	title = 'Get notified when new stuff drops.',
	onSubscribe,
	...props
}: NewsletterSectionProps) {
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

	return (
		<section
			{...props}
			className='relative px-4 sm:px-8 py-10 rounded-xl overflow-hidden'
		>
			<h2 className='mb-2 font-medium text-primary text-sm/[1.1] md:text-sm/[1.1] tracking-tight'>
				{title}
			</h2>
			<form onSubmit={handleSubmit} className=''>
				<div className='space-y-2'>
					<div className='inline-flex gap-2'>
						<Input
							id='subscribe-form'
							className='dark:bg-current dark:border-current md:min-w-64 h-10'
							placeholder='Your email'
							type='email'
							value={formState.email}
							onChange={(e) =>
								setFormState((prev) => ({ ...prev, email: e.target.value }))
							}
							disabled={isLoading}
							aria-label='Subscribe to the newsletter'
							required
						/>
						<Button
							type='submit'
							className='group relative'
							disabled={isLoading}
							data-loading={isLoading}
						>
							<span
								className={cn(
									'inline-flex items-center',
									isLoading && 'text-transparent',
								)}
							>
								Subscribe
								<ArrowRight
									className='opacity-60 ms-2 -me-1 w-4 h-4 transition-transform group-hover:translate-x-0.5'
									aria-hidden='true'
								/>
							</span>
							{isLoading && (
								<div className='absolute inset-0 flex justify-center items-center'>
									<LoaderCircle
										className='animate-spin'
										size={16}
										strokeWidth={2}
										aria-hidden='true'
									/>
								</div>
							)}
						</Button>
					</div>
					{formState.message && (
						<p
							className={cn(
								'mt-2 text-xs',
								formState.status === 'error'
									? 'text-destructive'
									: 'text-muted-foreground',
							)}
							role='alert'
							aria-live='polite'
						>
							{formState.message}
						</p>
					)}
				</div>
			</form>
		</section>
	);
}
