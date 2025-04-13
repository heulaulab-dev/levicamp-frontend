import type { NextConfig } from "next";
import ReactComponentName from 'react-scan/react-component-name/webpack';

const nextConfig: NextConfig = {
	images: {
		remotePatterns: [
			{
				protocol: 'https',
				hostname: 'www.alltrekoutdoor.com',
			},
			{
				protocol: 'https',
				hostname: 'api.sandbox.midtrans.com',
			},
			{
				protocol: 'https',
				hostname: 'assets.levicamp.id',
			},
		],
	},
	webpack: (config) => {
		config.plugins.push(ReactComponentName({}));
		return config;
	},
};

export default nextConfig;
