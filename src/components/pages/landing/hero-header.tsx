import Marquee from 'react-fast-marquee';
import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

const Hero = () => {
	return (
		<section
			className='relative flex md:flex-row flex-col justify-between items-center bg-cover bg-center mt-[80px] px-6 md:px-12 w-full min-h-screen overflow-hidden'
			style={{ backgroundImage: "url('/bg.png')" }}
		>
			<div className='z-10 relative ml-12 max-w-3xl md:text-left text-center'>
				<div className='flex justify-center md:justify-start items-center gap-2'>
					<Image
						src='/assets/icons/camp-icon.png'
						alt='Tent Icon'
						width={70}
						height={70}
					/>
				</div>

				<h1 className='mt-6 font-bold text-primary text-4xl md:text-6xl leading-tight'>
					Your Perfect Nature <br /> Glamping Experience
				</h1>

				<p className='mt-6 text-primary text-xl'>
					Reconnect with nature without the hassle of planning. We take care of
					everything for you. Just pick a date, book your tent, and enjoy the
					great outdoors.
				</p>

				<Button
					asChild
					className='mt-6 px-7 py-4 rounded-lg w-56 h-14 font-semibold text-md text-primary-foreground transition'
				>
					<Link href='/reservation'>Book Your Tent Now!</Link>
				</Button>
			</div>

			{/* Marquee Container */}
			<div className='z-10 relative flex justify-center items-center w-full md:w-1/2 h-[500px]'>
				{/* Marquee Pertama */}
				<div
					className='absolute'
					style={{
						right: '-450px',
						top: '0px',
						height: '100%',
						transform: 'rotate(-65deg)',
					}}
				>
					<Marquee speed={40} direction='left'>
						{[...Array(10)].map((_, index) => (
							<Image
								key={index}
								src='/camp-image.png'
								alt='Camping Site'
								width={180}
								height={120}
								style={{ marginRight: '44px' }}
							/>
						))}
					</Marquee>
				</div>

				{/* Marquee Kedua */}
				<div
					className='absolute'
					style={{
						right: '-600px',
						top: '400px',
						transform: 'rotate(-65deg)',
					}}
				>
					<Marquee
						speed={40}
						direction='right'
						gradient={true}
						className='flex gap-11'
					>
						{[...Array(10)].map((_, index) => (
							<Image
								key={index}
								src='/camp-image.png'
								alt='Camping Site'
								width={180}
								height={120}
								style={{ marginRight: '44px' }}
							/>
						))}
					</Marquee>
				</div>
			</div>
		</section>
	);
};

export default Hero;
