'use client';

import { Button } from '@/components/ui/button';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface ErrorPageProps {
	error: Error & { digest?: string };
	reset: () => void;
}

export default function RescheduleError({ error, reset }: ErrorPageProps) {
	const message =
		error?.message && error.message !== 'Unexpected end of JSON input'
			? error.message
			: 'Something went wrong while loading the reschedule page.';

	return (
		<section className='py-32 min-h-screen' aria-live='polite'>
			<div className='flex flex-col items-center gap-6 mx-auto container max-w-lg text-center px-4'>
				<div className='flex justify-center items-center rounded-full bg-destructive/10 size-16'>
					<AlertTriangle className='text-destructive size-8' aria-hidden='true' />
				</div>

				<h2 className='font-semibold text-2xl text-foreground'>
					Failed to load reschedule page
				</h2>

				<p className='text-muted-foreground'>{message}</p>

				<p className='text-sm text-muted-foreground'>
					This could be a temporary issue. Try refreshing the page or come back
					later.
				</p>

				<div className='flex gap-3 mt-2'>
					<Button onClick={reset} className='gap-2'>
						<RefreshCw className='size-4' aria-hidden='true' />
						Try again
					</Button>
				</div>
			</div>
		</section>
	);
}