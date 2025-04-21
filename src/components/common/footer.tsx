import Image from 'next/image';
import Link from 'next/link';

import { Separator } from '@/components/ui/separator';

import { NewsletterSection } from './subscribe-action';

export default function FooterDemo() {
	return (
		<footer className='relative bg-secondary px-4 sm:px-8 py-10'>
			{/* Header Section */}
			<div className='flex md:flex-row flex-col justify-between items-center w-full'>
				{/* Logo and Links Section */}
				<div className='flex flex-col gap-5'>
					<Image
						src='https://assets.levicamp.id/assets/logo/levicamp-logo-orange.png'
						alt='Levi Camp'
						width={150}
						height={100}
					/>

					<div className='flex gap-10 text-secondary-foreground'>
						<Link
							href='/reservation'
							className='hover:text-primary transition-colors duration-300'
						>
							Reservation
						</Link>
						<Link
							href='/facilities'
							className='hover:text-primary transition-colors duration-300'
						>
							Facilities
						</Link>
						<Link
							href='/article'
							className='hover:text-primary transition-colors duration-300'
						>
							Article
						</Link>
						<Link
							href='/catalog'
							className='hover:text-primary transition-colors duration-300'
						>
							Catalog
						</Link>
					</div>
				</div>

				{/* Newsletter Section */}

				<NewsletterSection title='Stay up to date' />
			</div>
			<Separator className='my-4' />
			{/* Copyright Section */}
			<div className='flex flex-row justify-between items-center gap-4'>
				<p className='text-sm'>© 2025 Levi Camp. All rights reserved.</p>
				<div className='flex gap-6'>
					<Link
						href='/terms'
						className='hover:text-primary text-sm transition-colors duration-300'
					>
						Terms
					</Link>
					<Link
						href='/privacy'
						className='hover:text-primary text-sm transition-colors duration-300'
					>
						Privacy
					</Link>
					<Link
						href='/cookies'
						className='hover:text-primary text-sm transition-colors duration-300'
					>
						Cookies
					</Link>
				</div>
			</div>
		</footer>
	);
}
