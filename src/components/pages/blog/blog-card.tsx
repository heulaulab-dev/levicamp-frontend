import { ArrowRight } from 'lucide-react';

import { Card } from '@/components/ui/card';

interface Post {
	id: string;
	title: string;
	summary: string;
	label: string;
	author: string;
	published: string;
	url: string;
	image: string;
	tags?: string[];
}

interface Blog8Props {
	heading?: string;
	description?: string;
	posts?: Post[];
}

const Blog8 = ({
	heading = 'Levicamp Articles',
	description = 'Discover the latest insights and tutorials about modern web development, UI design, and component-driven architecture.',
	posts = [
		{
			id: 'post-1',
			title:
				'Building Modern UIs: A Deep Dive into Shadcn and React Components',
			summary:
				'Join us for an in-depth exploration of building modern user interfaces using shadcn/ui and React. Learn best practices and advanced techniques.',
			label: 'Web Design',
			author: 'Sarah Chen',
			published: '15 Feb 2024',
			url: 'https://shadcnblocks.com',
			image: '/images/block/placeholder-dark-1.svg',
			tags: ['Web Design', 'UI Development'],
		},
		{
			id: 'post-2',
			title: 'Mastering Tailwind CSS: From Basics to Advanced Techniques',
			summary:
				'Discover how to leverage the full power of Tailwind CSS to create beautiful, responsive websites with clean and maintainable code.',
			label: 'Web Design',
			author: 'Michael Park',
			published: '22 Feb 2024',
			url: 'https://shadcnblocks.com',
			image: '/images/block/placeholder-dark-1.svg',
			tags: ['Web Design', 'CSS'],
		},
	],
}: Blog8Props) => {
	return (
		<section className='py-32'>
			<div className='flex flex-col items-center gap-16 mx-auto container'>
				<div className='text-center'>
					<h2 className='mx-auto mb-6 lg:max-w-3xl font-semibold text-primary text-3xl md:text-4xl text-pretty'>
						{heading}
					</h2>
					<p className='mx-auto max-w-2xl text-muted-foreground md:text-lg'>
						{description}
					</p>
				</div>

				<div className='gap-y-10 sm:gap-y-12 md:gap-y-16 lg:gap-y-20 grid sm:grid-cols-12'>
					{posts.map((post) => (
						<Card
							key={post.id}
							className='order-last sm:order-first sm:col-span-12 lg:col-span-10 lg:col-start-2 bg-transparent shadow-none border-0'
						>
							<div className='md:items-center gap-y-6 sm:gap-x-5 sm:gap-y-0 md:gap-x-8 lg:gap-x-12 grid sm:grid-cols-10'>
								<div className='sm:col-span-5'>
									<div className='mb-4 md:mb-6'>
										<div className='flex flex-wrap gap-3 md:gap-5 lg:gap-6 text-muted-foreground text-xs uppercase tracking-wider'>
											{post.tags?.map((tag) => (
												<span key={tag}>{tag}</span>
											))}
										</div>
									</div>
									<h3 className='font-semibold text-primary text-xl md:text-2xl lg:text-3xl'>
										<a
											href={post.url}
											target='_blank'
											className='hover:underline'
										>
											{post.title}
										</a>
									</h3>
									<p className='mt-4 md:mt-5 text-muted-foreground'>
										{post.summary}
									</p>
									<div className='flex items-center space-x-4 mt-6 md:mt-8 text-sm'>
										<span className='text-muted-foreground'>{post.author}</span>
										<span className='text-muted-foreground'>•</span>
										<span className='text-muted-foreground'>
											{post.published}
										</span>
									</div>
									<div className='flex items-center space-x-2 mt-6 md:mt-8 text-primary'>
										<a
											href={post.url}
											target='_blank'
											className='inline-flex items-center font-semibold md:text-base hover:underline'
										>
											<span>Read more</span>
											<ArrowRight className='ml-2 size-4 transition-transform' />
										</a>
									</div>
								</div>
								<div className='order-first sm:order-last sm:col-span-5'>
									<a href={post.url} target='_blank' className='block'>
										<div className='border border-border rounded-lg aspect-[16/9] overflow-clip'>
											<img
												src={post.image}
												alt={post.title}
												className='hover:opacity-70 w-full h-full object-cover transition-opacity duration-200 fade-in'
											/>
										</div>
									</a>
								</div>
							</div>
						</Card>
					))}
				</div>
			</div>
		</section>
	);
};

export { Blog8 };
