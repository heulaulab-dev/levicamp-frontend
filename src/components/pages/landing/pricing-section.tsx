'use client';

import { ArrowRightIcon, CheckIcon } from '@radix-ui/react-icons';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { useRef } from 'react';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';


interface Feature {
	name: string;
	description: string;
	included: boolean;
}

interface PricingTier {
	name: string;
	price: {
		nightly: string;
	};
	description: string;
	features: Feature[];
	highlight?: boolean;
	badge?: string;
	icon: React.ReactNode;
}

interface PricingSectionProps {
	tiers: PricingTier[];
	className?: string;
}

export default function PricingSection({
	tiers,
	className,
}: PricingSectionProps) {
	const sectionRef = useRef<HTMLElement>(null);
	const isInView = useInView(sectionRef, { once: true, amount: 0.2 });

	const buttonStyles = {
		default: cn(
			'h-12 bg-secondary dark:bg-secondary',
			'hover:bg-secondary dark:hover:bg-secondary',
			'text-primary dark:text-primary',
			'border border-primary dark:border-primary',
			'hover:border-primary dark:hover:border-primary',
			'shadow-sm hover:shadow-md',
			'text-sm font-medium',
		),
		highlight: cn(
			'h-12 bg-white dark:bg-white',
			'hover:bg-secondary dark:hover:bg-secondary',
			'text-primary dark:text-primary',
			'shadow-[0_1px_15px_rgba(0,0,0,0.1)]',
			'hover:shadow-[0_1px_20px_rgba(0,0,0,0.15)]',
			'font-semibold text-base',
		),
	};

	const badgeStyles = cn(
		'px-4 py-1.5 text-sm font-medium',
		'bg-primary dark:bg-primary',
		'text-primary-foreground dark:text-primary-foreground',
		'border-none shadow-lg',
	);

	// Animation variants
	const containerVariants = {
		hidden: { opacity: 0 },
		show: {
			opacity: 1,
			transition: {
				staggerChildren: 0.15,
				delayChildren: 0.3,
			},
		},
	};

	const itemVariants = {
		hidden: { opacity: 0, y: 40 },
		show: {
			opacity: 1,
			y: 0,
			transition: { delay: 0.3, duration: 0.8 },
		},
	};

	const featureVariants = {
		hidden: { opacity: 0, x: -10 },
		show: { opacity: 1, x: 0, transition: { duration: 0.3 } },
	};

	return (
		<motion.section
			ref={sectionRef}
			className={cn('my-24 h-min-screen', className)}
			initial='hidden'
			animate={isInView ? 'show' : 'hidden'}
			variants={containerVariants}
		>
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

				{/* Pricing */}
				<motion.div
					className='gap-8 grid grid-cols-1 md:grid-cols-2'
					variants={containerVariants}
				>
					{tiers.map((tier, index) => (
						<motion.div
							key={tier.name}
							className={cn(
								'relative group backdrop-blur-sm',
								'rounded-3xl transition-all duration-300',
								'flex flex-col',
								tier.highlight
									? 'bg-gradient-to-b from-secondary to-primary'
									: 'bg-secondary dark:bg-secondary',
								'border',
								tier.highlight
									? 'border-primary shadow-xl'
									: 'border-zinc-200 dark:border-zinc-700 shadow-md',
								'hover:translate-y-0 hover:shadow-lg',
							)}
							variants={itemVariants}
							custom={index}
						>
							{tier.badge && tier.highlight && (
								<motion.div
									className='-top-4 left-6 absolute'
									initial={{ opacity: 0, y: -10 }}
									animate={
										isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: -10 }
									}
									transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
								>
									<Badge className={badgeStyles}>{tier.badge}</Badge>
								</motion.div>
							)}

							<motion.div className='flex-1 p-8'>
								<motion.div
									className='flex justify-between items-center mb-4'
									variants={featureVariants}
								>
									<motion.div
										className={cn(
											'p-3 rounded-xl',
											tier.highlight
												? 'bg-secondary text-primary'
												: 'bg-secondary text-primary',
										)}
										whileHover={{ scale: 1.05 }}
									>
										{tier.icon}
									</motion.div>
									<h3 className='font-semibold text-primary'>{tier.name}</h3>
								</motion.div>

								<motion.div className='mb-6' variants={featureVariants}>
									<div className='flex items-baseline gap-2'>
										<span className='font-bold text-primary text-4xl'>
											Rp.{tier.price.nightly}
										</span>
										<span className='text-secondary-foreground text-sm'>
											/night
										</span>
									</div>
									<p className='mt-2 text-secondary-foreground text-sm'>
										{tier.description}
									</p>
								</motion.div>

								<motion.div className='space-y-4' variants={containerVariants}>
									{tier.features.map((feature, featureIndex) => (
										<motion.div
											key={feature.name}
											className='flex gap-4'
											variants={featureVariants}
											custom={featureIndex}
											transition={{ delay: 0.2 + featureIndex * 0.1 }}
										>
											<div
												className={cn(
													'mt-1 p-0.5 rounded-full transition-colors duration-200',
													feature.included
														? 'text-emerald-600 dark:text-emerald-400'
														: 'text-zinc-400 dark:text-zinc-600',
												)}
											>
												<CheckIcon className='w-4 h-4' />
											</div>
											<div>
												<div className='font-medium text-secondary-foreground text-sm'>
													{feature.name}
												</div>
												<div className='text-secondary-foreground text-sm'>
													{feature.description}
												</div>
											</div>
										</motion.div>
									))}
								</motion.div>
							</motion.div>

							<motion.div className='mt-auto p-8 pt-0' variants={itemVariants}>
								<motion.div
									whileHover={{ scale: 1.03 }}
									whileTap={{ scale: 0.97 }}
								>
									<Button
										className={cn(
											'w-full relative transition-all duration-300',
											tier.highlight
												? buttonStyles.highlight
												: buttonStyles.default,
										)}
									>
										<span className='z-10 relative flex justify-center items-center gap-2'>
											{tier.highlight ? (
												<>
													Choose Your Tent
													<ArrowRightIcon className='w-4 h-4' />
												</>
											) : (
												<>
													Choose Your Tent
													<ArrowRightIcon className='w-4 h-4' />
												</>
											)}
										</span>
									</Button>
								</motion.div>
							</motion.div>
						</motion.div>
					))}
				</motion.div>
			</div>
		</motion.section>
	);
}
