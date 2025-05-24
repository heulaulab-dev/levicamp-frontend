'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import Marquee from 'react-fast-marquee';
// Add static import for hero background
import heroBgStatic from '../../../../public/hero-bg.jpg';

import { Button } from '@/components/ui/button';

// Define props interface for MarqueeRow
interface MarqueeRowProps {
	direction: 'left' | 'right';
	images: Array<unknown>;
}

// Memoize the marquee components to prevent unnecessary rerenders
const MarqueeRow = memo(({ direction, images }: MarqueeRowProps) => (
	<Marquee speed={30} direction={direction}>
		{images.map((_, index: number) => (
			<Image
				key={index}
				src='/camp-image.png'
				alt='Camping Site'
				loading='lazy'
				width={180}
				height={120}
				style={{ marginRight: direction === 'left' ? '20px' : '44px' }}
			/>
		))}
	</Marquee>
));
MarqueeRow.displayName = 'MarqueeRow';

export default function HeroSection() {
	const [videoEnded, setVideoEnded] = useState(false);

	// Use callback to prevent recreation on each render
	const handleVideoEnd = useCallback(() => setVideoEnded(true), []);

	// Prepare the image array just once
	const imageArray = [...Array(10)];

	return (
		<section className='relative flex md:flex-row flex-col justify-between items-center bg-cover bg-center mt-[80px] px-6 md:px-12 w-full min-h-screen overflow-hidden'>
			{/* Video or fallback image - simplified animation */}
			<AnimatePresence mode='wait'>
				{!videoEnded && (
					<motion.video
						key='video'
						className='top-0 left-0 absolute w-full h-full object-cover'
						src='https://assets.levicamp.id/assets/video/levicamp-landscape-drone-view.mp4'
						autoPlay
						loop={false}
						muted
						playsInline
						onEnded={handleVideoEnd}
						initial={{ opacity: 0.9 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0, transition: { duration: 0.5 } }}
						style={{ willChange: 'opacity' }}
					/>
				)}

				{videoEnded && (
					<motion.div
						key='image-container'
						className='top-0 left-0 absolute w-full h-full'
						initial={{ opacity: 0 }}
						animate={{ opacity: 1, transition: { duration: 0.1 } }}
						style={{ willChange: 'opacity' }}
					>
						<Image
							src={heroBgStatic}
							alt='Hero background'
							className='w-full h-full object-cover'
							fill
							placeholder='blur'
							loading='lazy'
							sizes='100vw'
						/>
					</motion.div>
				)}
			</AnimatePresence>

			{/* Overlay */}
			<div className='z-[1] absolute inset-0 bg-black/60 backdrop-blur-sm' />

			{/* Updated gradient that transitions to bg-secondary/40 at the bottom */}
			<div className='z-[2] absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/40' />

			{/* Text */}
			<motion.div
				className='z-[2] relative flex flex-col justify-center items-center md:items-start mx-auto md:mx-0 md:w-1/2 max-w-3xl min-h-screen md:text-left text-center'
				initial={{ opacity: 0, y: 20 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.8, delay: 0.5 }}
				// Add will-change to optimize animation
				style={{ willChange: 'opacity, transform' }}
			>
				<div className='flex justify-center md:justify-start items-center gap-2'>
					<Image
						src='/assets/icons/camp-icon.png'
						alt='Tent Icon'
						priority
						width={70}
						height={70}
					/>
				</div>

				<h1 className='mt-6 font-bold text-primary text-4xl md:text-6xl leading-tight'>
					Your Perfect Nature <br /> Glamping Experience
				</h1>

				<p className='mt-6 text-primary-foreground text-xl'>
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
			</motion.div>

			{/* Marquee Container - optimized with memoization */}
			{videoEnded && (
				<motion.div
					className='hidden z-[2] relative md:flex justify-center items-center w-full md:w-1/2 h-96'
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.8, delay: 0.6 }}
					// Add will-change to optimize animation
					style={{ willChange: 'opacity, transform' }}
				>
					{/* First Marquee */}
					<div
						className='absolute'
						style={{
							right: '-400px',
							top: '0px',
							height: '100%',
							transform: 'rotate(-65deg)',
						}}
					>
						<MarqueeRow direction='left' images={imageArray} />
					</div>

					{/* Second Marquee */}
					<div
						className='absolute'
						style={{
							right: '-600px',
							top: '400px',
							transform: 'rotate(-65deg)',
						}}
					>
						<MarqueeRow direction='right' images={imageArray} />
					</div>
				</motion.div>
			)}
		</section>
	);
}