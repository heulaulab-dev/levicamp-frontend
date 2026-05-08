import { Blog8 } from '@/components/pages/blog/blog-card';
import { Article } from '@/hooks/useArticles';
import { articlesToPosts } from '@/lib/article-utils';
import { staticBlogData } from '@/lib/static-blog-data';

export const metadata = {
	title: 'Articles — Levi Camp',
	description:
		'Read the latest articles and insights about camping, glamping, and outdoor experiences at Levi Camp.',
};

export default async function ArticlePage() {
	let articles: Article[] = [];

	try {
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
			next: { revalidate: 60 },
		});

		if (!res.ok) {
			throw new Error(`API returned ${res.status}`);
		}

		const data = await res.json();
		articles = Array.isArray(data) ? data : [];
	} catch (err) {
		console.error('Error fetching articles:', err);
	}

	let blogData = staticBlogData;
	if (articles.length > 0) {
		const posts = articlesToPosts(articles);
		const postsWithTags = posts.map((post) => ({
			...post,
			tags: post.tags ?? [],
		}));
		blogData = { ...staticBlogData, posts: postsWithTags };
	}

	return (
		<>
			{articles.length === 0 && (
				<section className='py-32'>
					<div className='flex flex-col items-center gap-6 mx-auto container text-center px-4'>
						<p className='text-muted-foreground text-lg'>
							No articles yet — check back soon.
						</p>
					</div>
				</section>
			)}
			<Blog8 {...blogData} />
		</>
	);
}
