import { motion } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';

import { Button } from '@/components/ui/button';

type HeroSectionProps = {
	iconSrc?: string;
	title: React.ReactNode;
	description?: React.ReactNode;
	children?: React.ReactNode;
	showActionButtons?: boolean;
};

export default function HeroSection({
	iconSrc = '/assets/icons/camp-icon.png',
	title,
	description,
	children,
	showActionButtons = false,
}: HeroSectionProps) {
	return (
		<section
			className='flex flex-col justify-center items-center bg-gradient-to-b my-24 mt-20 px-4 py-10 min-h-screen'
			style={{
				backgroundImage: "url('/bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* Header */}
			<motion.div
				initial={{ opacity: 0.0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{
					delay: 0.3,
					duration: 0.8,
					ease: 'easeInOut',
				}}
				className='flex flex-col items-center gap-2'
			>
				<div className='flex flex-col items-center'>
					{iconSrc && (
						<Image src={iconSrc} alt='Section Icon' width={50} height={50} />
					)}

					<div className='flex flex-col mt-4 mb-6 max-w-3xl text-center'>
						<h1 className='font-semibold text-primary text-3xl lg:text-5xl tracking-tight scroll-m-20'>
							{title}
						</h1>

						{description && (
							<h2 className='first:mt-0 font-medium text-secondary-foreground text-xl md:text-3xl tracking-tight transition-colors scroll-m-20'>
								{description}
							</h2>
						)}
					</div>
				</div>

				{showActionButtons && (
					<div className='flex flex-row justify-center items-center gap-3 w-full'>
						<Button asChild>
							<Link href='/'>Return to Home</Link>
						</Button>
						<Button variant='outline' asChild>
							<Link href='/contact'>Contact Support</Link>
						</Button>
					</div>
				)}
			</motion.div>

			{/* Slot Content */}
			<div className='flex flex-col items-center gap-8 w-full container'>
				{children}
			</div>
		</section>
	);
}
