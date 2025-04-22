import { Bookmark } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import Image from 'next/image';
import { motion } from 'framer-motion';

// Animation variants
const containerVariants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: {
			staggerChildren: 0.3,
		},
	},
};

const cardVariants = {
	hidden: { opacity: 0, y: 50 },
	visible: {
		opacity: 1,
		y: 0,
		transition: {
			duration: 0.6,
			ease: 'easeOut',
		},
	},
};

export default function FacilitiesList() {
	return (
		<section className='bg-secondary/50 py-16'>
			{/* Facilities */}
			<div className='flex flex-col justify-between mx-auto container'>
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.5 }}
					className='flex flex-col justify-start items-start mb-8'
				>
					<div className='flex items-center gap-2 bg-secondary shadow-sm p-4 border rounded-lg font-semibold text-secondary-foreground'>
						<Bookmark className='w-5 h-5 text-current' />
						Our Facilities
					</div>
				</motion.div>

				<motion.div
					className='mx-auto w-full'
					variants={containerVariants}
					initial='hidden'
					whileInView='visible'
					viewport={{ once: true, margin: '-100px' }}
				>
					<motion.div variants={cardVariants}>
						<FacilityCard
							imageUrl='/assets/Toilet.png'
							title='Refreshing Bathroom with Warm Water'
							description='Agar tidak bosan bermain dan explore tentang alam dan hewan kami fasilitasi untuk Playground untuk anak anak bermain dan tertawa riang bersama teman - temannya'
						/>
					</motion.div>

					<motion.div
						className='flex justify-end w-full'
						variants={cardVariants}
					>
						<FacilityCard
							imagePosition='right'
							imageUrl='/assets/Toilet.png'
							title='Curug'
							description='Agar tidak bosan bermain dan explore tentang alam dan hewan kami fasilitasi untuk Playground untuk anak anak bermain dan tertawa riang bersama teman - temannya'
						/>
					</motion.div>

					<motion.div variants={cardVariants}>
						<FacilityCard
							imageUrl='/assets/Toilet.png'
							title='Stay fresh & connected with clean restrooms, and free Wi-Fi'
							description='Agar tidak bosan bermain dan explore tentang alam dan hewan kami fasilitasi untuk Playground untuk anak anak bermain dan tertawa riang bersama teman - temannya'
						/>
					</motion.div>

					<motion.div
						className='flex justify-end w-full'
						variants={cardVariants}
					>
						<FacilityCard
							imagePosition='right'
							imageUrl='/assets/Toilet.png'
							title='Curug'
							description='Agar tidak bosan bermain dan explore tentang alam dan hewan kami fasilitasi untuk Playground untuk anak anak bermain dan tertawa riang bersama teman - temannya'
						/>
					</motion.div>
				</motion.div>
			</div>
		</section>
	);
}

// Facility card component
export interface FacilityCardProps {
	imageUrl: string;
	title: string;
	description: string;
	imagePosition?: 'left' | 'right';
}

export const FacilityCard = ({
	imageUrl,
	title,
	description,
	imagePosition = 'left',
}: FacilityCardProps) => {
	return (
		<Card className='bg-secondary shadow-lg mb-6 border-none rounded-xl max-w-3xl overflow-hidden'>
			<CardContent className='flex flex-row p-0'>
				{imagePosition === 'left' ? (
					<>
						<div className='w-[40%]'>
							<Image
								src={imageUrl}
								alt={title}
								width={220}
								height={220}
								className='w-full h-full object-cover'
							/>
						</div>
						<div className='p-6 w-[60%]'>
							<h3 className='mb-4 font-bold text-secondary-foreground text-2xl'>
								{title}
							</h3>
							<p className='text-gray-700'>{description}</p>
						</div>
					</>
				) : (
					<>
						<div className='p-6 w-[60%]'>
							<h3 className='mb-4 font-bold text-secondary-foreground text-2xl'>
								{title}
							</h3>
							<p className='text-gray-700'>{description}</p>
						</div>
						<div className='w-[40%]'>
							<Image
								src={imageUrl}
								alt={title}
								width={220}
								height={220}
								className='w-full h-full object-cover'
							/>
						</div>
					</>
				)}
			</CardContent>
		</Card>
	);
};
