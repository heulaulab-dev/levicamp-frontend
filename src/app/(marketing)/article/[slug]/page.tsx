import Image from 'next/image';
import { notFound } from 'next/navigation';
import { ArrowLeft, Facebook, Twitter, Link as LinkIcon } from 'lucide-react';
import Link from 'next/link';

import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

// Import from static data
import { staticBlogData } from '@/app/(marketing)/article/page';

// Server actions to fetch article data
import { Article } from '@/hooks/useArticles';

interface PageProps {
	params: Promise<{
		slug: string;
	}>;
}

// Format date for display
function formatDate(dateString: string): string {
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

// Get author initials for avatar fallback
function getInitials(name: string): string {
	return name
		.split(' ')
		.map((part) => part[0])
		.join('')
		.toUpperCase();
}

// Convert the page to a Server Component
export default async function ArticleSinglePage(props: PageProps) {
	const params = await props.params;
	// Since we're already using an async function, we need to ensure all data fetching
	// is properly awaited before using the params.slug
	const slug = params.slug;
	let article: Article | null = null;

	try {
		// Fetch articles from API
		const res = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/articles`, {
			next: { revalidate: 60 }, // Revalidate every minute
		});

		if (!res.ok) {
			throw new Error('Failed to fetch articles');
		}

		const articles = await res.json();

		// Find the article that matches the slug
		article =
			articles.find(
				(article: Article) =>
					article.title.toLowerCase().replace(/\s+/g, '-') === slug,
			) || null;
	} catch (error) {
		console.error('Error fetching article:', error);
	}

	// If API fetch fails, try to find a matching post in static data as fallback
	if (!article) {
		const fallbackPost = staticBlogData.posts.find((post) => post.url === slug);
		if (!fallbackPost) {
			notFound();
		}

		// Use fallback data
		return (
			<article className='mt-[80px] py-8 md:py-12'>
				<div className='mx-auto max-w-4xl container'>
					<div className='mb-6'>
						<Button asChild variant='ghost' size='sm' className='mb-4'>
							<Link href='/article' className='flex items-center gap-2'>
								<ArrowLeft className='w-4 h-4' />
								Back to Articles
							</Link>
						</Button>

						<h1 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
							{fallbackPost.title}
						</h1>

						<div className='flex justify-between items-center'>
							<div className='flex items-center gap-4'>
								<Avatar className='border w-12 h-12'>
									<AvatarImage
										src='https://assets.levicamp.id/assets/logo/levicamp-logo-orange.png'
										alt={fallbackPost.author}
										width={100}
										height={100}
										loading='lazy'
									/>
									<AvatarFallback>		
										{getInitials(fallbackPost.author)}
									</AvatarFallback>
								</Avatar>
								<div>
									<p className='font-medium'>{fallbackPost.author}</p>
									<p className='text-muted-foreground text-sm'>
										{fallbackPost.published}
									</p>
								</div>
							</div>

							<div className='flex items-center gap-2'>
								<span className='mr-1 text-sm'>Bagikan :</span>
								<Button
									variant='outline'
									size='icon'
									className='rounded-full w-8 h-8'
								>
									<Facebook className='w-4 h-4' />
								</Button>
								<Button
									variant='outline'
									size='icon'
									className='rounded-full w-8 h-8'
								>
									<Twitter className='w-4 h-4' />
								</Button>
								<Button
									variant='outline'
									size='icon'
									className='rounded-full w-8 h-8'
								>
									<LinkIcon className='w-4 h-4' />
								</Button>
							</div>
						</div>
					</div>

					<div className='relative mb-8 rounded-lg aspect-video overflow-hidden'>
						<Image
							src={fallbackPost.image}
							alt={fallbackPost.title}
							fill
							className='object-cover'
							priority
						/>
					</div>

					<div className='dark:prose-invert mx-auto max-w-3xl prose prose-lg'>
						<p className='lead'>{fallbackPost.summary}</p>

						<p>
							Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec
							auctor, nisl eget aliquam tincidunt, nunc nisl aliquam nisl, eget
							aliquam nisl nunc eget nisl. Donec auctor, nisl eget aliquam
							tincidunt, nunc nisl aliquam nisl, eget aliquam nisl nunc eget
							nisl.
						</p>

						<h2>Key Points</h2>

						<ul>
							<li>
								Choose a tent size that accommodates all campers comfortably
							</li>
							<li>Consider the weather conditions and seasonality</li>
							<li>Look for quality materials and construction</li>
							<li>Test setup before your trip</li>
							<li>Don&apos;t forget to check for proper ventilation</li>
						</ul>
					</div>

					{/* Tags */}
					{fallbackPost.tags && fallbackPost.tags.length > 0 && (
						<div className='mx-auto mt-12 max-w-3xl'>
							<Separator className='mb-6' />
							<div className='flex flex-wrap gap-2'>
								{fallbackPost.tags.map((tag: string) => (
									<Badge key={tag} variant='outline'>
										{tag}
									</Badge>
								))}
							</div>
						</div>
					)}
				</div>
			</article>
		);
	}

	// Display the article from API
	return (
		<article className='mt-[80px] py-8 md:py-12'>
			<div className='mx-auto max-w-4xl container'>
				<div className='mb-6'>
					<Button asChild variant='ghost' size='sm' className='mb-4'>
						<Link href='/article' className='flex items-center gap-2'>
							<ArrowLeft className='w-4 h-4' />
							Back to Articles
						</Link>
					</Button>

					<h1 className='mb-6 font-bold text-3xl md:text-4xl lg:text-5xl'>
						{article.title}
					</h1>

					<div className='flex justify-between items-center'>
						<div className='flex items-center gap-4'>
							<Avatar className='border w-12 h-12'>
								<AvatarImage
									src={`/avatars/${article.author
										.toLowerCase()
										.replace(' ', '-')}.jpg`}
									alt={article.author}
								/>
								<AvatarFallback>{getInitials(article.author)}</AvatarFallback>
							</Avatar>
							<div>
								<p className='font-medium'>{article.author}</p>
								<p className='text-muted-foreground text-sm'>
									{formatDate(article.published_at)}
								</p>
							</div>
						</div>

						<div className='flex items-center gap-2'>
							<span className='mr-1 text-sm'>Bagikan :</span>
							<Button
								variant='outline'
								size='icon'
								className='rounded-full w-8 h-8'
							>
								<Facebook className='w-4 h-4' />
							</Button>
							<Button
								variant='outline'
								size='icon'
								className='rounded-full w-8 h-8'
							>
								<Twitter className='w-4 h-4' />
							</Button>
							<Button
								variant='outline'
								size='icon'
								className='rounded-full w-8 h-8'
							>
								<LinkIcon className='w-4 h-4' />
							</Button>
						</div>
					</div>
				</div>

				<div className='relative mb-8 rounded-lg aspect-video overflow-hidden'>
					<Image
						src={article.image}
						alt={article.title}
						fill
						className='object-cover'
						priority
					/>
				</div>

				<div className='dark:prose-invert mx-auto max-w-3xl prose prose-lg'>
					{/* Render the article content */}
					<div dangerouslySetInnerHTML={{ __html: article.content }} />
				</div>

				{/* Tags */}
				{article.tags && article.tags.length > 0 && (
					<div className='mx-auto mt-12 max-w-3xl'>
						<Separator className='mb-6' />
						<div className='flex flex-wrap gap-2'>
							{article.tags.map((tag: string) => (
								<Badge key={tag} variant='outline'>
									{tag}
								</Badge>
							))}
						</div>
					</div>
				)}
			</div>
		</article>
	);
}
