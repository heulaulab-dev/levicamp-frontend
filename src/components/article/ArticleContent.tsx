'use client';

import { sanitizeHTML } from '@/lib/sanitize';

interface ArticleContentProps {
	html: string;
	className?: string;
}

export function ArticleContent({ html, className }: ArticleContentProps) {
	const safe = sanitizeHTML(html);
	return (
		<div
			className={className}
			dangerouslySetInnerHTML={{ __html: safe }}
		/>
	);
}