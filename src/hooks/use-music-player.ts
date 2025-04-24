'use client';

import { useState, useEffect, useRef, useCallback } from 'react';

export type Track = {
	id: string;
	name: string;
	artist?: string;
	src: string;
};

export interface MusicPlayerState {
	isPlaying: boolean;
	currentTrack: Track | null;
	volume: number;
	tracks: Track[];
	isInitialized: boolean;
	hasInteracted: boolean;
}

export const useMusicPlayer = (initialTracks: Track[] = []) => {
	const [state, setState] = useState<MusicPlayerState>({
		isPlaying: false,
		currentTrack: initialTracks[0] ?? null,
		volume: 1,
		tracks: initialTracks,
		isInitialized: false,
		hasInteracted: false,
	});

	const audioRef = useRef<HTMLAudioElement | null>(null);
	const playPromiseRef = useRef<Promise<void> | null>(null);

	useEffect(() => {
		const handleScroll = () => {
			if (!state.hasInteracted) {
				setState((prev) => ({ ...prev, hasInteracted: true, isPlaying: true }));
			}
		};
		window.addEventListener('scroll', handleScroll, { passive: true });
		return () => window.removeEventListener('scroll', handleScroll);
	}, [state.hasInteracted]);

	useEffect(() => {
		const unlockAudio = async () => {
			if (audioRef.current && !state.hasInteracted) {
				try {
					await audioRef.current.play();
					audioRef.current.pause();
					setState((prev) => ({
						...prev,
						hasInteracted: true,
						isPlaying: true,
					}));
				} catch (err) {
					console.warn('unlock error', err);
				}
			}
			document.removeEventListener('click', unlockAudio);
		};

		document.addEventListener('click', unlockAudio);
		return () => document.removeEventListener('click', unlockAudio);
	}, [state.hasInteracted]);

	useEffect(() => {
		const audio = new Audio();
		audio.volume = state.volume;

		if (state.currentTrack) {
			audio.src = state.currentTrack.src;
			audio.load();
		}

		audioRef.current = audio;
		setState((prev) => ({ ...prev, isInitialized: true }));

		return () => {
			audio.pause();
			audio.src = '';
		};
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || !state.isInitialized) return;

		const playAudio = async () => {
			if (!state.hasInteracted) return;
			try {
				playPromiseRef.current = audio.play();
				await playPromiseRef.current;
				playPromiseRef.current = null;
			} catch (err: unknown) {
				if (err instanceof DOMException && err.name !== 'NotAllowedError') {
					setState((prev) => ({ ...prev, isPlaying: false }));
				}
			}
		};

		const pauseAudio = () => {
			if (playPromiseRef.current) {
				playPromiseRef.current.then(() => audio.pause()).catch(() => {});
			} else {
				audio.pause();
			}
		};

		if (state.isPlaying && state.hasInteracted) {
			void playAudio();
		} else {
			pauseAudio();
		}

		return () => {
			audio.pause();
		};
	}, [state.isPlaying, state.hasInteracted, state.isInitialized]);

	useEffect(() => {
		const audio = audioRef.current;
		if (audio && state.isInitialized) {
			audio.volume = state.volume;
		}
	}, [state.volume, state.isInitialized]);

	useEffect(() => {
		const audio = audioRef.current;
		if (!audio || !state.currentTrack || !state.isInitialized) return;

		const changeTrack = async () => {
			audio.pause();
			if (state.currentTrack) {
				audio.src = state.currentTrack.src;
				audio.load();
			}

			if (state.isPlaying && state.hasInteracted) {
				try {
					playPromiseRef.current = audio.play();
					await playPromiseRef.current;
					playPromiseRef.current = null;
				} catch (err: unknown) {
					if (err instanceof DOMException && err.name !== 'NotAllowedError') {
						setState((prev) => ({ ...prev, isPlaying: false }));
					}
				}
			}
		};

		void changeTrack();
	}, [
		state.currentTrack,
		state.isPlaying,
		state.hasInteracted,
		state.isInitialized,
	]);

	const play = useCallback(() => {
		setState((prev) => ({ ...prev, isPlaying: true }));
	}, []);

	const pause = useCallback(() => {
		setState((prev) => ({ ...prev, isPlaying: false }));
	}, []);

	const toggle = useCallback(() => {
		setState((prev) => ({ ...prev, isPlaying: !prev.isPlaying }));
	}, []);

	const setVolume = useCallback((volume: number) => {
		setState((prev) => ({ ...prev, volume: Math.max(0, Math.min(1, volume)) }));
	}, []);

	const selectTrack = useCallback((trackId: string) => {
		setState((prev) => {
			const found = prev.tracks.find((t) => t.id === trackId) ?? null;
			return { ...prev, currentTrack: found };
		});
	}, []);

	const addTrack = useCallback((track: Track) => {
		setState((prev) => ({
			...prev,
			tracks: [...prev.tracks, track],
			currentTrack: prev.currentTrack ?? track,
		}));
	}, []);

	return {
		...state,
		play,
		pause,
		toggle,
		setVolume,
		selectTrack,
		addTrack,
	};
};
