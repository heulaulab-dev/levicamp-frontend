import { Skeleton } from '@/components/ui/skeleton';

export default function HomeLoading() {
	return (
		<div className='overflow-hidden'>
			{/* Hero skeleton */}
			<section className='relative flex flex-col justify-center items-center w-full min-h-screen'>
				{/* Icon skeleton */}
				<Skeleton className='w-16 h-16 rounded-xl' />

				{/* Heading */}
				<div className='mt-6 space-y-3 text-center'>
					<Skeleton className='h-12 w-80 mx-auto rounded-lg' />
					<Skeleton className='h-12 w-64 mx-auto rounded-lg' />
				</div>

				{/* Subheading */}
				<div className='mt-6 space-y-2 w-full max-w-2xl px-4'>
					<Skeleton className='h-5 w-full mx-auto rounded' />
					<Skeleton className='h-5 w-5/6 mx-auto rounded' />
				</div>

				{/* CTA button */}
				<Skeleton className='mt-10 h-11 w-56 rounded-full' />
			</section>

			{/* Facilities section skeleton */}
			<section className='bg-secondary/40 py-24'>
				<div className='flex flex-col items-center gap-16 mx-auto container'>
					<div className='text-center space-y-3'>
						<Skeleton className='w-10 h-10 rounded-xl mx-auto' />
						<Skeleton className='h-8 w-96 mx-auto rounded-lg' />
					</div>

					<div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 w-full'>
						{[...Array(4)].map((_, i) => (
							<div
								key={i}
								className='rounded-2xl overflow-hidden'
								style={{ backgroundColor: '#f0f0f0' }}
							>
								<div className='aspect-[3/4]' />
								<div className='p-4 space-y-2'>
									<Skeleton className='h-5 w-3/4 rounded' />
									<Skeleton className='h-4 w-1/2 rounded' />
								</div>
							</div>
						))}
					</div>
				</div>
			</section>

			{/* Pricing section skeleton */}
			<section className='py-24'>
				<div className='flex flex-col items-center gap-8 mx-auto container'>
					<div className='text-center space-y-3'>
						<Skeleton className='h-8 w-64 mx-auto rounded-lg' />
						<Skeleton className='h-5 w-96 mx-auto rounded' />
					</div>

					<div className='flex flex-col sm:flex-row gap-6 w-full max-w-4xl px-4'>
						{[...Array(2)].map((_, i) => (
							<div
								key={i}
								className='flex-1 rounded-2xl p-6 space-y-4'
								style={{ backgroundColor: '#f0f0f0' }}
							>
								<Skeleton className='h-8 w-24 mx-auto rounded-full' />
								<Skeleton className='h-4 w-16 mx-auto rounded' />
								<Skeleton className='h-12 w-40 mx-auto rounded' />
								<div className='border-t border-black/10 pt-4 space-y-3'>
									<Skeleton className='h-4 w-full rounded' />
									<Skeleton className='h-4 w-full rounded' />
									<Skeleton className='h-4 w-4/5 rounded' />
								</div>
								<Skeleton className='h-10 w-full rounded-lg' />
							</div>
						))}
					</div>
				</div>
			</section>
		</div>
	);
}
