'use client';

import { Monitor, Moon, Sun } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

import { Button } from '@/components/ui/button';
import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';

type Theme = 'light' | 'dark' | 'system';

const THEME_LABELS: Record<Theme, string> = {
	light: 'Switch to dark theme',
	dark: 'Switch to system theme',
	system: 'Switch to light theme',
};

function Component() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className='size-9' />;
	}

	const current: Theme = resolvedTheme === 'light' ? 'light' : resolvedTheme === 'dark' ? 'dark' : 'system';
	const ariaLabel = `Current theme: ${resolvedTheme === 'light' ? 'Light' : resolvedTheme === 'dark' ? 'Dark' : 'System'}. ${THEME_LABELS[current]}`;

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant='ghost'
					size='icon'
					aria-label={ariaLabel}
					className='rounded-md'
				>
					{resolvedTheme === 'light' && (
						<Sun size={16} strokeWidth={2} aria-hidden='true' />
					)}
					{resolvedTheme === 'dark' && (
						<Moon size={16} strokeWidth={2} aria-hidden='true' />
					)}
					{resolvedTheme !== 'light' && resolvedTheme !== 'dark' && (
						<Monitor size={16} strokeWidth={2} aria-hidden='true' />
					)}
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent className='min-w-32'>
				<DropdownMenuItem onClick={() => setTheme('light')}>
					<Sun size={16} strokeWidth={2} className='opacity-60 me-2' aria-hidden='true' />
					<span>Light</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('dark')}>
					<Moon size={16} strokeWidth={2} className='opacity-60 me-2' aria-hidden='true' />
					<span>Dark</span>
				</DropdownMenuItem>
				<DropdownMenuItem onClick={() => setTheme('system')}>
					<Monitor size={16} strokeWidth={2} className='opacity-60 me-2' aria-hidden='true' />
					<span>System</span>
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
}

export { Component };
