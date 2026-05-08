import { Skeleton } from '@/components/ui/skeleton';

export default function MarketingLoading() {
	return (
		<div className='flex flex-col items-center justify-center min-h-[60vh] gap-6'>
			<Skeleton className='w-12 h-12 rounded-xl' />
			<div className='space-y-2 text-center'>
				<Skeleton className='h-5 w-48 mx-auto rounded' />
				<Skeleton className='h-4 w-32 mx-auto rounded' />
			</div>
		</div>
	);
}
