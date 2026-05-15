import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://levicamp.id';

	const staticRoutes: MetadataRoute.Sitemap = [
		{
			url: baseUrl,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 1.0,
		},
		{
			url: `${baseUrl}/facilities`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/article`,
			lastModified: new Date(),
			changeFrequency: 'weekly' as const,
			priority: 0.8,
		},
		{
			url: `${baseUrl}/reservation`,
			lastModified: new Date(),
			changeFrequency: 'monthly' as const,
			priority: 0.7,
		},
		{
			url: `${baseUrl}/refund`,
			lastModified: new Date(),
			changeFrequency: 'yearly' as const,
			priority: 0.3,
		},
		{
			url: `${baseUrl}/reschedule`,
			lastModified: new Date(),
			changeFrequency: 'yearly' as const,
			priority: 0.3,
		},
	];

	return [...staticRoutes];
}
