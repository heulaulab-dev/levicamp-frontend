import Link from 'next/link';

import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { RESERVATION_ACTIONS } from '@/constants/reservation/reservation-actions';

export default function ActionCardList() {
	return (
		<div className='flex md:flex-row flex-col gap-4 mt-6'>
			{RESERVATION_ACTIONS.map((action) => (
				<Card key={action.href} className='w-full md:w-72'>
					<CardContent className='p-4'>
						<h3 className='font-semibold text-primary text-lg'>
							{action.title}
						</h3>
						<p className='text-secondary-foreground dark:text-primary-foreground text-sm'>
							{action.desc}
						</p>
						<Button asChild className='mt-2 w-full'>
							<Link href={action.href}>{action.buttonLabel}</Link>
						</Button>
					</CardContent>
				</Card>
			))}
		</div>
	);
}
