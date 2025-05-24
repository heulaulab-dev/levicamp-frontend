'use client';

import { Button } from '@/components/ui/button';
import { Bookmark, ChevronLeft, ChevronRight } from 'lucide-react';
import Image from 'next/image';
import { ListFacilities } from '@/constants/facilities/list-facilities';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import FacilitiesCard from '@/components/ui/facilities-card';

export default function FacilitiesSection() {
	const [activeIndex, setActiveIndex] = useState(0);
	const controls = useAnimation();
	const sectionRef = useRef<HTMLDivElement>(null);
	const containerRef = useRef<HTMLDivElement>(null);
	const [containerWidth, setContainerWidth] = useState(0);
	const [isVisible, setIsVisible] = useState(false);
	const totalCards = ListFacilities.length;

	// Constants for card sizing
	const cardWidth = 449; // Width of the actual card
	const cardGap = 6; // Gap between cards
	const cardWithGapWidth = cardWidth + cardGap; // Total width including gap

	// Calculate max scroll position - using container width to determine exact fit
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

	// Calculate how many cards fit in the container and the max scroll index
	const visibleCards = Math.floor(containerWidth / cardWithGapWidth) || 1;
	const maxScrollIndex = Math.max(0, totalCards - visibleCards);

	// Simple intersection observer to detect when section is in view
	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsVisible(entry.isIntersecting);
			},
			{ threshold: 0.2 },
		);

		if (sectionRef.current) {
			observer.observe(sectionRef.current);
		}

		return () => {
			if (sectionRef.current) {
				observer.unobserve(sectionRef.current);
			}
		};
	}, []);

	// Animate cards when changing active index
	useEffect(() => {
		controls.start({
			x: -activeIndex * cardWithGapWidth,
			transition: { duration: 0.5, ease: 'easeOut' },
		});
	}, [activeIndex, controls, cardWithGapWidth]);

	// Navigation handlers with improved boundary handling
	const handlePrev = () => {
		setActiveIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleNext = () => {
		setActiveIndex((prev) => Math.min(prev + 1, maxScrollIndex));
	};

	return (
		<section ref={sectionRef} className='bg-secondary/40 py-24 min-h-screen'>
			<div className='flex flex-col mx-auto container'>
				{/* Header */}
				<motion.div
					className='flex flex-col justify-center items-center gap-4 my-24'
					initial={{ opacity: 0, y: 40 }}
					animate={isVisible ? { opacity: 1, y: 0 } : { opacity: 0, y: 40 }}
					transition={{ duration: 0.8 }}
				>
					<Image
						src='/assets/icons/camp-icon.png'
						alt='Tent Icon'
						width={70}
						height={70}
						loading='lazy'
					/>
					<h1 className='inline-block z-10 relative bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-2xl font-semibold text-transparent text-2xl sm:text-4xl md:text-6xl leading-tight sm:leading-tight md:leading-tight'>
						Your Campsite is Waiting. No Setup, No Stress.
					</h1>
				</motion.div>

				{/* Facilities navigation header */}
				<div className='flex flex-row justify-between items-center mb-8'>
					<div className='flex items-center gap-2 bg-secondary p-4 rounded-full font-semibold text-secondary-foreground'>
						<Bookmark className='w-5 h-5 text-current' />
						Our Facilities
					</div>

					<div className='flex justify-center gap-2 bg-secondary/50 p-1 rounded-full'>
						<Button
							onClick={handlePrev}
							size={'icon'}
							className='bg-secondary p-2 rounded-full transition-all duration-300'
							disabled={activeIndex === 0}
						>
							<ChevronLeft className='text-secondary-foreground' />
						</Button>
						<Button
							onClick={handleNext}
							size={'icon'}
							className='bg-secondary p-2 rounded-full transition-all duration-300'
							disabled={activeIndex >= maxScrollIndex}
						>
							<ChevronRight className='text-secondary-foreground' />
						</Button>
					</div>
				</div>

				{/* Facilities cards carousel */}
				<div ref={containerRef} className='relative pb-12'>
					<motion.div animate={controls} className='flex gap-6'>
						{ListFacilities.map((facility, index) => (
							<motion.div
								key={index}
								className='flex-shrink-0 w-[449px]'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1, duration: 0.5 }}
							>
								<FacilitiesCard {...facility} />
							</motion.div>
						))}
					</motion.div>
				</div>
			</div>
		</section>
	);
}
