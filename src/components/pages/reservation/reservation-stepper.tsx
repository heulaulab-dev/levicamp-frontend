import React from 'react';
import {
	Stepper,
	StepperItem,
	StepperTrigger,
	StepperIndicator,
	StepperTitle,
} from '@/components/ui/stepper';
import { cn } from '@/lib/utils';

interface ReservationStepperProps {
	currentStep: number;
}

export function ReservationStepper({ currentStep }: ReservationStepperProps) {
	const steps = [
		{ title: 'Dates & Tent', description: 'Choose your dates and tent' },
		{ title: 'Personal Info', description: 'Tell us a bit about yourself' },
		{ title: 'Check Details', description: 'Review your booking details' },
		{ title: 'Payment', description: 'Complete your booking' },
		{ title: 'Invoice', description: 'Download your invoice' },
	];

	return (
		<div className='mx-auto w-full max-w-4xl'>
			<Stepper
				value={currentStep}
				className='flex justify-between items-center'
			>
				{steps.map((step, index) => (
					<React.Fragment key={index}>
						<StepperItem
							step={index + 1}
							completed={index < currentStep}
							disabled={index > currentStep}
						>
							<StepperTrigger className='flex items-center gap-2'>
								<StepperIndicator />
								<div className='text-left'>
									<StepperTitle>{step.title}</StepperTitle>
								</div>
							</StepperTrigger>
						</StepperItem>
						{index < steps.length - 1 && (
							<div
								className={cn(
									'flex-1',
									'm-0.5',
									index < currentStep ? 'bg-primary' : 'bg-muted',
									'h-0.5 w-full',
								)}
							></div>
						)}
					</React.Fragment>
				))}
			</Stepper>
		</div>
	);
}
