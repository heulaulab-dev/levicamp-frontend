import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';

interface PricingCardProps {
	type: 'Standard' | 'VIP';
	price: {
		weekday: string;
		weekend: string;
	};
	features: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({ type, price, features }) => {
	return (
		<Card className='w-full max-w-xl text-center'>
			<CardContent className='flex flex-col items-center gap-4 p-6 sm:p-8'>
				<h3 className='inline-block px-4 py-2 border border-brand rounded-full font-semibold text-primary text-lg sm:text-xl'>
					{type}
				</h3>

				<p className='text-secondary-foreground text-lg sm:text-xl'>Start From</p>

				<p className='font-bold text-secondary-foreground text-4xl sm:text-5xl'>
					{price.weekday}
					<span className='font-semibold text-secondary-foreground text-2xl sm:text-4xl'>
						/weekday
					</span>
				</p>

				<p className='text-secondary-foreground text-lg sm:text-xl'>
					<span className='font-semibold text-secondary-foreground text-2xl sm:text-4xl'>
						{price.weekend}
						/weekend
					</span>
				</p>

				<div className='flex justify-center items-center w-full border-t-2 border-button' />

				<ul className='space-y-4 text-left self-stretch'>
					{features.map((feature, index) => (
						<li key={index} className='flex items-center space-x-2'>
							<Image
								src={
									type === 'Standard' &&
									(feature === 'Best View' || feature === 'Bath Amenities')
										? '/assets/icons/cross-circle.svg'
										: '/assets/icons/check-circle.svg'
								}
								alt='Check'
								width={24}
								height={24}
							/>
							<span className='text-secondary-foreground'>{feature}</span>
						</li>
					))}
				</ul>

				<Button asChild className='w-full font-semibold'>
					<Link href='/reservation'>Choose Your Tent</Link>
				</Button>
			</CardContent>
		</Card>
	);
};

export default PricingCard;
