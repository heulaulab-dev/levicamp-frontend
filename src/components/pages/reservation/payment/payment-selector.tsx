'use client';

import { useState } from 'react';
import { PaymentCategory } from '@/components/pages/reservation/payment/payment-category';
import { paymentMethods } from '@/constants/reservation/payment/payment-data';

export function PaymentSelector() {
	const [selectedCategory, setSelectedCategory] = useState('qris');
	const [selectedMethod, setSelectedMethod] = useState('qris');

	return (
		<div className='bg-card mx-auto p-1 sm:p-4 border border-border rounded-xl w-full max-w-3xl'>
			<div className='space-y-2'>
				{paymentMethods.map((category) => (
					<PaymentCategory
						key={category.id}
						category={category}
						isSelected={selectedCategory === category.id}
						selectedMethod={selectedMethod}
						onSelectCategory={() => setSelectedCategory(category.id)}
						onSelectMethod={(methodId) => setSelectedMethod(methodId)}
					/>
				))}
			</div>
		</div>
	);
}
