'use client';

import { useRef } from 'react';
import { motion, useAnimation } from 'framer-motion';

import Image from 'next/image';
import { cn } from '@/lib/utils';
import { useReducedMotion } from '@/hooks/use-reduced-motion';

interface FacilitiesCardProps {
	title: string;
	imageSrc: string;
	color: string;
}

const FacilitiesCard: React.FC<FacilitiesCardProps> = ({
	title,
	imageSrc,
	color,
}) => {
	const controls = useAnimation();
	const ref = useRef<HTMLDivElement>(null);
	const shouldReduce = useReducedMotion();

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		if (shouldReduce) return;
		const bounds = ref.current?.getBoundingClientRect();
		if (!bounds) return;

		const centerX = bounds.left + bounds.width / 2;
		const centerY = bounds.top + bounds.height / 2;

		controls.start({
			x: (e.clientX - centerX) / 10,
			y: (e.clientY - centerY) / 10,
			transition: { type: 'spring', stiffness: 300, damping: 20 },
		});
	};

	const handleMouseLeave = () => {
		if (shouldReduce) return;
		controls.start({
			x: 0,
			y: 0,
			transition: { type: 'spring', stiffness: 200, damping: 20 },
		});
	};

	return (
		<motion.div
			ref={ref}
			style={{ backgroundColor: color }}
			className={cn(
				'flex flex-col justify-between pt-6 rounded-2xl w-full aspect-[3/4] cursor-pointer',
			)}
			animate={shouldReduce ? { x: 0, y: 0 } : controls}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<h2 className='mx-6 sm:mx-8 mb-4 font-semibold text-secondary-foreground text-2xl sm:text-3xl text-left'>
				{title}
			</h2>

			<div className='mx-6 sm:mx-8 rounded-t-xl overflow-hidden'>
				<Image
					src={imageSrc}
					alt={title}
					width={385}
					height={408}
					className='object-cover'
				/>
			</div>
		</motion.div>
	);
};

export default FacilitiesCard;
