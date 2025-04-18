import { Monitoring } from 'react-scan/monitoring/next'; // Import this first before React
import type { Metadata } from 'next';
import Script from 'next/script';
import { plusJakartaSans } from '@/lib/fonts';
import { createMetadata } from '@/lib/metadata';
import '@/styles/globals.css';
import Navbar from '@/components/common/navbar';
import Footer from '@/components/common/footer';
import { Toaster } from '@/components/ui/sonner';
import LenisProvider from '@/components/ui/lenis-provider';
import { ThemeProvider } from '@/components/ui/theme-provider';
import { ReactScan } from '@/components/ui/react-scan';

export const metadata: Metadata = createMetadata({});

export default function RootLayout({
	children,
}: Readonly<{
	children: React.ReactNode;
}>) {
	return (
		<html lang='en' suppressHydrationWarning>
			<ReactScan data-lenis-prevent />
			<head>
				<Script
					src='https://unpkg.com/react-scan/dist/install-hook.global.js'
					strategy='beforeInteractive'
				/>
			</head>
			<body className={`${plusJakartaSans.variable} antialiased`}>
				<Monitoring
					apiKey='H8VqSj9TzukThhfsEUHijVvj1Fxp07y3' // Safe to expose publically
					url='https://monitoring.react-scan.com/api/v1/ingest'
					commit={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_SHA} // optional but recommended
					branch={process.env.NEXT_PUBLIC_VERCEL_GIT_COMMIT_REF} // optional but recommended
				/>
				<ThemeProvider>
					<LenisProvider>
						<Navbar />
						<main>{children}</main>
						<Footer />
						<Toaster richColors />
					</LenisProvider>
				</ThemeProvider>
			</body>
		</html>
	);
}
