import type React from 'react';
import { cn } from '@/lib/utils';
import {
	AlertTriangle,
	Check,
	Clock,
	ThumbsDown,
	CheckCircle,
} from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';

export type StatusVariant =
	| 'eligible'
	| 'processing'
	| 'completed'
	| 'failed'
	| 'error'
	| 'confirmed';

interface StatusCardProps {
	variant: StatusVariant;
	title: string;
	description: string;
	className?: string;
}

export function StatusCard({
	variant,
	title,
	description,
	className,
}: StatusCardProps) {
	// Define variant-specific properties
	const variantStyles: Record<
		StatusVariant,
		{
			bgColor: string;
			icon: React.ReactNode;
			iconColor: string;
		}
	> = {
		eligible: {
			bgColor: 'bg-amber-50',
			icon: <Check className='w-6 h-6' />,
			iconColor: 'text-amber-600',
		},
		processing: {
			bgColor: 'bg-orange-400',
			icon: <Clock className='w-6 h-6' />,
			iconColor: 'text-white',
		},
		completed: {
			bgColor: 'bg-green-50',
			icon: <CheckCircle className='w-6 h-6' />,
			iconColor: 'text-green-600',
		},
		failed: {
			bgColor: 'bg-red-50',
			icon: <ThumbsDown className='w-6 h-6' />,
			iconColor: 'text-red-600',
		},
		error: {
			bgColor: 'bg-red-50',
			icon: <AlertTriangle className='w-6 h-6' />,
			iconColor: 'text-red-600',
		},
		confirmed: {
			bgColor: 'bg-amber-50',
			icon: <Check className='w-6 h-6' />,
			iconColor: 'text-amber-600',
		},
	};

	const { bgColor, icon, iconColor } = variantStyles[variant];

	return (
		<Card className={cn('w-full border-none shadow-none', bgColor, className)}>
			<CardContent className='p-6'>
				<div className='flex gap-4'>
					<div className={cn('mt-1 flex-shrink-0', iconColor)}>{icon}</div>
					<div className='space-y-1'>
						<h3
							className={cn(
								'font-medium text-lg',
								variant === 'processing' ? 'text-white' : 'text-gray-900',
							)}
						>
							{title}
						</h3>
						<p
							className={cn(
								'text-sm',
								variant === 'processing' ? 'text-white' : 'text-gray-600',
							)}
						>
							{description}
						</p>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
