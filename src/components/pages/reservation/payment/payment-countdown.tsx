'use client';

import { useEffect, useState } from 'react';

interface PaymentCountdownProps {
	expiryDate: string;
}

export function PaymentCountdown({ expiryDate }: PaymentCountdownProps) {
	const [timeLeft, setTimeLeft] = useState({
		hours: 0,
		minutes: 0,
		seconds: 0,
	});

	useEffect(() => {
		const calculateTimeLeft = () => {
			const expiryTime = new Date(expiryDate.replace(' ', 'T')).getTime();
			const now = new Date().getTime();
			const difference = expiryTime - now;

			if (difference <= 0) {
				setTimeLeft({ hours: 0, minutes: 0, seconds: 0 });
				return;
			}

			const hours = Math.floor(difference / (1000 * 60 * 60));
			const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
			const seconds = Math.floor((difference % (1000 * 60)) / 1000);

			setTimeLeft({ hours, minutes, seconds });
		};

		// Initial calculation
		calculateTimeLeft();

		// Update every second
		const timer = setInterval(calculateTimeLeft, 1000);

		return () => clearInterval(timer);
	}, [expiryDate]);

	const formatTime = (time: number) => {
		return time.toString().padStart(2, '0');
	};

	return (
		<div className='flex items-center gap-1'>
			<div className='flex justify-center items-center bg-red-500 rounded-md w-10 h-10 font-mono text-white text-xl'>
				{formatTime(timeLeft.hours)}
			</div>
			<span className='text-gray-800 text-xl'>:</span>
			<div className='flex justify-center items-center bg-red-500 rounded-md w-10 h-10 font-mono text-white text-xl'>
				{formatTime(timeLeft.minutes)}
			</div>
			<span className='text-gray-800 text-xl'>:</span>
			<div className='flex justify-center items-center bg-red-500 rounded-md w-10 h-10 font-mono text-white text-xl'>
				{formatTime(timeLeft.seconds)}
			</div>
			<div className='flex flex-col ml-2 text-gray-600 text-xs'>
				<span>Jam</span>
				<span>Menit</span>
				<span>Detik</span>
			</div>
		</div>
	);
}
