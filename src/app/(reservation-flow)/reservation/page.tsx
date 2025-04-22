'use client';

import HeroSection from '@/components/common/hero-section';
import ReservationForm from '@/components/pages/reservation/reservation-form';
export default function ReservationPage() {
	return (
		<HeroSection
			title={
				<>
					Your <span className='text-primary'>Reservation,</span> Your Way!
					Fast, Flexible, and hassle-free.
				</>
			}
			description='Book now and take control of your plans today!'
		>
			<ReservationForm />
		</HeroSection>
	);
}
