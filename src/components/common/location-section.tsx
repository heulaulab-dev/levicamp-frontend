import Image from 'next/image';
import Link from 'next/link';

import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

export default function LocationSection() {
	return (
		<div className='bg-secondary py-24 text-center'>
			<div className='flex flex-col gap-10 mx-auto container'>
				<div className='flex flex-col gap-2'>
					{/* Title Section */}
					<div className='flex flex-col gap-2'>
						<h2 className='font-semibold text-secondary-foreground text-2xl md:text-4xl'>
							Our Location
						</h2>
						<p className='text-secondary-foreground text-lg md:text-xl'>
							Find us and reconnect with nature.
						</p>
					</div>

					{/* Map Section */}
					<div className='relative mx-auto w-full max-w-5xl'>
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
				</div>
				{/* Contact Section */}
				<div className='flex md:flex-row flex-col justify-center items-center gap-10 space-x-10 pt-10 border-primary border-t-4'>
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
						<p className='text-secondary-foreground'>
							Mon-Fri from 8am to 5pm.
						</p>
						<Link
							href='https://wa.me/6285885159279'
							className='font-semibold text-secondary-foreground hover:text-primary text-sm md:text-lg transition-colors duration-300'
						>
							+62 858 8515 9279
						</Link>
					</div>
				</div>
			</div>
		</div>
	);
}
