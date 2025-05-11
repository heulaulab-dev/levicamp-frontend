'use client';

import Link from 'next/link';
import { LayoutGroup, motion } from 'framer-motion';
import { TextRotate } from '@/components/ui/text-rotate';
import Floating, { FloatingElement } from '@/components/ui/parallel-floating';
import FacilitiesList from '@/components/pages/facilities/facilities-list';

const exampleImages = [
	{
		url: '/assets/facilities/atv.jpg',
		author: 'Levicamp',
		title: 'ATV',
	},
	{
		url: '/assets/facilities/tent.jpg',
		author: 'Levicamp',
		title: 'Coffe',
	},
	{
		url: '/assets/facilities/waterfall.jpg',
		author: 'Levicamp',
		title: 'Waterfall',
	},
	{
		url: '/assets/facilities/rabbit.jpg',
		author: 'Levicamp',
		title: 'Rabbit',
	},
	{
		url: '/assets/facilities/tents.jpg',
		author: 'Levicamp',
		title: 'Pos',
	},
];

export default function FacilitiesPage() {
	return (
		<div>
			<section className='relative flex flex-col justify-center items-center w-full h-screen overflow-hidden md:overflow-visible'>
				<Floating sensitivity={-0.5} className='h-full'>
					<FloatingElement
						depth={0.5}
						className='top-[15%] md:top-[25%] left-[2%] md:left-[5%]'
					>
						<motion.img
							src={exampleImages[0].url}
							alt={exampleImages[0].title}
							className='shadow-2xl rounded-xl w-16 sm:w-24 md:w-28 lg:w-32 h-12 sm:h-16 md:h-20 lg:h-24 object-cover -rotate-[3deg] hover:scale-105 transition-transform duration-200 cursor-pointer'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.5 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={1}
						className='top-[0%] md:top-[6%] left-[8%] md:left-[11%]'
					>
						<motion.img
							src={exampleImages[1].url}
							alt={exampleImages[1].title}
							className='shadow-2xl rounded-xl w-40 sm:w-48 md:w-56 lg:w-60 h-28 sm:h-36 md:h-44 lg:h-48 object-cover -rotate-12 hover:scale-105 transition-transform duration-200 cursor-pointer'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.7 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={4}
						className='top-[90%] md:top-[80%] left-[6%] md:left-[8%]'
					>
						<motion.img
							src={exampleImages[2].url}
							alt={exampleImages[2].title}
							className='shadow-2xl rounded-lg w-40 sm:w-48 md:w-60 lg:w-64 h-40 sm:h-48 md:h-60 lg:h-64 object-cover -rotate-[4deg] hover:scale-105 transition-transform duration-200 cursor-pointer'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 0.9 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={2}
						className='top-[0%] md:top-[2%] left-[87%] md:left-[83%]'
					>
						<motion.img
							src={exampleImages[3].url}
							alt={exampleImages[3].title}
							className='shadow-2xl rounded-xl w-40 sm:w-48 md:w-60 lg:w-64 h-36 sm:h-44 md:h-52 lg:h-56 object-cover rotate-[6deg] hover:scale-105 transition-transform duration-200 cursor-pointer'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.1 }}
						/>
					</FloatingElement>

					<FloatingElement
						depth={1}
						className='top-[78%] md:top-[68%] left-[83%] md:left-[83%]'
					>
						<motion.img
							src={exampleImages[4].url}
							alt={exampleImages[4].title}
							className='shadow-2xl rounded-xl w-44 sm:w-64 md:w-72 lg:w-80 h-44 sm:h-64 md:h-72 lg:h-80 object-cover rotate-[19deg] hover:scale-105 transition-transform duration-200 cursor-pointer'
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ delay: 1.3 }}
						/>
					</FloatingElement>
				</Floating>

				<div className='z-50 flex flex-col justify-center items-center w-[250px] sm:w-[300px] md:w-[500px] lg:w-[700px] pointer-events-auto'>
					<motion.h1
						className='flex flex-col justify-center items-center space-y-1 md:space-y-4 w-full font-calendas text-3xl sm:text-5xl md:text-7xl lg:text-8xl text-center leading-tight tracking-tight whitespace-pre'
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.2, ease: 'easeOut', delay: 0.3 }}
					>
						<span>Discover </span>
						<LayoutGroup>
							<motion.span layout className='flex whitespace-pre'>
								<motion.span
									layout
									className='flex whitespace-pre'
									transition={{ type: 'spring', damping: 30, stiffness: 400 }}
								>
									Our{' '}
								</motion.span>
								<TextRotate
									texts={[
										'Facilities',
										'Amenities',
										'Services',
										'Experiences',
										'Photo spot 📸',
										'Healing area 💆',
										'Real offline',
										'Camp goals 💯',
										'Soft life ☁️',
									]}
									mainClassName='overflow-hidden pr-3 text-primary py-0 pb-2 md:pb-4 rounded-xl'
									staggerDuration={0.03}
									staggerFrom='last'
									rotationInterval={3000}
									transition={{ type: 'spring', damping: 30, stiffness: 400 }}
								/>
							</motion.span>
						</LayoutGroup>
					</motion.h1>
					<motion.p
						className='pt-4 sm:pt-8 md:pt-10 lg:pt-12 text-sm sm:text-lg md:text-xl lg:text-2xl text-center'
						animate={{ opacity: 1, y: 0 }}
						initial={{ opacity: 0, y: 20 }}
						transition={{ duration: 0.2, ease: 'easeOut', delay: 0.5 }}
					>
						Enjoy spacious tent areas, cozy cabins, clean restrooms, hot
						showers, and convenient charging stations. Everything you need for a
						perfect camping experience is right here!
					</motion.p>

					<div className='flex flex-row justify-center items-center space-x-4 mt-10 sm:mt-16 md:mt-20 lg:mt-20 text-xs'>
						<motion.button
							className='z-20 bg-primary shadow-2xl px-4 sm:px-5 md:px-6 lg:px-8 py-2 sm:py-2.5 md:py-3 lg:py-3 rounded-full font-semibold text-background sm:text-base md:text-lg lg:text-xl tracking-tight'
							animate={{ opacity: 1, y: 0 }}
							initial={{ opacity: 0, y: 20 }}
							transition={{
								duration: 0.2,
								ease: 'easeOut',
								delay: 0.7,
								scale: { duration: 0.2 },
							}}
							whileHover={{
								scale: 1.05,
								transition: { type: 'spring', damping: 30, stiffness: 400 },
							}}
						>
							<Link href='/reservation'>
								Book Your Tent Now<span className='ml-1 font-serif'>→</span>
							</Link>
						</motion.button>
					</div>
				</div>
			</section>
			<FacilitiesList />
		</div>
	);
}
