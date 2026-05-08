/**
 * Hook to detect the user's `prefers-reduced-motion` preference.
 *
 * Use this before rendering any Framer Motion animation to avoid triggering
 * motion for users who have opted out at the OS/browser level (vestibular
 * disorder support, epilepsy safety, low-power mode).
 *
 * @example
 * ```tsx
 * const shouldReduce = useReducedMotion();
 * return <motion.div variants={reduceMotion(variants, shouldReduce)} />;
 * ```
 */
export { useReducedMotion } from 'framer-motion';
