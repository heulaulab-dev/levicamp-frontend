import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
	const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'https://levicamp.id';

	// Baik di development maupun production, kita block semua crawler
	return {
		rules: [],
		host: baseUrl,
	};
}
