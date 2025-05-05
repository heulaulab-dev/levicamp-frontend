/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import Image from 'next/image';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { cn } from '@/lib/utils';

interface FacilitiesCardProps {
	title: string;
	imageSrc: string;
	color: string;
	targetScale: number;
	progress: any;
	range: any; // Changed from any to number[]
	i: number;
}

const FacilitiesCard: React.FC<FacilitiesCardProps> = ({
	title,
	imageSrc,
	color,
	i,
	targetScale,
	progress,
	range,
}) => {
	const container = useRef(null);
	const { scrollYProgress } = useScroll({
		target: container,
		offset: ['start end', 'start start'],
	});

	const imageScale = useTransform(scrollYProgress, [0, 1], [2, 1]);
	const scale = useTransform(progress, range, [1, targetScale]);

	return (
		<div
			ref={container}
			className='top-0 sticky flex justify-center items-center h-screen'
		>
			<motion.div
				className='relative flex flex-col justify-between gap-4 px-8 pt-8 rounded-xl w-96 h-[35rem]'
				style={{
					backgroundColor: color,
					top: `calc(-10% + ${i * 25}px)`,
					scale: scale,
				}}
			>
				<h2 className='mx-8 font-semibold text-secondary-foreground text-2xl text-left'>
					{title}
				</h2>
				<div className='rounded-xl w-full h-full overflow-hidden'>
					<motion.div
						className={cn()}
						style={{
							scale: imageScale,
						}}
					>
						<Image
							src={imageSrc}
							alt={title}
							width={1000}
							height={1000}
							className='object-cover'
						/>
					</motion.div>
				</div>
			</motion.div>
		</div>
	);
};

export default FacilitiesCard;
