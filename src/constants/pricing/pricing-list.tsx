import { Tent } from 'lucide-react';

export const defaultTiers = [
	{
		name: 'Standard',
		price: {
			weekday: '485.000',
			weekend: '600.000',
		},
		description: 'Affordable Escape with Full Experience',
		icon: (
			<div className='relative'>
				<div className='absolute inset-0 bg-gradient-to-r from-secondary to-secondary/30 blur-2xl rounded-full' />
				<Tent className='z-10 relative w-7 h-7 text-secondary-foreground animate-[float_3s_ease-in-out_infinite]' />
			</div>
		),
		features: [
			{
				name: 'Fits up to 4 people – no extra fees!',
				description:
					'Accommodates up to 4 guests per tent at no additional cost – perfect for families or small groups.',
				included: true,
			},
			{
				name: 'Best View',
				description:
					'Enjoy the most scenic spot on site, with panoramic views ideal for sunrise, sunset, and stargazing.',
				included: true,
			},
			{
				name: 'Free Access to the Waterfall',
				description:
					'Complimentary entry to the nearby waterfall – a serene natural feature just steps from your tent.',
				included: true,
			},
			{
				name: 'Free Breakfast',
				description:
					'Start your day with a complimentary breakfast, including a variety of warm and locally inspired options.',
				included: true,
			},
			{
				name: 'Welcome Drink',
				description:
					'Receive a refreshing welcome drink upon arrival – a small touch to begin your stay with warmth and hospitality.',
				included: true,
			},
			{
				name: 'Cooking Equipment',
				description:
					'Full access to cooking essentials, including a portable stove, BBQ tools, and tableware – ideal for campfire meals.',
				included: true,
			},
			{
				name: 'Bath Amenities',
				description:
					'Enjoy complimentary bath essentials including clean towels, soap, and shampoo – all provided for your convenience.',
				included: false,
			},
		],
	},
	{
		name: 'VIP',
		price: {
			weekday: '550.000',
			weekend: '680.000',
		},
		description: 'Ideal Level Up Your Stay with a Touch of Luxury.',
		highlight: true,
		badge: 'Most Popular',
		icon: (
			<div className='relative'>
				<Tent className='z-10 relative w-7 h-7' />
			</div>
		),
		features: [
			{
				name: 'Fits up to 4 people – no extra fees!',
				description:
					'Accommodates up to 4 guests per tent at no additional cost – perfect for families or small groups.',
				included: true,
			},
			{
				name: 'Best View',
				description:
					'Enjoy the most scenic spot on site, with panoramic views ideal for sunrise, sunset, and stargazing.',
				included: false,
			},
			{
				name: 'Free Access to the Waterfall',
				description:
					'Complimentary entry to the nearby waterfall – a serene natural feature just steps from your tent.',
				included: true,
			},
			{
				name: 'Free Breakfast',
				description:
					'Start your day with a complimentary breakfast, including a variety of warm and locally inspired options.',
				included: true,
			},
			{
				name: 'Welcome Drink',
				description:
					'Receive a refreshing welcome drink upon arrival – a small touch to begin your stay with warmth and hospitality.',
				included: true,
			},
			{
				name: 'Cooking Equipment',
				description:
					'Full access to cooking essentials, including a portable stove, BBQ tools, and tableware – ideal for campfire meals.',
				included: true,
			},
			{
				name: 'Bath Amenities',
				description:
					'Enjoy complimentary bath essentials including clean towels, soap, and shampoo – all provided for your convenience.',
				included: true,
			},
		],
	},
];
