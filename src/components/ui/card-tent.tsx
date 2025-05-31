'use client';

import { Award, Briefcase, Star, Sun, Users } from 'lucide-react';
import Image from 'next/image';

import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { formatToK } from '@/lib/format';
import { Tent } from '@/types/reservations';

interface CardTentProps {
	tent: Tent;
	isSelected: boolean;
	status: string;
	onSelect: () => void;
}

export default function CardTent({
	tent,
	isSelected,
	onSelect,
	status,
}: CardTentProps) {
	if (!tent) return <div>Loading...</div>;

	return (
		<Card
			key={tent.id}
			className='shadow-md border rounded-xl w-full h-auto overflow-hidden'
		>
			{/* Gambar dan Kategori */}
			<div className='relative'>
				<Image
					src={tent.tent_images[0] || '/tent-image.jpg'}
					alt={tent.name}
					width={500}
					height={350}
					className={`object-cover w-full aspect-[16/10] ${
						status === 'unavailable' ? 'filter grayscale' : ''
					}`}
				/>
				<span
					className={`absolute top-3 right-3 flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${
						tent.category?.name === 'VIP'
							? 'bg-primary text-primary-foreground'
							: tent.category?.name === 'Standard'
							? 'bg-secondary text-secondary-foreground'
							: 'bg-secondary text-secondary-foreground'
					}`}
				>
					{tent.category?.name === 'VIP' ? (
						<Star size={14} />
					) : tent.category?.name === 'Standard' ? (
						<Award size={14} />
					) : null}
					{tent.category?.name || 'Uncategorized'}
				</span>
			</div>

			{/* Nama Tenda */}
			<CardHeader className='px-4 py-3 text-left md:text-center'>
				<CardTitle className='font-semibold text-primary text-xl'>
					{tent.name}
				</CardTitle>
				<div className='flex justify-start items-center mt-1 text-sm'>
					<Users size={16} className='mr-2' /> Up to{' '}
					<b className='ml-1'>{tent.capacity} guests</b>
				</div>
			</CardHeader>

			<CardContent className='flex flex-col px-4 pb-4 h-full'>
				{/* Harga Weekday */}
				<div className='flex justify-between items-center mt-3 text-md'>
					<span className='flex items-center gap-1 text-sm'>
						<Briefcase size={16} />
						Weekday:
					</span>
					<b className='text-sm'>
						{formatToK(tent.weekday_price ?? 0)}
						<span className='font-normal text-xs'> /night</span>
					</b>
				</div>

				{/* Harga Weekend */}
				<div className='flex justify-between items-center mt-1 text-md'>
					<span className='flex items-center gap-1 text-sm'>
						<Sun size={16} />
						Weekend:
					</span>
					<b className='text-sm'>
						{formatToK(tent.weekend_price ?? 0)}
						<span className='font-normal text-xs'> /night</span>
					</b>
				</div>

				{/* Status & Tombol Select */}
				<div className='flex justify-between items-center mt-10'>
					<div className='flex items-center gap-5 w-full'>
						{/* Status Available / Booked */}
						<span
							className={`text-sm flex items-center px-3 py-1 rounded-full font-medium ${
								status === 'available'
									? 'bg-green-100 text-green-700'
									: 'bg-red-500 text-white'
							}`}
						>
							{status === 'available'
								? 'Available'
								: tent.status === 'maintenance'
								? 'Maintenance'
								: 'Booked'}
						</span>

						{/* Tombol Select / Not Available */}
						<Button
							className={`flex w-full ${
								status === 'available'
									? isSelected
										? 'bg-secondary hover:bg-secondary/80 hover:text-secondary-foreground/80 text-secondary-foreground'
										: 'bg-primary hover:bg-primary/80 text-primary-foreground'
									: 'bg-secondary text-secondary-foreground'
							}`}
							disabled={status !== 'available'}
							onClick={onSelect}
						>
							{status === 'available'
								? isSelected
									? 'Selected'
									: 'Select'
								: 'Not Available'}
						</Button>
					</div>
				</div>
			</CardContent>
		</Card>
	);
}
