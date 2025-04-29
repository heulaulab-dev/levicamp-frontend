'use client';

import { motion } from 'framer-motion';
import { CheckIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

type PaymentOptionProps = {
	method: {
		id: string;
		name: string;
		logo: string;
	};
	isSelected: boolean;
	onSelect: () => void;
};

export function PaymentOption({
	method,
	isSelected,
	onSelect,
}: PaymentOptionProps) {
	return (
		<motion.button
			whileHover={{ scale: 1.02 }}
			whileTap={{ scale: 0.98 }}
			onClick={onSelect}
			className={cn(
				'group relative flex h-24 items-center justify-center rounded-lg border p-4 transition-all duration-200',
				isSelected
					? 'border-2 border-primary'
					: 'border-border hover:border-primary/40',
			)}
		>
			<div className='relative flex justify-center items-center w-full h-full'>
				<img
					src={method.logo}
					alt={method.name}
					className='max-w-full max-h-full object-contain'
				/>
			</div>
			{isSelected && (
				<motion.div
					initial={{ opacity: 0, scale: 0.8 }}
					animate={{ opacity: 1, scale: 1 }}
					className='-right-2 -bottom-2 absolute flex justify-center items-center bg-primary rounded-full w-6 h-6 text-primary-foreground'
				>
					<CheckIcon className='w-4 h-4' />
				</motion.div>
			)}
		</motion.button>
	);
}
