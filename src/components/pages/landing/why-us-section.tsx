import FacilitiesCard from '@/components/ui/facilities-card';
import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { ArrowLeft, ArrowRight } from 'lucide-react';

const facilities = [
	{
		title:
			'Escape the city, breathe in fresh air, and soak in stunning valley views.',
		imageSrc: '/assets/Toilet.png',
	},
	{
		title:
			'Cozy, spacious tents with comfy beds and everything you need to chill.',
		imageSrc: '/assets/waterfall.png',
	},
	{
		title:
			'Stay fresh & connected with clean restrooms, free Wi-Fi, and breakfast on us.',
		imageSrc: '/assets/wifi.png',
	},
	{
		title:
			'Escape the city, breathe in fresh air, and soak in stunning valley views.',
		imageSrc: '/assets/Toilet.png',
	},
	{
		title:
			'Cozy, spacious tents with comfy beds and everything you need to chill.',
		imageSrc: '/assets/waterfall.png',
	},
	{
		title:
			'Stay fresh & connected with clean restrooms, free Wi-Fi, and breakfast on us.',
		imageSrc: '/assets/wifi.png',
	},
];

const WhyUsSection = () => {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [scrollIndex, setScrollIndex] = useState(0);
	const [canScrollDown, setCanScrollDown] = useState(false);
	const controls = useAnimation();

	// Animasi geser card ke kanan
	useEffect(() => {
		controls.start({
			x: -scrollIndex * 460,
			transition: { duration: 0.5, ease: 'easeOut' },
		});

		if (scrollIndex === facilities.length - 3) {
			setCanScrollDown(true);
		}
	}, [scrollIndex, controls]);

	// Deteksi scroll halaman
	useEffect(() => {
		const handleScroll = (event: WheelEvent) => {
			if (!canScrollDown && event.deltaY > 0) {
				event.preventDefault();
				setScrollIndex((prev) => Math.min(prev + 1, facilities.length - 3));
			}
		};

		const section = sectionRef.current;
		if (section) {
			section.addEventListener('wheel', handleScroll, { passive: false });
		}

		return () => {
			if (section) {
				section.removeEventListener('wheel', handleScroll);
			}
		};
	}, [canScrollDown]);

	// Geser manual pakai arrow
	const handlePrev = () => {
		setScrollIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleNext = () => {
		setScrollIndex((prev) => Math.min(prev + 1, facilities.length - 3));
	};

	return (
		<section ref={sectionRef} className='px-6 py-24 overflow-hidden'>
			{/* Header Section */}
			<div className='relative pl-28 w-full'>
				<div className='flex justify-between items-center mb-3 w-full'>
					<div className='flex items-center gap-2 bg-secondary shadow-sm mb-12 px-4 py-2.5 border rounded-lg text-secondary-foreground'>
						<svg
							xmlns='http://www.w3.org/2000/svg'
							width='20'
							height='20'
							viewBox='0 0 24 24'
							fill='currentColor'
						>
							<path d='M 6.01 2 C 4.91 2 4.01 2.9 4.01 3.99 L 4 22 L 12 19 L 20 22 L 20 20.55 L 20 4 C 20 2.9 19.09 2 18 2 L 6.01 2 z M 6.01 4 L 18 4 L 18 19.11 L 12 16.86 L 6 19.11 L 6.01 4 z'></path>
						</svg>
						Why Us
					</div>

					{/* Navigation Arrows */}
					<div className='flex gap-4 mr-28 mb-12'>
						<button
							onClick={handlePrev}
							className='flex justify-center items-center bg-secondary hover:bg-secondary-hover rounded-full w-15 h-15 transition'
						>
							<ArrowLeft className='p-1 w-7 h-7 text-secondary-foreground group-hover:text-brand' />
						</button>
						<button
							onClick={handleNext}
							className='flex justify-center items-center bg-secondary hover:bg-secondary-hover rounded-full w-15 h-15 transition'
						>
							<ArrowRight className='p-1 w-7 h-7 text-secondary-foreground group-hover:text-brand' />
						</button>
					</div>
				</div>

				{/* Scroll Animation */}
				<div className='relative overflow-x-hidden'>
					<motion.div animate={controls} className='flex gap-6'>
						{facilities.map((facility, index) => (
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
					</motion.div>
				</div>
			</div>
		</section>
	);
};

export default WhyUsSection;
