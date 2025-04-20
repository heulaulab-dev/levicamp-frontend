import { Skeleton } from '@/components/ui/skeleton';
import { Card } from '@/components/ui/card';

export default function Loading() {
	return (
		<div className='flex md:flex-row flex-col gap-6 md:gap-10 p-4 md:p-6'>
			{/* Left Section */}
			<div className='flex flex-col gap-6 w-full md:w-2/3'>
				{/* Header Section */}
				<div className='flex sm:flex-row flex-col justify-between items-start sm:items-center gap-4'>
					<Skeleton className='w-40 h-10' />
					<Skeleton className='w-40 h-10' />
				</div>

				{/* Tent List Skeleton */}
				<div className='gap-4 md:gap-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3'>
					{Array(3)
						.fill(0)
						.map((_, index) => (
							<TentCardSkeleton key={index} />
						))}
				</div>
			</div>

			{/* Right Section (Summary Card) */}
			<div className='mt-6 md:mt-0 w-full md:w-1/3'>
				<SummarySkeleton />
			</div>
		</div>
	);
}

function TentCardSkeleton() {
	return (
		<Card className='overflow-hidden'>
			<div className='relative bg-muted h-40'>
				<Skeleton className='w-full h-full' />
			</div>
			<div className='p-4'>
				<Skeleton className='mb-2 w-3/4 h-5' />
				<Skeleton className='mb-1 w-full h-4' />
				<Skeleton className='mb-3 w-2/3 h-4' />
				<div className='flex justify-between items-center mt-3'>
					<Skeleton className='w-20 h-5' />
					<Skeleton className='rounded-md w-20 h-9' />
				</div>
			</div>
		</Card>
	);
}

function SummarySkeleton() {
	return (
		<Card className='top-4 sticky p-5'>
			<Skeleton className='mb-4 w-40 h-7' />

			{/* Date range skeleton */}
			<div className='bg-muted mb-4 p-3 rounded-md'>
				<div className='flex justify-between mb-2'>
					<Skeleton className='w-16 h-4' />
					<Skeleton className='w-24 h-4' />
				</div>
				<div className='flex justify-between'>
					<Skeleton className='w-16 h-4' />
					<Skeleton className='w-24 h-4' />
				</div>
			</div>

			{/* Selected tents skeleton */}
			<Skeleton className='mb-3 w-40 h-5' />
			{Array(2)
				.fill(0)
				.map((_, index) => (
					<div
						key={index}
						className='flex justify-between items-center bg-secondary/30 mb-3 p-2 rounded-md'
					>
						<div className='w-full'>
							<Skeleton className='mb-1 w-24 h-5' />
							<Skeleton className='w-16 h-3' />
						</div>
						<div className='flex items-center gap-2'>
							<Skeleton className='w-12 h-4' />
							<Skeleton className='rounded-full w-7 h-7' />
						</div>
					</div>
				))}

			{/* Price summary skeleton */}
			<div className='mb-4 pt-3 border-t'>
				<div className='flex justify-between mb-1'>
					<Skeleton className='w-16 h-4' />
					<Skeleton className='w-16 h-4' />
				</div>
				<div className='flex justify-between mb-1'>
					<Skeleton className='w-12 h-4' />
					<Skeleton className='w-8 h-4' />
				</div>
				<div className='flex justify-between mt-2'>
					<Skeleton className='w-12 h-6' />
					<Skeleton className='w-20 h-6' />
				</div>
			</div>

			{/* Button skeleton */}
			<Skeleton className='rounded-md w-full h-10' />
		</Card>
	);
}
