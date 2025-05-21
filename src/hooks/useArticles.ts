'use client';

import { useState, useEffect } from 'react';
import api from '@/lib/api';

export interface Article {
	id: number;
	title: string;
	summary: string;
	content: string;
	author: string;
	published_at: string;
	image: string;
	tags: string[];
	status: 'published' | 'draft';
	created_at: string;
	updated_at: string;
}

interface UseArticlesOptions {
	limit?: number;
}

export function useArticles(options: UseArticlesOptions = {}) {
	const [articles, setArticles] = useState<Article[]>([]);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchArticles = async () => {
			setIsLoading(true);
			try {
				const response = await api.get('/articles');
				let data = response.data || [];

				// Filter to only show published articles
				data = data.filter(
					(article: Article) => article.status === 'published',
				);

				// Apply limit if specified
				if (options.limit && data.length > options.limit) {
					data = data.slice(0, options.limit);
				}

				setArticles(data);
				setError(null);
			} catch (err) {
				console.error('Error fetching articles:', err);
				setError('Failed to fetch articles. Please try again later.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchArticles();
	}, [options.limit]);

	return { articles, isLoading, error };
}

export function useArticle(slug: string) {
	const [article, setArticle] = useState<Article | null>(null);
	const [isLoading, setIsLoading] = useState(true);
	const [error, setError] = useState<string | null>(null);

	useEffect(() => {
		const fetchArticle = async () => {
			if (!slug) return;

			setIsLoading(true);
			try {
				// First fetch all articles
				const response = await api.get('/articles');
				const articles = response.data || [];

				// Filter for published articles only
				const publishedArticles = articles.filter(
					(article: Article) => article.status === 'published',
				);

				// Find the article that matches the slug
				const foundArticle = publishedArticles.find(
					(article: Article) =>
						article.title.toLowerCase().replace(/\s+/g, '-') === slug,
				);

				if (foundArticle) {
					setArticle(foundArticle);
					setError(null);
				} else {
					setError('Article not found');
				}
			} catch (err) {
				console.error('Error fetching article:', err);
				setError('Failed to fetch article. Please try again later.');
			} finally {
				setIsLoading(false);
			}
		};

		fetchArticle();
	}, [slug]);

	return { article, isLoading, error };
}
