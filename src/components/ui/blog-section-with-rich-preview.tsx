import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';

function Blog() {
	return (
		<div className='py-20 lg:py-40 w-full'>
			<div className='flex flex-col gap-14 mx-auto container'>
				<div className='flex sm:flex-row flex-col sm:justify-between sm:items-center gap-8 w-full'>
					<h4 className='max-w-xl font-regular text-3xl md:text-5xl tracking-tighter'>
						Latest articles
					</h4>
				</div>
				<div className='gap-8 grid grid-cols-1 md:grid-cols-2'>
					<div className='flex flex-col gap-4 md:col-span-2 hover:opacity-75 cursor-pointer'>
						<div className='bg-muted rounded-md aspect-video'></div>
						<div className='flex flex-row items-center gap-4'>
							<Badge>News</Badge>
							<p className='flex flex-row items-center gap-2 text-sm'>
								<span className='text-muted-foreground'>By</span>{' '}
								<Avatar className='w-6 h-6'>
									<AvatarImage src='https://github.com/shadcn.png' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<span>John Johnsen</span>
							</p>
						</div>
						<div className='flex flex-col gap-2'>
							<h3 className='max-w-3xl text-4xl tracking-tight'>
								Pay supplier invoices
							</h3>
							<p className='max-w-3xl text-muted-foreground text-base'>
								Managing a small business today is already tough. Avoid further
								complications by ditching outdated, tedious trade methods. Our
								goal is to streamline SMB trade, making it easier and faster
								than ever.
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-4 hover:opacity-75 cursor-pointer'>
						<div className='bg-muted rounded-md aspect-video'></div>
						<div className='flex flex-row items-center gap-4'>
							<Badge>News</Badge>
							<p className='flex flex-row items-center gap-2 text-sm'>
								<span className='text-muted-foreground'>By</span>{' '}
								<Avatar className='w-6 h-6'>
									<AvatarImage src='https://github.com/shadcn.png' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<span>John Johnsen</span>
							</p>
						</div>
						<div className='flex flex-col gap-1'>
							<h3 className='max-w-3xl text-2xl tracking-tight'>
								Pay supplier invoices
							</h3>
							<p className='max-w-3xl text-muted-foreground text-base'>
								Managing a small business today is already tough. Avoid further
								complications by ditching outdated, tedious trade methods. Our
								goal is to streamline SMB trade, making it easier and faster
								than ever.
							</p>
						</div>
					</div>
					<div className='flex flex-col gap-4 hover:opacity-75 cursor-pointer'>
						<div className='bg-muted rounded-md aspect-video'></div>
						<div className='flex flex-row items-center gap-4'>
							<Badge>News</Badge>
							<p className='flex flex-row items-center gap-2 text-sm'>
								<span className='text-muted-foreground'>By</span>{' '}
								<Avatar className='w-6 h-6'>
									<AvatarImage src='https://github.com/shadcn.png' />
									<AvatarFallback>CN</AvatarFallback>
								</Avatar>
								<span>John Johnsen</span>
							</p>
						</div>
						<div className='flex flex-col gap-1'>
							<h3 className='max-w-3xl text-2xl tracking-tight'>
								Pay supplier invoices
							</h3>
							<p className='max-w-3xl text-muted-foreground text-base'>
								Managing a small business today is already tough. Avoid further
								complications by ditching outdated, tedious trade methods. Our
								goal is to streamline SMB trade, making it easier and faster
								than ever.
							</p>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

export { Blog };
