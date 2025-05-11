import { Blog8 } from '@/components/pages/blog/blog-card';
import { Article } from '@/hooks/useArticles';
import { articlesToPosts } from '@/lib/article-utils';

// Static data as fallback
export const staticBlogData = {
	heading: 'Levicamp Articles',
	description:
		'Explore tips, inspiring stories, and the latest news about camping, locations, and equipment from Levicamp.',
	posts: [
		{
			id: 'post-4',
			title:
				'Accor dan tiket.com Jalin Kemitraan Strategis Global Guna Perkuat Pasar Asia',
			summary:
				'Accor, pemimpin global industri perhotelan, mengumumkan kemitraan strategis global dengan tiket.com, pelopor Online Travel Agent (OTA) di Indonesia, yang bertujuan untuk memperluas pilihan pemesanan hotel secara global bagi para wisatawan.',
			label: 'Hospitality News',
			author: 'Yosi Marhayati',
			published: '08 Nov 2024',
			url: 'accor-dan-tiketcom-jalin-kemitraan-strategis',
			image: '/hero-bg.jpg',
			tags: ['Hospitality', 'Partnership', 'Travel'],
		},
		{
			id: 'post-1',
			title: '5 Tips for Choosing the Right Tent for Your Levicamp Adventure',
			summary:
				'Camping is the perfect way to escape daily routines. However, picking the right gear is essential for a comfortable and safe experience. Here are five tips to help you choose the perfect tent for your Levicamp adventure...',
			label: 'Camping Tips',
			author: 'Sarah Chen',
			published: '15 Feb 2024',
			url: '5-tips-for-choosing-the-right-tent',
			image: '/hero-bg.jpg',
			tags: ['Camping', 'Tent Selection', 'Outdoor Tips'],
		},
		{
			id: 'post-2',
			title: 'How to Pick the Perfect Tent Location at Levicamp',
			summary:
				'The location of your tent can greatly impact your camping experience. Here&apos;s how to choose the perfect spot at Levicamp for an unforgettable stay...',
			label: 'Camping Tips',
			author: 'Michael Park',
			published: '22 Feb 2024',
			url: 'how-to-pick-the-perfect-tent-location',
			image: '/hero-bg.jpg',
			tags: ['Camping', 'Location Tips', 'Outdoor Experience'],
		},
		{
			id: 'post-3',
			title: 'Discover the Best Camping Facilities at Levicamp',
			summary:
				'Levicanp offers a range of facilities to make your camping experience more comfortable. From clean restrooms to relaxing lounge areas, here&apos;s what&apos;s available...',
			label: 'Levicamp Info',
			author: 'Emily Wong',
			published: '28 Feb 2024',
			url: 'discover-best-camping-facilities',
			image: '/hero-bg.jpg',
			tags: ['Facilities', 'Camping', 'Levicamp'],
		},
	],
};

export default async function ArticlePage() {
	let articles: Article[] = [];
	let error = null;

	try {
		// Fetch articles from API
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
			next: { revalidate: 60 }, // Revalidate every minute
		});

		if (!res.ok) {
			throw new Error('Failed to fetch articles');
		}

		articles = await res.json();
	} catch (err) {
		console.error('Error fetching articles:', err);
		error = 'Failed to fetch articles';
	}

	// If we have articles from the API, use them
	let blogData = staticBlogData;
	if (articles && articles.length > 0) {
		const posts = articlesToPosts(articles);
		// Ensure all posts have tags array (not undefined)
		const postsWithTags = posts.map((post) => ({
			...post,
			tags: post.tags || [],
		}));

		blogData = {
			...staticBlogData,
			posts: postsWithTags,
		};
	}

	// If there was an error fetching articles, show static data with a message
	if (error) {
		console.warn('Using fallback data due to API error');
	}

	return <Blog8 {...blogData} />;
} 