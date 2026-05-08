import type { Variants } from 'framer-motion';

/**
 * Strips transform-based motion from a Framer Motion variants object so only
 * opacity remains — safe for users with `prefers-reduced-motion`.
 *
 * Usage:
 * ```tsx
 * const shouldReduce = useReducedMotion();
 * <motion.div variants={reduceMotion(variants, shouldReduce)} />
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function reduceMotion(variants: any, shouldReduce: boolean | null): any {
	if (!shouldReduce) return variants;

	const reduced: Record<string, unknown> = {};

	for (const key of Object.keys(variants)) {
		const existing = variants[key];
		if (!existing) continue;

		const reducedState: Record<string, unknown> = {};
		if (typeof existing === 'object' && existing !== null) {
			for (const prop of Object.keys(existing)) {
				if (
					prop === 'x' ||
					prop === 'y' ||
					prop === 'z' ||
					prop === 'scale' ||
					prop === 'scaleX' ||
					prop === 'scaleY' ||
					prop === 'scaleZ' ||
					prop === 'rotate' ||
					prop === 'rotateX' ||
					prop === 'rotateY' ||
					prop === 'rotateZ' ||
					prop === 'skewX' ||
					prop === 'skewY' ||
					prop === 'transformOrigin'
				) {
					continue;
				}
				const val = existing[prop];
				if (prop === 'transition') {
					reducedState[prop] = { duration: 0 };
					continue;
				}
				if (
					typeof val === 'object' &&
					val !== null &&
					!Array.isArray(val)
				) {
					reducedState[prop] = reduceMotion(
						{ [prop]: val } as Parameters<typeof reduceMotion>[0],
						true,
					)[prop];
				} else {
					reducedState[prop] = val;
				}
			}
		}

		reduced[key] = reducedState;
	}

	return reduced;
}

// ---------------------------------------------------------------------------
// Reusable shared variants — each has a reduced-motion companion.
// All numeric values in variants are unitless (opacity, scale) or relative
// (%, vw) so they are not tied to layout measurements.
// ---------------------------------------------------------------------------

/** Fades in from transparent. Safe for reduced motion — just appears immediately. */
export const fadeInVariants: Variants = {
	hidden: { opacity: 0 },
	visible: { opacity: 1, transition: { duration: 0.4, ease: 'easeOut' } },
};

/** Fades out to transparent. Safe for reduced motion — just disappears. */
export const fadeOutVariants: Variants = {
	hidden: { opacity: 1 },
	visible: { opacity: 0, transition: { duration: 0.3, ease: 'easeIn' } },
};

/** Slides up from below the viewport. Reduced motion = just opacity. */
export const slideUpVariants: Variants = {
	hidden: { opacity: 0, y: '5%' },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: 'easeOut' },
	},
};

/** Slides down from above. Reduced motion = just opacity. */
export const slideDownVariants: Variants = {
	hidden: { opacity: 0, y: '-5%' },
	visible: {
		opacity: 1,
		y: 0,
		transition: { duration: 0.6, ease: 'easeOut' },
	},
};

/** Scales in from a smaller size. Reduced motion = just opacity. */
export const scaleInVariants: Variants = {
	hidden: { opacity: 0, scale: 0.95 },
	visible: {
		opacity: 1,
		scale: 1,
		transition: { duration: 0.5, ease: 'easeOut' },
	},
};

/** Slides in from the left. Reduced motion = just opacity. */
export const slideLeftVariants: Variants = {
	hidden: { opacity: 0, x: '5%' },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: 'easeOut' },
	},
};

/** Slides in from the right. Reduced motion = just opacity. */
export const slideRightVariants: Variants = {
	hidden: { opacity: 0, x: '-5%' },
	visible: {
		opacity: 1,
		x: 0,
		transition: { duration: 0.6, ease: 'easeOut' },
	},
};

/** Staggered container for list/grid items. */
export const staggerContainerVariants: Variants = {
	hidden: { opacity: 0 },
	visible: {
		opacity: 1,
		transition: { staggerChildren: 0.15 },
	},
};
