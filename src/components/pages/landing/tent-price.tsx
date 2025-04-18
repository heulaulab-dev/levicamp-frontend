import Image from 'next/image';
import PricingCard from '@/components/ui/pricing-card';
import { Award } from 'lucide-react';

const TentPrice = () => {
	return (
		<section className='relative flex flex-col items-center px-6 py-24 text-center'>
			<Image
				src='/assets/icons/camp-icon.png'
				alt='Tent Icon'
				width={70}
				height={70}
			/>

			<h2 className='mt-4 mb-24 font-semibold text-secondary text-6xl'>
				Your Tent is Set. Your Adventure <br />
				Starts Now.
			</h2>

			<div className='relative mt-24 pl-32 w-full'>
				<div className='flex items-center gap-2 bg-secondary shadow-sm mb-12 px-5 py-2.5 rounded-lg w-max text-secondary-foreground'>
					<Award className='w-5 h-5' />
					<span>Our Tent Category</span>
				</div>
			</div>

			<div className='flex flex-wrap justify-center gap-8 mb-24 w-full overflow-x-auto'>
				<PricingCard
					type='Standard'
					price='400k'
					features={[
						'Fits up to 4 people - no extra fees!',
						'Best View',
						'Free Access to the Waterfall',
						'Free Breakfast',
						'Welcome Drink',
						'Cooking Equipment',
						'Bath Amenities',
					]}
				/>
				<PricingCard
					type='VIP'
					price='550k'
					features={[
						'Fits up to 4 people - no extra fees!',
						'Best View',
						'Free Access to the Waterfall',
						'Free Breakfast',
						'Welcome Drink',
						'Cooking Equipment',
						'Bath Amenities',
					]}
				/>
			</div>
		</section>
	);
};

export default TentPrice;
