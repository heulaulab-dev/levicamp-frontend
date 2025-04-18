import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://levicamp.id';

	const staticRoutes = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 1.0,
		},
	];

	return [...staticRoutes];
}
