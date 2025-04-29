'use client';

import React, { ReactNode } from 'react';
import { MusicProvider } from '@/contexts/music-context';
import { MusicPlayer } from '@/components/ui/music-player';
import { Track } from '@/hooks/use-music-player';

interface MusicProviderWrapperProps {
	children: ReactNode;
	tracks?: Track[];
	autoPlay?: boolean;
	playerPosition?:
		| 'bottom-right'
		| 'bottom-left'
		| 'top-right'
		| 'top-left'
		| 'bottom-center'
		| 'top-center';
	showPlayer?: boolean;
	showTrackInfo?: boolean;
	autoCollapse?: boolean;
}

export function MusicProviderWrapper({
	children,
	tracks,
	playerPosition = 'bottom-right',
	showPlayer = true,
	showTrackInfo = true,
	autoCollapse = true,
}: MusicProviderWrapperProps) {
	return (
		<MusicProvider initialTracks={tracks}>
			{children}
			{showPlayer && (
				<MusicPlayer
					position={playerPosition}
					showTrackInfo={showTrackInfo}
					autoCollapse={autoCollapse}
				/>
			)}
		</MusicProvider>
	);
}
