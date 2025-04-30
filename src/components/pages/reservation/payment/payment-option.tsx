'use client';

import { motion } from 'framer-motion';
import { CheckIcon, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import {
	Tooltip,
	TooltipContent,
	TooltipProvider,
	TooltipTrigger,
} from '@/components/ui/tooltip';

type PaymentOptionProps = {
	method: {
		id: string;
		name: string;
		logo: string;
		enabled?: boolean;
		disabledMessage?: string;
	};
	isSelected: boolean;
	onSelect: () => void;
};

export function PaymentOption({
	method,
	isSelected,
	onSelect,
}: PaymentOptionProps) {
	const isDisabled = method.enabled === false;
	
	return (
		<TooltipProvider>
			<Tooltip>
				<TooltipTrigger asChild>
					<motion.button
						whileHover={{ scale: isDisabled ? 1.0 : 1.02 }}
						whileTap={{ scale: isDisabled ? 1.0 : 0.98 }}
						onClick={isDisabled ? undefined : onSelect}
						disabled={isDisabled}
						className={cn(
							'group relative flex h-24 items-center justify-center rounded-lg border p-4 transition-all duration-200',
							isSelected
								? 'border-2 border-primary'
								: isDisabled
								? 'border-muted bg-muted/20 cursor-not-allowed opacity-70'
								: 'border-border hover:border-primary/40',
						)}
					>
						<div className='relative flex justify-center items-center w-full h-full'>
							<img
								src={method.logo}
								alt={method.name}
								className={cn(
									'max-w-full max-h-full object-contain',
									isDisabled && 'opacity-50 grayscale',
								)}
							/>
							{isDisabled && (
								<div className='absolute inset-0 flex justify-center items-center bg-background/60'>
									<AlertCircle className='w-6 h-6 text-muted-foreground' />
								</div>
							)}
						</div>
						{isSelected && !isDisabled && (
							<motion.div
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								className='-right-2 -bottom-2 absolute flex justify-center items-center bg-primary rounded-full w-6 h-6 text-primary-foreground'
							>
								<CheckIcon className='w-4 h-4' />
							</motion.div>
						)}
					</motion.button>
				</TooltipTrigger>
				{isDisabled && method.disabledMessage && (
					<TooltipContent
						side='top'
						className='bg-background p-2 border border-border'
					>
						<p>{method.disabledMessage}</p>
					</TooltipContent>
				)}
			</Tooltip>
		</TooltipProvider>
	);
}
