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

function Component() {
	const { setTheme, resolvedTheme } = useTheme();
	const [mounted, setMounted] = useState(false);

	// Only show the theme toggle client-side to avoid hydration mismatch
	useEffect(() => {
		setMounted(true);
	}, []);

	if (!mounted) {
		return <div className='w-9 h-9' />;
	}

	return (
		<div>
			<DropdownMenu>
				<DropdownMenuTrigger asChild>
					<Button size='icon' variant='link' aria-label='Select theme'>
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
						<Sun
							size={16}
							strokeWidth={2}
							className='opacity-60 mr-2'
							aria-hidden='true'
						/>
						<span>Light</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('dark')}>
						<Moon
							size={16}
							strokeWidth={2}
							className='opacity-60 mr-2'
							aria-hidden='true'
						/>
						<span>Dark</span>
					</DropdownMenuItem>
					<DropdownMenuItem onClick={() => setTheme('system')}>
						<Monitor
							size={16}
							strokeWidth={2}
							className='opacity-60 mr-2'
							aria-hidden='true'
						/>
						<span>System</span>
					</DropdownMenuItem>
				</DropdownMenuContent>
			</DropdownMenu>
		</div>
	);
}

export { Component };
