'use client';

import { useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import Image from 'next/image';
import { useRef, useState } from 'react';

import FacilitiesCard from '@/components/ui/facilities-card';
import { Bookmark, ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { ListFacilities } from '@/constants/facilities/list-facilities';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { slideUpVariants } from '@/lib/motion-variants';

export default function FacilitiesSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [scrollIndex, setScrollIndex] = useState(0);
	const controls = useAnimation();
	const shouldReduce = useReducedMotion();

	useEffect(() => {
		if (shouldReduce) return;
		controls.start({
			x: -scrollIndex,
			transition: { duration: 0.5, ease: 'easeOut' },
		});
	}, [scrollIndex, controls, shouldReduce]);

	const handlePrev = () => setScrollIndex((prev) => Math.max(prev - 1, 0));
	const handleNext = () =>
		setScrollIndex((prev) => Math.min(prev + 1, ListFacilities.length - 1));

	return (
		<section
			ref={sectionRef}
			className='relative flex flex-col items-center mb-24 pt-24 text-secondary text-center'
		>
			<Image src='/assets/icons/camp-icon.png' alt='Tent Icon' width={70} height={70} />

			<h2 className='mt-4 mb-16 font-semibold text-text-secondary text-4xl sm:text-6xl'>
				Your Campsite is Waiting. No Setup, No Stress.
			</h2>

			<div className='relative pl-0 sm:pl-28 w-full'>
				<div className='flex justify-between items-center mb-3 w-full px-4 sm:px-0'>
					<div className='flex items-center gap-2 bg-secondary shadow-sm mb-12 px-4 py-2.5 border rounded-lg text-secondary-foreground'>
						<Bookmark className='w-5 h-5 text-current' />
						Our Facilities
					</div>

					<div className='flex gap-4 mr-0 sm:mr-28 mb-12'>
						<button
							onClick={handlePrev}
							aria-label='Previous facility'
							className='flex justify-center items-center bg-secondary hover:bg-secondary-hover rounded-full size-10 sm:size-12 transition'
						>
							<ArrowLeft className='p-1 w-7 h-7 text-secondary-foreground group-hover:text-brand' />
						</button>
						<button
							onClick={handleNext}
							aria-label='Next facility'
							className='flex justify-center items-center bg-secondary hover:bg-secondary-hover rounded-full size-10 sm:size-12 transition'
						>
							<ArrowRight className='p-1 w-7 h-7 text-secondary-foreground group-hover:text-brand' />
						</button>
					</div>
				</div>

				<div className='relative overflow-x-auto snap-x snap-mandatory -mx-4 px-4 sm:mx-0 sm:px-0'>
					<motion.div
						animate={
							shouldReduce
								? { x: 0 }
								: { x: -scrollIndex }
						}
						transition={
							shouldReduce
								? { duration: 0 }
								: { duration: 0.5, ease: 'easeOut' }
						}
						className='flex gap-6'
					>
						{ListFacilities.map((facility, index) => (
							<motion.div
								key={index}
								className='flex-shrink-0 w-[calc(100vw-2rem)] sm:w-[28rem] snap-center'
								initial='hidden'
								animate='visible'
								variants={slideUpVariants}
							>
								<FacilitiesCard {...facility} />
							</motion.div>
						))}

						<motion.div
							className='group flex flex-col flex-shrink-0 justify-between bg-secondary hover:bg-secondary-hover shadow-lg p-6 rounded-2xl w-[calc(100vw-2rem)] sm:w-[28rem] aspect-[3/4] text-secondary-foreground text-start snap-center'
							initial='hidden'
							animate='visible'
							variants={slideUpVariants}
						>
							<div>
								<h3 className='font-semibold text-4xl italic leading-snug'>
									Find Out More !
								</h3>
							</div>

							<div className='flex justify-between items-center'>
								<p className='text-lg leading-relaxed'>
									And see what&apos;s waiting <br /> for you
								</p>
								<div className='flex justify-center items-center bg-secondary group-hover:bg-secondary-hover rounded-full size-14 sm:size-[4.5rem] aspect-square'>
									<ArrowUpRight className='w-8 h-8 text-secondary-foreground' />
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
