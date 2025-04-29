import '@/styles/globals.css';

import type { Metadata } from 'next';
import Script from 'next/script';
import { Monitoring } from 'react-scan/monitoring/next';

import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
import { ReactScan } from '@/components/ui/react-scan';
import { Toaster } from '@/components/ui/sonner';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { plusJakartaSans } from '@/lib/fonts';
import { createMetadata } from '@/lib/metadata';
import { GoogleTagManager } from '@next/third-parties/google';
import { MusicProviderWrapper } from '@/components/ui/music-provider-wrapper';

export const metadata: Metadata = createMetadata({});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<GoogleTagManager gtmId={process.env.NEXT_PUBLIC_GTM_ID ?? ''} />
			<ReactScan data-lenis-prevent />
			<head>
				<Script
					src='https://unpkg.com/react-scan/dist/install-hook.global.js'
					strategy='beforeInteractive'
				/>
			</head>
			<body className={`${plusJakartaSans.variable} antialiased`}>
				<Monitoring
					apiKey='H8VqSj9TzukThhfsEUHijVvj1Fxp07y3'
					url='https://monitoring.react-scan.com/api/v1/ingest'
					commit={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA}
					branch={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF}
				/>
				<ThemeProvider>
					<MusicProviderWrapper>
						<Navbar />
						<main>{children}</main>
						<Footer />
						<Toaster richColors />
					</MusicProviderWrapper>
				</ThemeProvider>
			</body>
		</html>
	);
}
