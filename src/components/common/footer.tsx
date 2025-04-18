import Image from 'next/image';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
const Footer = () => {
	return (
		<>
			{/* 🔹 Our Location Section */}
			<div className='bg-secondary py-24 text-center'>
				<h2 className='font-semibold text-secondary-foreground text-4xl'>
					Our Location
				</h2>
				<p className='mt-2 text-secondary-foreground'>
					Find us and reconnect with nature.
				</p>

				{/* Map Section */}
				<div className='relative mx-auto mt-16 w-full max-w-5xl'>
					<Image
						src='/assets/map-indonesia.png'
						alt='Indonesia Map'
						width={800}
						height={450}
						className='w-full object-contain'
					/>
					{/* Location Marker */}
					<TooltipProvider delayDuration={0}>
						<Tooltip>
							<TooltipTrigger asChild>
								<div className='group top-[71%] left-[24%] absolute flex flex-col items-center transition-all duration-300 cursor-pointer'>
									<div className='bg-primary rounded-full w-4 h-4 animate-ping'></div>
									<div className='bg-primary mt-[-15px] rounded-full w-4 h-4'></div>
								</div>
							</TooltipTrigger>
							<TooltipContent
								showArrow={true}
								className='bg-primary text-primary-foreground text-center'
							>
								{/* Location Info Card */}
								<p className='font-semibold'>Bogor, IND</p>
								<p className='text-sm'>
									Curug Cibogo, Cibeureum, Kec. Cisarua, <br />
									Kabupaten Bogor, Jawa Barat 16750
								</p>
							</TooltipContent>
						</Tooltip>
					</TooltipProvider>
				</div>

				{/* Contact Section */}
				<div className='flex justify-center items-center mx-auto mt-20 mb-20 px-28 pt-6 border-primary border-t-4 w-full max-w-screen-xl'>
					<div className='w-1/2 text-center'>
						<h3 className='mt-6 font-semibold text-secondary-foreground text-xl'>
							Email
						</h3>
						<p className='mt-2 text-secondary-foreground'>hello@levicamp.com</p>
					</div>
					<div className='w-1/2 text-center'>
						<h3 className='mt-6 font-semibold text-secondary-foreground text-xl'>
							WhatsApp
						</h3>
						<p className='mt-2 text-secondary-foreground'>+62 858 8515 9279</p>
					</div>
				</div>
			</div>

			{/* 🔹 Footer Utama */}
			<footer className='bg-secondary px-32 py-12'>
				<div className='flex flex-col items-center mx-auto px-6 text-center container'>
					{/* Top Footer Section */}
					<div className='flex md:flex-row flex-col justify-between items-center pb-6 border-primary border-b w-full'>
						<div className='flex flex-col items-center md:items-start mb-8'>
							<div className='flex items-center gap-2 pb-5'>
								<Image
									src='https://assets.levicamp.id/assets/logo/levicamp-logo-orange.png'
									alt='Levi Camp'
									width={150}
									height={100}
								/>
							</div>
							<nav className='flex gap-8 mt-2 font-regular text-secondary-foreground'>
								<Link href='/facilities'>Facilities</Link>
								<Link href='/article'>Article</Link>
								<Link href='/catalog'>Catalog</Link>
								<Link href='/reservation'>Reservation</Link>
								<Link href='/contact'>Contact Us</Link>
							</nav>
						</div>

						{/* Subscribe Section */}
						<div className='flex flex-col items-center md:items-start mt-6 md:mt-0 mb-8'>
							<p className='mb-2 font-medium text-secondary-foreground'>
								Stay up to date
							</p>
							<div className='flex gap-4'>
								<Input type='email' placeholder='Enter your email' />
								<Button>Subscribe</Button>
							</div>
						</div>
					</div>

					{/* Copyright */}
					<div className='flex md:flex-row flex-col justify-between items-center mt-8 w-full text-secondary-foreground'>
						<p>© 2025 Levi Camp. All rights reserved.</p>
						<div className='flex gap-6'>
							<Link href='/terms'>Terms</Link>
							<Link href='/privacy'>Privacy</Link>
							<Link href='/cookies'>Cookies</Link>
						</div>
					</div>
				</div>
			</footer>
		</>
	);
};

export default Footer;
