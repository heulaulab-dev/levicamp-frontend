'use client';

import React, { useState, useEffect } from 'react';
import { useMusicContext } from '@/contexts/music-context';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Slider } from '@/components/ui/slider';
import { Separator } from '@/components/ui/separator';
import { cn } from '@/lib/utils';
import {
	Play,
	Pause,
	Volume2,
	Volume1,
	VolumeX,
	ChevronDown,
	Music,
} from 'lucide-react';

export interface MusicPlayerProps {
	className?: string;
	showTrackInfo?: boolean;
	autoCollapse?: boolean;
	position?:
		| 'bottom-right'
		| 'bottom-left'
		| 'top-right'
		| 'top-left'
		| 'bottom-center'
		| 'top-center';
}

export function MusicPlayer({
	className,
	showTrackInfo = true,
	autoCollapse = true,
	position = 'bottom-right',
}: MusicPlayerProps) {
	const { isPlaying, currentTrack, volume, toggle, setVolume } =
		useMusicContext();

	const [isExpanded, setIsExpanded] = useState(!autoCollapse);
	const [isHovered, setIsHovered] = useState(false);

	// Auto-collapse after 5 seconds if autoCollapse is enabled
	useEffect(() => {
		if (!autoCollapse || isHovered) return;

		let timeoutId: NodeJS.Timeout;

		if (isExpanded) {
			timeoutId = setTimeout(() => {
				setIsExpanded(false);
			}, 5000);
		}

		return () => {
			if (timeoutId) clearTimeout(timeoutId);
		};
	}, [isExpanded, autoCollapse, isHovered]);

	// Get volume icon based on current volume
	const VolumeIcon = volume === 0 ? VolumeX : volume < 0.5 ? Volume1 : Volume2;

	// Position classes
	const positionClasses = {
		'bottom-right': 'bottom-4 right-4',
		'bottom-left': 'bottom-4 left-4',
		'top-right': 'top-4 right-4',
		'top-left': 'top-4 left-4',
		'bottom-center': 'bottom-4 left-1/2 -translate-x-1/2',
		'top-center': 'top-4 left-1/2 -translate-x-1/2',
	};

	return (
		<Card
			className={cn(
				'fixed z-50 shadow-lg transition-all duration-300 backdrop-blur-md bg-background/80',
				positionClasses[position],
				isExpanded ? 'w-64' : 'w-12',
				isExpanded ? 'rounded-lg' : 'rounded-full',
				className,
			)}
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
		>
			<div className='p-3'>
				<div className='flex justify-between items-center'>
					{isExpanded ? (
						<>
							<Button
								size='icon'
								variant='ghost'
								className='rounded-full w-8 h-8 hover:scale-105 transition-transform'
								onClick={toggle}
								aria-label={isPlaying ? 'Pause music' : 'Play music'}
							>
								{isPlaying ? (
									<Pause className='w-4 h-4' />
								) : (
									<Play className='w-4 h-4' />
								)}
							</Button>
							<Button
								variant='ghost'
								size='icon'
								className='ml-auto rounded-full w-8 h-8 transition-opacity'
								onClick={() => setIsExpanded(false)}
								aria-label='Collapse music player'
							>
								<ChevronDown className='w-4 h-4' />
							</Button>
						</>
					) : (
						<Button
							size='icon'
							variant='ghost'
							className='rounded-full w-6 h-6 hover:scale-105 transition-transform'
							onClick={() => setIsExpanded(true)}
							aria-label='Expand music player'
						>
							{isPlaying ? (
								<Music className='w-4 h-4 text-primary animate-pulse' />
							) : (
								<Music className='w-4 h-4' />
							)}
						</Button>
					)}
				</div>

				{isExpanded && (
					<div className='slide-in-from-bottom-2 space-y-3 mt-3 animate-in duration-300 fade-in'>
						{showTrackInfo && currentTrack && (
							<div className='space-y-1'>
								<p className='font-medium text-sm truncate'>
									{currentTrack.name}
								</p>
								{currentTrack.artist && (
									<p className='text-muted-foreground text-xs truncate'>
										{currentTrack.artist}
									</p>
								)}
							</div>
						)}

						<Separator />

						<div className='flex items-center gap-2'>
							<VolumeIcon className='w-4 h-4 text-muted-foreground' />
							<Slider
								value={[volume * 100]}
								min={0}
								max={100}
								step={1}
								onValueChange={(value) => setVolume(value[0] / 100)}
								className='cursor-pointer'
								aria-label='Adjust volume'
							/>
						</div>
					</div>
				)}
			</div>
		</Card>
	);
}
