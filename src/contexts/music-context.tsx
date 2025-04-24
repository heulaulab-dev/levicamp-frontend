'use client';

import React, { createContext, useContext, ReactNode } from 'react';
import { useMusicPlayer, Track } from '@/hooks/use-music-player';

// Define default tracks - you can replace these with your actual music files
const defaultTracks: Track[] = [
	{
		id: '1',
		name: 'Nature Sounds',
		artist: 'Nature Artist',
		src: '/background-music.mp3',
	},
];

type MusicContextType = ReturnType<typeof useMusicPlayer>;

const MusicContext = createContext<MusicContextType | undefined>(undefined);

export const MusicProvider = ({
	children,
	initialTracks = defaultTracks,
}: {
	children: ReactNode;
	initialTracks?: Track[];
}) => {
	const musicPlayer = useMusicPlayer(initialTracks);

	return (
		<MusicContext.Provider value={musicPlayer}>
			{children}
		</MusicContext.Provider>
	);
};

export const useMusicContext = (): MusicContextType => {
	const context = useContext(MusicContext);

	if (context === undefined) {
		throw new Error('useMusicContext must be used within a MusicProvider');
	}

	return context;
};
