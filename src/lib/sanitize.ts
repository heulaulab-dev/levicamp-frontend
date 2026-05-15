import DOMPurify from 'dompurify';

const ALLOWED_TAGS = [
	'p', 'br',
	'h1', 'h2', 'h3', 'h4', 'h5', 'h6',
	'ul', 'ol', 'li',
	'a', 'strong', 'b', 'em', 'i', 'u', 's',
	'blockquote', 'pre', 'code',
	'img',
	'table', 'thead', 'tbody', 'tr', 'th', 'td',
	'hr', 'div', 'span',
];

const ALLOWED_ATTR = ['href', 'src', 'alt', 'class', 'target', 'rel', 'width', 'height'];

function getDOMPurify(): typeof DOMPurify | null {
	if (typeof window === 'undefined') return null;
	return DOMPurify;
}

export function sanitizeHTML(dirty: string): string {
	const purify = getDOMPurify();
	if (!purify) return dirty;

	return purify.sanitize(dirty, {
		ALLOWED_TAGS,
		ALLOWED_ATTR,
		ALLOW_DATA_ATTR: false,
		ADD_ATTR: ['target'],
	});
}