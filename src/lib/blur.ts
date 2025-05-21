import { getPlaiceholder } from 'plaiceholder';

export default async function blur(imageSrc: string) {
	const res = await fetch(imageSrc);
	const arrayBuffer = await res.arrayBuffer();
	const buffer = Buffer.from(arrayBuffer);

	const { base64 } = await getPlaiceholder(buffer);

	return base64;
}
