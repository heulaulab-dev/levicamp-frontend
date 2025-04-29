export const paymentMethods = [
	{
		id: 'qris',
		name: 'QRIS',
		featuredMethods: ['qris'],
		methods: [
			{
				id: 'qris',
				name: 'Qris',
				logo: 'https://upload.wikimedia.org/wikipedia/commons/e/e1/QRIS_logo.svg',
			},
		],
	},
	{
		id: 'virtual-account',
		name: 'Virtual Account',
		featuredMethods: ['bca', 'bni'],
		methods: [
			{
				id: 'va_bca',
				name: 'BCA',
				logo: 'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg',
			},
			{
				id: 'va_bni',
				name: 'BNI',
				logo: 'https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg',
			},
			{
				id: 'va_mandiri',
				name: 'Mandiri',
				logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg',
			},
			{
				id: 'va_bri',
				name: 'BRI',
				logo: 'https://upload.wikimedia.org/wikipedia/commons/6/68/BANK_BRI_logo.svg',
			},
		],
	},
];
