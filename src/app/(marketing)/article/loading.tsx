import { Skeleton } from '@/components/ui/skeleton';

function ArticleCardSkeleton() {
	return (
		<div className='bg-transparent border-0 sm:col-span-12 lg:col-span-10 lg:col-start-2'>
			<div className='md:items-center gap-y-6 sm:gap-x-5 sm:gap-y-0 md:gap-x-8 lg:gap-x-12 grid sm:grid-cols-10'>
				{/* Text side */}
				<div className='sm:col-span-5'>
					<div className='mb-4 md:mb-6'>
						<div className='flex gap-3 md:gap-5'>
							<Skeleton className='h-4 w-16 rounded' />
							<Skeleton className='h-4 w-20 rounded' />
						</div>
					</div>
					<Skeleton className='h-7 w-full max-w-xs rounded mb-2' />
					<Skeleton className='h-7 w-3/4 rounded mb-6' />
					<div className='space-y-2'>
						<Skeleton className='h-4 w-full rounded' />
						<Skeleton className='h-4 w-full rounded' />
						<Skeleton className='h-4 w-2/3 rounded' />
					</div>
					<div className='flex gap-4 mt-6 md:mt-8'>
						<Skeleton className='h-4 w-24 rounded' />
						<Skeleton className='h-4 w-20 rounded' />
					</div>
					<div className='flex items-center gap-2 mt-6 md:mt-8'>
						<Skeleton className='h-5 w-24 rounded' />
					</div>
				</div>

				{/* Image side */}
				<div className='order-first sm:order-last sm:col-span-5'>
					<div className='aspect-[16/9] rounded-lg overflow-hidden'>
						<Skeleton className='w-full h-full rounded-none' />
					</div>
				</div>
			</div>
		</div>
	);
}

export default function ArticleLoading() {
	return (
		<section className='py-32'>
			<div className='flex flex-col items-center gap-16 mx-auto container'>
				{/* Heading skeleton */}
				<div className='text-center'>
					<Skeleton className='h-9 w-64 mx-auto mb-6 rounded' />
					<Skeleton className='h-5 w-full max-w-2xl mx-auto rounded' />
					<Skeleton className='h-5 w-5/6 max-w-2xl mx-auto mt-2 rounded' />
				</div>

				{/* Article card skeletons — mirrors Blog8 grid layout */}
				<div className='gap-y-10 sm:gap-y-12 md:gap-y-16 lg:gap-y-20 grid sm:grid-cols-12'>
					<ArticleCardSkeleton />
					<ArticleCardSkeleton />
					<ArticleCardSkeleton />
				</div>
			</div>
		</section>
	);
}
