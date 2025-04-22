'use client';

import { BookOpen, Globe, Menu, ShoppingBag, Tent, X } from 'lucide-react';
import Image from 'next/image';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useRef, useState } from 'react';

import { Button } from '@/components/ui/button';
import { Component as ThemeToggle } from '@/components/ui/theme-toggle';
import { useHydration } from '@/hooks/use-hydration';
import { useReservationStore } from '@/store/useReservationStore';

export default function Navbar() {
	const [isOpen, setIsOpen] = useState(false);
	const [isHidden, setIsHidden] = useState(false);
	const lastScrollY = useRef(0);
	const pathname = usePathname();
	const router = useRouter();
	const isHydrated = useHydration();
	const [hasInProgressReservation, setHasInProgressReservation] =
		useState(false);
	const [nextStep, setNextStep] = useState('');

	const {
		reservationData,
		personalInfo,
		hasSubmittedPersonalInfo,
		bookingResponseData,
		paymentData,
		clearReservationData,
		clearPersonalInfo,
		clearBookingResponseData,
		clearPaymentData,
	} = useReservationStore();

	useEffect(() => {
		if (!isHydrated) return;

		// Determine if there is an in-progress reservation and what the next step should be
		if (reservationData) {
			setHasInProgressReservation(true);

			if (bookingResponseData && !paymentData) {
				setNextStep('/reservation/payment');
			} else if (personalInfo && hasSubmittedPersonalInfo) {
				setNextStep('/reservation/check-detail');
			} else if (personalInfo) {
				setNextStep('/reservation/personal');
			} else {
				setNextStep('/reservation/personal');
			}
		}
	}, [
		isHydrated,
		reservationData,
		personalInfo,
		hasSubmittedPersonalInfo,
		bookingResponseData,
		paymentData,
	]);

	const handleContinueBooking = () => {
		router.push(nextStep);
	};

	const handleDismissBanner = () => {
		// Clear all previous reservation data when starting a new reservation
		clearReservationData();
		clearPersonalInfo();
		clearBookingResponseData();
		clearPaymentData();
		setHasInProgressReservation(false);
	};

	useEffect(() => {
		const handleScroll = () => {
			const currentScrollY = window.scrollY;
			if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
				setIsHidden(true);
			} else {
				setIsHidden(false);
			}
			lastScrollY.current = currentScrollY;
		};

		window.addEventListener('scroll', handleScroll);
		return () => window.removeEventListener('scroll', handleScroll);
	}, []);

	const menuItems = [
		{ name: 'Reservation', path: '/reservation', icon: Tent },
		{ name: 'Facilities', path: '/facilities', icon: Globe },
		{
			name: 'Catalog',
			path: 'https://assets.levicamp.id/assets/catalog/levicamp-catalog-2025.pdf',
			icon: ShoppingBag,
		},
		{ name: 'Article', path: '/article', icon: BookOpen },
	];

	return (
		<>
			{hasInProgressReservation && pathname === '/reservation' && (
				<div className='top-0 left-0 z-[60] fixed flex justify-between items-center bg-secondary px-8 py-2 border-b w-full text-sm'>
					<div className='flex-1'>
						<span className='font-medium text-primary'>
							Continue your reservation
						</span>
						{reservationData?.selectedTents && (
							<span className='ml-2 text-primary'>
								{reservationData.selectedTents.length} tent(s) selected
							</span>
						)}
					</div>
					<div className='flex gap-2'>
						<Button
							size='sm'
							variant={'link'}
							className='px-2 h-8'
							onClick={handleDismissBanner}
						>
							Dismiss
						</Button>
						<Button
							size='sm'
							className='px-3 h-8'
							onClick={handleContinueBooking}
						>
							Continue
						</Button>
					</div>
				</div>
			)}
			<nav
				className={`fixed shadow-xl ${
					hasInProgressReservation && pathname === '/reservation'
						? 'top-[41px]'
						: 'top-0'
				} left-0 w-full bg-background py-5 px-8 h-20 flex justify-between items-center z-50 transition-transform duration-300 ${
					isHidden ? '-translate-y-full' : 'translate-y-0'
				}`}
			>
				{/* Logo */}
				<div className='flex items-center gap-2'>
					<Link href='/'>
						<Image
							src='https://assets.levicamp.id/assets/logo/levicamp-logo-orange.png'
							alt='logo'
							width={100}
							height={100}
							loading='lazy'
						/>
					</Link>
				</div>

				{/* Menu Desktop */}
				<div className='hidden md:flex gap-4'>
					{menuItems.map((item, index) => {
						const isActive = pathname === item.path;
						const Icon = item.icon;

						return (
							<Link
								key={index}
								href={item.path}
								target={item.path.startsWith('https') ? '_blank' : '_self'}
								className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-primary transition-all ${
									isActive
										? 'bg-primary text-primary-foreground'
										: 'hover:bg-primary/10'
								}`}
							>
								<Icon
									className={`w-5 h-5 transition-all duration-300 ease-in-out ${
										isActive
											? 'opacity-100 scale-100 text-primary-foreground'
											: 'opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100'
									}`}
								/>
								<span className='tracking-normal transition-all duration-300 ease-in-out'>
									{item.name}
								</span>
							</Link>
						);
					})}

					{/* Theme Toggle */}
					<div className='flex items-center ml-2'>
						<ThemeToggle />
					</div>
				</div>

				{/* Mobile Menu Button */}
				<button
					className='md:hidden text-primary hover:text-primary/80 text-2xl'
					onClick={() => setIsOpen(!isOpen)}
				>
					{isOpen ? <X /> : <Menu />}
				</button>

				{/* Mobile Menu */}
				{isOpen && (
					<div className='md:hidden top-full left-0 absolute flex flex-col gap-4 bg-background shadow-md px-8 py-4 w-full'>
						{menuItems.map((item, index) => {
							const isActive = pathname === item.path;
							const Icon = item.icon;

							return (
								<Link
									key={index}
									href={item.path}
									className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-primary transition-all ${
										isActive
											? 'bg-primary text-primary-foreground'
											: 'hover:bg-primary/10'
									}`}
									onClick={() => setIsOpen(false)}
								>
									<Icon
										className={`w-5 h-5 transition-all duration-300 ease-in-out ${
											isActive
												? 'opacity-100 scale-100 text-primary-foreground'
												: 'scale-75 group-hover:opacity-100 group-hover:scale-100'
										}`}
									/>
									<span className='tracking-tight group-hover:tracking-normal transition-all duration-300 ease-in-out'>
										{item.name}
									</span>
								</Link>
							);
						})}
					</div>
				)}
			</nav>
		</>
	);
};
