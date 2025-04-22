import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { motion, useAnimation } from 'framer-motion';
import FacilitiesCard from '@/components/ui/facilities-card';
import { Bookmark, ArrowUpRight, ArrowRight, ArrowLeft } from 'lucide-react';
import { ListFacilities } from '@/constants/facilities/list-facilities';

export default function FacilitiesSection() {
	const sectionRef = useRef<HTMLDivElement>(null);
	const [scrollIndex, setScrollIndex] = useState(0);
	const controls = useAnimation();

	useEffect(() => {
		controls.start({
			x: -scrollIndex * 460,
			transition: { duration: 0.5, ease: 'easeOut' },
		});
	}, [scrollIndex, controls]);

	const handlePrev = () => {
		setScrollIndex((prev) => Math.max(prev - 1, 0));
	};

	const handleNext = () => {
		setScrollIndex((prev) => Math.min(prev + 1, ListFacilities.length - 1));
	};

	return (
		<section
			ref={sectionRef}
			className='relative flex flex-col items-center mb-24 pt-24 text-secondary text-center'
		>
			<Image
				src='/assets/icons/camp-icon.png'
				alt='Tent Icon'
				width={70}
				height={70}
			/>

			<h2 className='mt-4 mb-48 font-semibold text-text-secondary text-6xl'>
				Your Campsite is Waiting. No Setup, No Stress.
			</h2>

			<div className='relative pl-28 w-full'>
				<div className='flex justify-between items-center mb-3 w-full'>
					<div className='flex items-center gap-2 bg-secondary shadow-sm mb-12 px-4 py-2.5 border rounded-lg text-secondary-foreground'>
						<Bookmark className='w-5 h-5 text-current' />
						Our Facilities
					</div>

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

				<div className='relative overflow-x-hidden'>
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
};


