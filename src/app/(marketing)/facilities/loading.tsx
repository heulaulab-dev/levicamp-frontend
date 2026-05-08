import { Skeleton } from '@/components/ui/skeleton';

export default function FacilitiesLoading() {
	return (
		<div>
			{/* Full-height hero skeleton */}
			<section className='relative flex flex-col justify-center items-center w-full min-h-screen overflow-hidden'>
				{/* Floating image skeletons */}
				<div className='absolute inset-0 overflow-hidden'>
					<div className='absolute top-[15%] left-[2%]'>
						<Skeleton className='w-16 h-12 rounded-xl' />
					</div>
					<div className='absolute top-[6%] left-[11%]'>
						<Skeleton className='w-40 h-28 rounded-xl' />
					</div>
					<div className='absolute bottom-[20%] left-[8%]'>
						<Skeleton className='w-40 h-40 rounded-lg' />
					</div>
					<div className='absolute top-[2%] right-[17%]'>
						<Skeleton className='w-60 h-44 rounded-xl' />
					</div>
					<div className='absolute bottom-[32%] right-[17%]'>
						<Skeleton className='w-72 h-72 rounded-xl' />
					</div>
				</div>

				{/* Heading skeleton */}
				<div className='z-50 flex flex-col items-center space-y-4 w-64 sm:w-96 text-center'>
					<Skeleton className='h-12 sm:h-16 md:h-20 w-full rounded-xl' />
					<Skeleton className='h-12 sm:h-16 md:h-20 w-4/5 rounded-xl' />
					<div className='pt-4 space-y-2 w-full max-w-xl'>
						<Skeleton className='h-5 w-full rounded' />
						<Skeleton className='h-5 w-5/6 rounded' />
					</div>
					<Skeleton className='h-11 w-48 rounded-full' />
				</div>
			</section>

			{/* Facilities list skeleton */}
			<section className='bg-secondary/40 py-16'>
				<div className='flex flex-col justify-between mx-auto container'>
					<div className='mb-8'>
						<Skeleton className='h-8 w-40 rounded-lg' />
					</div>

					<div className='space-y-6'>
						{[...Array(5)].map((_, i) => (
							<div
								key={i}
								className='flex flex-col sm:flex-row max-w-3xl rounded-xl overflow-hidden'
								style={{ backgroundColor: '#f0f0f0' }}
							>
								<div className='w-full sm:w-2/5 aspect-video sm:aspect-auto' />
								<div className='p-6 w-full sm:w-3/5 space-y-3'>
									<Skeleton className='h-7 w-full rounded' />
									<Skeleton className='h-4 w-full rounded' />
									<Skeleton className='h-4 w-4/5 rounded' />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
