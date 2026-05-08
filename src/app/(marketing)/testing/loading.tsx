import { Skeleton } from '@/components/ui/skeleton';

export default function TestingLoading() {
	return (
		<div className='relative bg-[#f5f3ff] my-24 px-6 py-10'>
			<div className='flex gap-6 overflow-x-auto pb-4'>
				{[...Array(4)].map((_, i) => (
					<div
						key={i}
						className='flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[28rem] rounded-2xl overflow-hidden'
					>
						<Skeleton className='w-full aspect-[3/4] rounded-none' />
					</div>
				))}
			</div>
		</div>
	);
}
