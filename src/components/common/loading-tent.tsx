import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function LoadingTent() {
	return (
		<div className='flex justify-center items-center min-h-screen'>
			<DotLottieReact
				src='/loading-tent-animation.lottie'
				loop
				autoplay
				className='size-3/12'
			/>
		</div>
	);
}
