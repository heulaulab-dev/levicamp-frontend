import { Blog8 } from '@/components/pages/blog/blog-card';

const blogData = {
	heading: 'Levicamp Articles',
	description:
		'Explore tips, inspiring stories, and the latest news about camping, locations, and equipment from Levicamp.',
	posts: [
		{
			id: 'post-1',
			title: '5 Tips for Choosing the Right Tent for Your Levicamp Adventure',
			summary:
				'Camping is the perfect way to escape daily routines. However, picking the right gear is essential for a comfortable and safe experience. Here are five tips to help you choose the perfect tent for your Levicamp adventure...',
			label: 'Camping Tips',
			author: 'Sarah Chen',
			published: '15 Feb 2024',
			url: 'https://levicamp.com/articles/5-tips-for-choosing-the-right-tent',
			image: '/hero-bg.jpg',
			tags: ['Camping', 'Tent Selection', 'Outdoor Tips'],
		},
		{
			id: 'post-2',
			title: 'How to Pick the Perfect Tent Location at Levicamp',
			summary:
				'The location of your tent can greatly impact your camping experience. Here’s how to choose the perfect spot at Levicamp for an unforgettable stay...',
			label: 'Camping Tips',
			author: 'Michael Park',
			published: '22 Feb 2024',
			url: 'https://levicamp.com/articles/how-to-pick-the-perfect-tent-location',
			image: '/hero-bg.jpg',
			tags: ['Camping', 'Location Tips', 'Outdoor Experience'],
		},
		{
			id: 'post-3',
			title: 'Discover the Best Camping Facilities at Levicamp',
			summary:
				'Levicanp offers a range of facilities to make your camping experience more comfortable. From clean restrooms to relaxing lounge areas, here’s what’s available...',
			label: 'Levicamp Info',
			author: 'Emily Wong',
			published: '28 Feb 2024',
			url: 'https://levicamp.com/articles/discover-best-camping-facilities',
			image: '/hero-bg.jpg',
			tags: ['Facilities', 'Camping', 'Levicamp'],
		},
	],
};

export default function ArticlePage() {
	return <Blog8 {...blogData} />;
}
