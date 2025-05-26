import { Blog8 } from '@/components/pages/blog/blog-card';
import { Article } from '@/hooks/useArticles';
import { articlesToPosts } from '@/lib/article-utils';
import { staticBlogData } from '@/lib/static-blog-data';

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