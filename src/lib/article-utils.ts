import { Article } from '@/hooks/useArticles';
import { Post } from '@/components/pages/blog/blog-card';

/**
 * Generate a slug from an article title
 */
export function generateSlug(title: string): string {
	return title
		.toLowerCase()
		.replace(/\s+/g, '-')
		.replace(/[^a-z0-9-]/g, '');
}

/**
 * Format a date string to display format
 */
export function formatDate(dateString: string): string {
	try {
		const date = new Date(dateString);
		return new Intl.DateTimeFormat('id-ID', {
			day: 'numeric',
			month: 'short',
			year: 'numeric',
		}).format(date);
	} catch (e) {
		console.error('Error formatting date:', e);
		return dateString;
	}
}

/**
 * Convert an API article to the display Post format
 */
export function articleToPost(article: Article): Post {
	return {
		id: `post-${article.id}`,
		title: article.title,
		summary: article.summary,
		label: article.tags[0] || 'Article',
		author: article.author,
		published: formatDate(article.published_at),
		url: generateSlug(article.title),
		image: article.image,
		tags: article.tags,
	};
}

/**
 * Convert a collection of API articles to Post format
 */
export function articlesToPosts(articles: Article[]): Post[] {
	return articles.map(articleToPost);
}
