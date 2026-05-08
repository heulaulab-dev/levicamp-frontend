import '@/styles/globals.css';

import type { Metadata } from 'next';

import Footer from '@/components/common/footer';
import Navbar from '@/components/common/navbar';
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
			<body className={`${plusJakartaSans.variable} antialiased`}>
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