'use client';

import { useState, useEffect } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { cn } from '@components/lib/utils';
import { CheckIcon } from '@radix-ui/react-icons';

const steps = [
  { label: 'Dates & Tents', path: '/reservation' },
  { label: 'Extras', path: '/reservation/extras' },
  { label: 'Check Details', path: '/reservation/check-detail' },
  { label: 'Payment', path: '/reservation/payment' },
  { label: 'Invoice', path: '/reservation/invoice' }
];

export default function ReservationStepper() {
  const router = useRouter();
  const pathname = usePathname();

  const currentStep = steps.findIndex(step => step.path === pathname);
  const [activeStep, setActiveStep] = useState(currentStep !== -1 ? currentStep : 0);

  useEffect(() => {
    setActiveStep(currentStep !== -1 ? currentStep : 0);
  }, [currentStep, pathname]);

  const handleStepClick = (index: number) => {
    if (index <= activeStep) {
      router.push(steps[index].path);
    }
  };

  return (
    <div className="w-full flex items-center justify-center gap-4 flex-wrap px-4 py-3">
      {steps.map((step, index) => {
        const isActive = index === activeStep;
        const isCompleted = index < activeStep;
        const isClickable = index <= activeStep;

        return (
          <div key={index} className="flex items-center">
            {/* Step Indicator (Kotak) */}
            <button
              onClick={() => handleStepClick(index)}
              disabled={!isClickable}
              className={cn(
                'w-10 h-10 flex items-center justify-center rounded-md font-bold transition-all focus:outline-none',
                isActive
                  ? 'bg-orange-500 text-white'
                  : isCompleted
                  ? 'bg-orange-300 text-white cursor-pointer hover:bg-orange-400'
                  : 'bg-gray-500 text-white cursor-not-allowed'
              )}
            >
              {isCompleted ? <CheckIcon className="w-5 h-5" /> : index + 1}
            </button>

            {/* Step Label */}
            <span
              className={cn(
                'ml-2 text-sm font-medium',
                isActive
                  ? 'text-orange-400'
                  : isCompleted
                  ? 'text-orange-300'
                  : 'text-gray-400'
              )}
            >
              {step.label}
            </span>

            {/* Garis Penghubung */}
            {index < steps.length - 1 && (
              <div
                className={cn(
                  'w-24 h-1 mx-2',
                  isCompleted ? 'bg-orange-300' : 'bg-gray-400'
                )}
              />
            )}
          </div>
        );
      })}
    </div>
  );
}
