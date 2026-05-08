'use client';

import { AnimatePresence, motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { memo, useCallback, useState } from 'react';
import Marquee from 'react-fast-marquee';

import heroBgStatic from '../../../../public/hero-bg.jpg';

import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import {
	fadeInVariants,
	reduceMotion,
	slideUpVariants,
} from '@/lib/motion-variants';

interface MarqueeRowProps {
	direction: 'left' | 'right';
	images: Array<unknown>;
}

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
	const shouldReduce = useReducedMotion();

	const handleVideoEnd = useCallback(() => setVideoEnded(true), []);

	const imageArray = [...Array(10)];

	return (
		<section className='relative flex md:flex-row flex-col justify-between items-center bg-cover bg-center mt-[80px] px-6 md:px-12 w-full min-h-screen overflow-hidden'>
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
						variants={reduceMotion(fadeInVariants, shouldReduce)}
						initial='hidden'
						animate='visible'
						exit='hidden'
						style={{ willChange: 'opacity' }}
					/>
				)}

				{videoEnded && (
					<motion.div
						key='image-container'
						className='top-0 left-0 absolute w-full h-full'
						variants={reduceMotion(fadeInVariants, shouldReduce)}
						initial='hidden'
						animate='visible'
						exit='hidden'
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

			<div className='z-[1] absolute inset-0 bg-black/60 backdrop-blur-sm' />
			<div className='z-[2] absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-secondary/40' />

			<motion.div
				className='z-[2] relative flex flex-col justify-center items-center md:items-start mx-auto md:mx-0 md:w-1/2 max-w-3xl min-h-screen md:text-left text-center'
				variants={reduceMotion(slideUpVariants, shouldReduce)}
				initial='hidden'
				animate='visible'
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

			{videoEnded && (
				<motion.div
					className='hidden z-[2] relative md:flex justify-center items-center w-full md:w-1/2 h-96'
					variants={reduceMotion(slideUpVariants, shouldReduce)}
					initial='hidden'
					animate='visible'
					style={{ willChange: 'opacity, transform' }}
				>
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
