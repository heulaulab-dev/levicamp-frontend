'use client';

import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';

import FacilitiesCard from '@/components/ui/facilities-card';
import { Button } from '@/components/ui/button';
import { useReducedMotion } from '@/hooks/use-reduced-motion';
import { ListFacilities } from '@/constants/facilities/list-facilities';
import { reduceMotion, slideUpVariants } from '@/lib/motion-variants';

export default function FacilitiesSection() {
	const [activeIndex, setActiveIndex] = useState(0);
	const controls = useAnimation();
	const sectionRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const shouldReduce = useReducedMotion();

	const totalCards = ListFacilities.length;
	const cardWidth = 449;
	const cardGap = 6;
	const cardWithGapWidth = cardWidth + cardGap;

	useEffect(() => {
		const handleResize = () => {
			if (containerRef.current) {
				setContainerWidth(containerRef.current.clientWidth);
			}
		};
		handleResize();
		window.addEventListener('resize', handleResize);
		return () => window.removeEventListener('resize', handleResize);
	}, []);

	const visibleCards = Math.floor(containerWidth / cardWithGapWidth) || 1;
	const maxScrollIndex = Math.max(0, totalCards - visibleCards);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => setIsVisible(entry.isIntersecting),
			{ threshold: 0.2 },
		);
		if (sectionRef.current) observer.observe(sectionRef.current);
		return () => {
			if (sectionRef.current) observer.unobserve(sectionRef.current);
		};
	}, []);

	useEffect(() => {
		if (shouldReduce) return;
		void controls.start({
			x: -activeIndex * cardWithGapWidth,
			transition: { duration: 0.5, ease: 'easeOut' },
		});
	}, [activeIndex, controls, cardWithGapWidth, shouldReduce]);

	const handlePrev = () => setActiveIndex((p) => Math.max(p - 1, 0));
	const handleNext = () => setActiveIndex((p) => Math.min(p + 1, maxScrollIndex));

	return (
		<>
			<section ref={sectionRef} className='bg-secondary/40 py-24 min-h-screen'>
				<div className='flex flex-col mx-auto container'>
					<motion.div
						className='flex flex-col justify-center items-center gap-4 my-24'
						initial='hidden'
						animate={isVisible ? 'visible' : 'hidden'}
						variants={reduceMotion(slideUpVariants, shouldReduce)}
					>
						<Image
							src='/assets/icons/camp-icon.png'
							alt='Tent Icon'
							width={70}
							height={70}
							loading='lazy'
						/>
						<h1 className='inline-block z-10 relative bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-2xl font-semibold text-transparent text-2xl sm:text-4xl md:text-6xl leading-tight'>
							Your Campsite is Waiting. No Setup, No Stress.
						</h1>
					</motion.div>

					<div className='flex flex-row justify-between items-center mb-8'>
						<div className='flex items-center gap-2 bg-secondary p-4 rounded-full font-semibold text-secondary-foreground'>
							<Bookmark className='w-5 h-5 text-current' />
							Our Facilities
						</div>

						<div className='flex justify-center gap-2 bg-secondary/50 p-1 rounded-full'>
							<Button
								onClick={handlePrev}
								size='icon'
								variant='ghost'
								className='rounded-full'
								disabled={activeIndex === 0}
								aria-label='Previous facility'
							>
								<ChevronLeft className='w-5 h-5 text-secondary-foreground' />
							</Button>
							<Button
								onClick={handleNext}
								size='icon'
								variant='ghost'
								className='rounded-full'
								disabled={activeIndex >= maxScrollIndex}
								aria-label='Next facility'
							>
								<ChevronRight className='w-5 h-5 text-secondary-foreground' />
							</Button>
						</div>
					</div>

					<div ref={containerRef} className='relative pb-12'>
						<motion.div
							animate={shouldReduce ? { x: 0 } : controls}
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
									className='flex-shrink-0 w-[449px]'
									initial='hidden'
									whileInView='visible'
									viewport={{ once: true, margin: '-100px' }}
									variants={reduceMotion(slideUpVariants, shouldReduce)}
								>
									<FacilitiesCard {...facility} />
								</motion.div>
							))}
						</motion.div>
					</div>
				</div>
			</section>
		</>
	);
}
