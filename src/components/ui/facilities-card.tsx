'use client';

import { motion, useAnimation } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';
import Image from 'next/image';

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

	const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
		const bounds = ref.current?.getBoundingClientRect();
		if (!bounds) return;

		const centerX = bounds.left + bounds.width / 2;
		const centerY = bounds.top + bounds.height / 2;

		const offsetX = (e.clientX - centerX) / 10;
		const offsetY = (e.clientY - centerY) / 10;

		controls.start({
			x: offsetX,
			y: offsetY,
			transition: { type: 'spring', stiffness: 300, damping: 20 },
		});
	};

	const handleMouseLeave = () => {
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
				'flex flex-col justify-between pt-6 rounded-2xl w-[449px] h-[604px] cursor-pointer',
			)}
			animate={controls}
			onMouseMove={handleMouseMove}
			onMouseLeave={handleMouseLeave}
		>
			<h2 className='mx-8 mb-4 font-semibold text-secondary-foreground text-3xl text-left'>
				{title}
			</h2>

			<div className='mx-8 rounded-t-xl overflow-hidden'>
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
