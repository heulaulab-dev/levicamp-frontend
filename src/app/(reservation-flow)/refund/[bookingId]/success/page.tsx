'use client';

import { useEffect, useState } from 'react';

import HeroSection from '@/components/common/hero-section';
import RefundDetailCard from '@/components/pages/refund/card-refund-detail';
import { Confetti } from '@/components/ui/confetti';
import { useRefundData } from '@/hooks/refund/use-refund-data';

export default function RefundConfirmationPage() {
	const { refundDetail } = useRefundData();
	const [showConfetti, setShowConfetti] = useState(true);

	useEffect(() => {
		setShowConfetti(true);
	}, []);

	if (!refundDetail) {
		return (
			<HeroSection
				title='No Refund Data Found'
				description='Please submit a refund request first.'
				showActionButtons={true}
			></HeroSection>
		);
	}

	return (
		<>
			{showConfetti && (
				<Confetti
					style={{
						position: 'fixed',
						width: '100%',
						height: '100%',
						zIndex: 100,
						pointerEvents: 'none',
					}}
					options={{
						particleCount: 100,
						spread: 70,
						origin: { y: 0.3 },
					}}
				/>
			)}
			<HeroSection
				title={
					<>
						<span className='text-primary'>Refund Request Submitted</span>{' '}
					</>
				}
				description="Your refund request has been successfully submitted. We'll process your request within 3-5 business days and transfer the refund to your provided account."
				showActionButtons={true}
			>
				{refundDetail && <RefundDetailCard refundDetail={refundDetail} />}
			</HeroSection>
		</>
	);
}
