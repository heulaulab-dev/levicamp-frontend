/* eslint-disable @typescript-eslint/no-unused-vars */
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ArrowUpRight, Bookmark } from 'lucide-react';
import Image from 'next/image';
import { ListFacilities } from '@/constants/facilities/list-facilities';
import { useEffect, useState, useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';
import FacilitiesCard from '@/components/ui/facilities-card';

export default function FacilitesDemo() {
	const [scrollIndex, setScrollIndex] = useState(0);
	const controls = useAnimation();
	const sectionRef = useRef<HTMLDivElement>(null);
	const [isInView, setIsInView] = useState(false);
	const [isFullyScrolled, setIsFullyScrolled] = useState(false);
	const totalCards = ListFacilities.length + 1; // +1 for "Find Out More" card
	const lastScrollPosition = useRef(0);

	useEffect(() => {
		const observer = new IntersectionObserver(
			([entry]) => {
				setIsInView(entry.isIntersecting);
			},
			{ threshold: 0.3 },
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

	useEffect(() => {
		controls.start({
			x: -scrollIndex * 460,
			transition: { duration: 1, ease: 'easeOut' },
		});

		// Set fully scrolled when we've reached the end
		if (scrollIndex >= totalCards - 1) {
			setIsFullyScrolled(true);
		} else {
			setIsFullyScrolled(false);
		}
	}, [scrollIndex, controls, totalCards]);

	useEffect(() => {
		const handleWheel = (e: WheelEvent) => {
			if (!isInView) return;

			// Detect scroll direction
			const isScrollingDown = e.deltaY > 0;

			// Re-enable horizontal scroll if scrolling up from fully scrolled state
			if (!isScrollingDown && isFullyScrolled) {
				e.preventDefault();
				setIsFullyScrolled(false);
				setScrollIndex(totalCards - 2); // Go back to the second-to-last card
				return;
			}

			// Handle normal horizontal scroll
			if (
				(isInView && !isFullyScrolled) ||
				(!isScrollingDown && scrollIndex > 0)
			) {
				e.preventDefault();

				if (isScrollingDown) {
					// Scrolling down - move to next card
					setScrollIndex((prev) => Math.min(prev + 1, totalCards - 1));
				} else {
					// Scrolling up - move to previous card
					setScrollIndex((prev) => Math.max(prev - 1, 0));
				}
			}

			lastScrollPosition.current = window.scrollY;
		};

		window.addEventListener('wheel', handleWheel, { passive: false });

		return () => {
			window.removeEventListener('wheel', handleWheel);
		};
	}, [isInView, isFullyScrolled, scrollIndex, totalCards]);

	const handlePrev = () => {
		// If we were fully scrolled, re-enable horizontal scrolling
		if (isFullyScrolled) {
			setIsFullyScrolled(false);
		}
		setScrollIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleNext = () => {
		setScrollIndex((prev) => Math.min(prev + 1, totalCards - 1));
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 40 },
		show: {
			opacity: 1,
			y: 0,
			transition: { delay: 0.3, duration: 0.8, ease: 'easeOut' },
		},
	};

	return (
		<section ref={sectionRef} className='my-24 h-min-screen'>
			<div className='flex flex-col mx-auto container'>
				{/* Header */}
				<motion.div
					className='flex flex-col justify-center items-center gap-4 my-24'
					variants={itemVariants}
				>
					<motion.div
						initial={{ rotate: -10, opacity: 0 }}
						animate={
							isInView ? { rotate: 0, opacity: 1 } : { rotate: -10, opacity: 0 }
						}
						transition={{ duration: 0.6, delay: 0.1 }}
					>
						<Image
							src='/assets/icons/camp-icon.png'
							alt='Tent Icon'
							width={70}
							height={70}
							loading='lazy'
						/>
					</motion.div>
					<motion.h1
						className='inline-block z-10 relative bg-clip-text bg-gradient-to-r from-primary to-secondary drop-shadow-2xl font-semibold text-transparent text-2xl sm:text-4xl md:text-6xl leading-tight sm:leading-tight md:leading-tight'
						initial={{ opacity: 0, y: 30 }}
						animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
						transition={{ duration: 0.8, delay: 0.3 }}
					>
						Your Campsite is Waiting. No Setup, No Stress.
					</motion.h1>
				</motion.div>

				{/* Facilities */}
				<div className='flex flex-row justify-between items-center mb-8'>
					<div className='flex items-center gap-2 bg-secondary shadow-sm p-4 border rounded-lg font-semibold text-secondary-foreground'>
						<Bookmark className='w-5 h-5 text-current' />
						Our Facilities
					</div>

					<div className='flex justify-center gap-4'>
						<Button
							onClick={handlePrev}
							className='bg-secondary rounded-full transition-all duration-300'
							disabled={scrollIndex === 0}
						>
							<ArrowLeft className='p-1 w-7 h-7 text-secondary-foreground hover:text-primary-foreground' />
						</Button>
						<Button
							onClick={handleNext}
							className='bg-secondary rounded-full transition-all duration-300'
							disabled={scrollIndex === totalCards - 1}
						>
							<ArrowRight className='p-1 w-7 h-7 text-secondary-foreground hover:text-primary-foreground' />
						</Button>
					</div>
				</div>

				{/* Facilities */}
				<div className='relative'>
					<motion.div animate={controls} className='flex gap-6'>
						{ListFacilities.map((facility, index) => (
							<motion.div
								key={index}
								className='flex-shrink-0 w-[449px] snap-center'
								initial={{ opacity: 0, y: 20 }}
								animate={{ opacity: 1, y: 0 }}
								transition={{ delay: index * 0.1 }}
							>
								<FacilitiesCard {...facility} />
							</motion.div>
						))}

						{/* Find Your Tent Card masuk ke dalam barisan */}
						<motion.div
							className='group flex flex-col flex-shrink-0 justify-between bg-secondary hover:bg-secondary-hover shadow-lg p-6 rounded-2xl w-[449px] h-[604px] text-secondary-foreground hover:text-secondary-foreground text-start snap-center'
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: ListFacilities.length * 0.1 }}
						>
							<div>
								<h3 className='font-semibold text-6xl italic leading-snug'>
									Find Out More !
								</h3>
							</div>

							<div className='flex justify-between items-center'>
								<p className='text-xl leading-relaxed'>
									And see what&apos;s waiting <br /> for you
								</p>
								<div className='flex justify-center items-center bg-secondary group-hover:bg-secondary-hover rounded-full w-[72px] h-[72px]'>
									<ArrowUpRight className='w-8 h-8 text-secondary-foreground group-hover:text-secondary-foreground' />
								</div>
							</div>
						</motion.div>
					</motion.div>
				</div>
			</div>
		</section>
	);
}
