'use client';

import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { PaymentOption } from '@/components/pages/reservation/payment/payment-option';
import { motion, AnimatePresence } from 'framer-motion';
import { useState, useEffect } from 'react';
import { Separator } from '@/components/ui/separator';

type PaymentCategoryProps = {
	category: {
		id: string;
		name: string;
		methods: {
			id: string;
			name: string;
			logo: string;
		}[];
		featuredMethods?: string[];
	};
	isSelected: boolean;
	selectedMethod: string;
	onSelectCategory: () => void;
	onSelectMethod: (methodId: string) => void;
};

export function PaymentCategory({
	category,
	isSelected,
	selectedMethod,
	onSelectCategory,
	onSelectMethod,
}: PaymentCategoryProps) {
	const [isOpen, setIsOpen] = useState(isSelected);

	// Update open state when selected category changes
	useEffect(() => {
		setIsOpen(isSelected);
	}, [isSelected]);

	const handleCategoryClick = () => {
		onSelectCategory();
		setIsOpen(!isOpen);
	};

	// Featured methods to show in the header
	const featuredMethods = category.featuredMethods
		? category.methods.filter((m) => category.featuredMethods?.includes(m.id))
		: [];

	return (
		<div>
			<button
				onClick={handleCategoryClick}
				className={cn(
					'flex w-full items-center justify-between rounded-lg p-4 text-left',
					isSelected ? 'bg-accent/50' : 'hover:bg-muted/50',
				)}
			>
				<div className='flex items-center'>
					<div
						className={cn(
							'mr-4 h-6 w-6 rounded-full border-2',
							isSelected
								? 'border-primary bg-primary/10'
								: 'border-muted-foreground',
						)}
					>
						{isSelected && (
							<div className='flex justify-center items-center w-full h-full'>
								<div className='bg-primary rounded-full w-2 h-2'></div>
							</div>
						)}
					</div>
					<h3 className='font-medium text-sm'>{category.name}</h3>
				</div>

				<div className='flex items-center gap-2'>
					{featuredMethods.length > 0 && (
						<div className='hidden md:flex items-center gap-2'>
							{featuredMethods.map((method) => (
								<img
									key={method.id}
									src={method.logo}
									alt={method.name}
									className='w-auto h-4 object-contain'
								/>
							))}
						</div>
					)}
					<ChevronDown
						className={cn(
							'h-5 w-5 transition-transform duration-200',
							isOpen ? 'rotate-180' : '',
						)}
					/>
				</div>
			</button>

			<AnimatePresence>
				{isOpen && (
					<motion.div
						initial={{ height: 0, opacity: 0 }}
						animate={{ height: 'auto', opacity: 1 }}
						exit={{ height: 0, opacity: 0 }}
						transition={{ duration: 0.2 }}
						className='overflow-hidden'
					>
						<div className='gap-3 grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 p-4'>
							{category.methods.map((method) => (
								<PaymentOption
									key={method.id}
									method={method}
									isSelected={selectedMethod === method.id}
									onSelect={() => onSelectMethod(method.id)}
								/>
							))}
						</div>
						<Separator className='my-2' />
					</motion.div>
				)}
			</AnimatePresence>
		</div>
	);
}
