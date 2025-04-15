/* eslint-disable @typescript-eslint/no-explicit-any */
import { Tilt } from '@/components/ui/tilt';
import { CheckCircleIcon } from 'lucide-react';

export default function StatusCard() {
	return (
		<Tilt rotationFactor={8} isRevese>
			<div className='bg-green-100 mt-6 p-4 border border-green-300 rounded-lg w-full max-w-3xl'>
				<div className='flex justify-start items-center gap-2'>
					<CheckCircleIcon className='w-5 h-5 text-green-800' />
					<h2 className='font-semibold text-green-800 text-lg'>
						You’re eligible for a reschedule!
					</h2>
				</div>

				<p className='text-green-700 text-sm'>
					Your request meets our reschedule policy. Submit your reschedule
					request now, and we’ll process it within 3-10 business days.
				</p>
			</div>
		</Tilt>
	);
}
