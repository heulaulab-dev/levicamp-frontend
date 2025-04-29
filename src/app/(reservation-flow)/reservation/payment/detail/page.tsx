'use client';

import { Suspense } from 'react';
import PaymentDetailPage from '@/components/pages/reservation/payment/detail/payment-detail-page';
import { DotLottieReact } from '@lottiefiles/dotlottie-react';

export default function Page() {
	return (
		<Suspense
			fallback={
				<DotLottieReact src='/loading-tent-animation.lottie' loop autoplay />
			}
		>
			<PaymentDetailPage />
		</Suspense>
	);
}
