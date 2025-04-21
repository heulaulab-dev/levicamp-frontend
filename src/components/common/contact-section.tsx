import Link from 'next/link';

export default function ContactSection() {
	return (
		<div className='flex flex-row justify-center items-center gap-4 bg-secondary py-10 border-primary border-t-2 text-center'>
			<div className='flex md:flex-row flex-col justify-center items-center gap-10 space-x-10'>
				<div className='text-center'>
					<h3 className='mt-6 font-semibold text-secondary-foreground text-lg md:text-xl'>
						Email
					</h3>
					<p className='text-secondary-foreground'>
						Our friendly team is here to help.
					</p>
					<Link
						href='mailto:hello@levicamp.com'
						className='font-semibold text-secondary-foreground hover:text-primary text-sm md:text-lg transition-colors duration-300'
					>
						hello@levicamp.com
					</Link>
				</div>
				<div className='text-center'>
					<h3 className='mt-6 font-semibold text-secondary-foreground text-lg md:text-xl'>
						WhatsApp
					</h3>
					<p className='text-secondary-foreground'>Mon-Fri from 8am to 5pm.</p>
					<Link
						href='https://wa.me/6285885159279'
						className='font-semibold text-secondary-foreground hover:text-primary text-sm md:text-lg transition-colors duration-300'
					>
						+62 858 8515 9279
					</Link>
				</div>
			</div>
		</div>
	);
}
