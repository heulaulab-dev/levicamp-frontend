import { Skeleton } from '@/components/ui/skeleton';

export default function ArticleLoading() {
	return (
		<article className='mt-[80px] py-8 md:py-12'>
			<div className='mx-auto max-w-4xl container'>
				{/* Back button skeleton */}
				<div className='mb-4'>
					<Skeleton className='h-9 w-36 rounded-md' />
				</div>

				{/* Title skeleton */}
				<div className='mb-6 space-y-2'>
					<Skeleton className='h-9 w-full rounded-lg' />
					<Skeleton className='h-9 w-4/5 rounded-lg' />
				</div>

				{/* Author + share buttons row */}
				<div className='flex justify-between items-center mb-8'>
					<div className='flex items-center gap-3'>
						<Skeleton className='w-12 h-12 rounded-full' />
						<div className='space-y-2'>
							<Skeleton className='h-4 w-24 rounded' />
							<Skeleton className='h-3 w-32 rounded' />
						</div>
					</div>

					<div className='flex items-center gap-2'>
						<Skeleton className='h-8 w-8 rounded-full' />
						<Skeleton className='h-8 w-8 rounded-full' />
						<Skeleton className='h-8 w-8 rounded-full' />
					</div>
				</div>

				{/* Hero image skeleton */}
				<div className='mb-8'>
					<Skeleton className='w-full aspect-video rounded-lg' />
				</div>

				{/* Article body skeleton */}
				<div className='mx-auto max-w-3xl space-y-4'>
					<Skeleton className='h-4 w-full rounded' />
					<Skeleton className='h-4 w-full rounded' />
					<Skeleton className='h-4 w-3/4 rounded' />
					<Skeleton className='h-6 w-1/3 rounded' />
					<Skeleton className='h-4 w-full rounded' />
					<Skeleton className='h-4 w-full rounded' />
					<Skeleton className='h-4 w-5/6 rounded' />
				</div>

				{/* Tags skeleton */}
				<div className='mx-auto mt-12 max-w-3xl'>
					<Skeleton className='h-px w-full mb-6' />
					<div className='flex gap-2'>
						<Skeleton className='h-6 w-20 rounded-full' />
						<Skeleton className='h-6 w-24 rounded-full' />
					</div>
				</div>
			</div>
		</article>
	);
}
