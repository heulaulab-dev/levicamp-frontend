import type { NextConfig } from "next";
import withPlaiceholder from '@plaiceholder/next';
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
			{
				protocol: 'http',
				hostname: '89.116.34.215',
			},
			{
				protocol: 'https',
				hostname: 'cdn.dribbble.com',
			},
			{
				protocol: 'https',
				hostname: 'api.midtrans.com',
			},
			{
				protocol: 'https',
				hostname: 'merchants-app.midtrans.com',
			},
		],
	},
	webpack: (config) => {
		config.plugins.push(ReactComponentName({}));
		return config;
	},
};

export default withPlaiceholder(nextConfig);
