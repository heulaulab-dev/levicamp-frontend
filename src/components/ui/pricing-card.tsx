import Image from 'next/image';
import { Button } from '@/components/ui/button';
import Link from 'next/link';

interface PricingCardProps {
	type: 'Standard' | 'VIP';
	price: string;
	features: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({ type, price, features }) => {
	return (
		<div className='bg-secondary shadow-lg p-6 px-8 py-8 border border-gray-200 rounded-2xl w-[594px] text-center'>
			{/* Title */}
			<h3 className='inline-block mt-6 px-4 py-2 border border-brand rounded-full font-semibold text-primary text-xl'>
				{type}
			</h3>

			<p className='mt-5 text-secondary-foreground text-xl'>Start From</p>

			{/* Price */}
			<p className='mt-5 font-bold text-secondary-foreground text-5xl'>
				{price}
				<span className='font-semibold text-secondary-foreground text-4xl'>
					/night
				</span>
			</p>

			<div className='flex justify-center items-center mt-8 mb-8 border-t-2 border-button'></div>

			{/* Features */}
			<ul className='space-y-4 mt-8 text-left'>
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

			{/* Button */}
			<Button asChild className='mt-8 px-6 py-3 w-full font-semibold'>
				<Link href='/reservation'>Choose Your Tent</Link>
			</Button>
		</div>
	);
};

export default PricingCard;
