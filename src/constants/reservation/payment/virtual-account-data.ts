interface VirtualAccountBank {
	id: string;
	name: string;
	code: string;
	logoSrc: string;
	enabled: boolean;
	disabledMessage?: string; // Message to display when payment method is disabled
}

export const virtualAccountBanks: Record<string, VirtualAccountBank> = {
	bca: {
		id: 'bca',
		name: 'BCA',
		code: 'BCA',
		logoSrc:
			'https://upload.wikimedia.org/wikipedia/commons/5/5c/Bank_Central_Asia.svg',
		enabled: true,
	},
	bni: {
		id: 'bni',
		name: 'BNI',
		code: 'BNI',
		logoSrc: 'https://upload.wikimedia.org/wikipedia/id/5/55/BNI_logo.svg',
		enabled: true,
	},
	mandiri: {
		id: 'mandiri',
		name: 'Mandiri',
		code: 'MANDIRI',
		logoSrc: '/assets/banks/mandiri.svg',
		enabled: false,
		disabledMessage: 'Temporarily unavailable for maintenance',
	},
	bri: {
		id: 'bri',
		name: 'BRI',
		code: 'BRI',
		logoSrc: '/assets/banks/bri.svg',
		enabled: true,
	},
};

// Instructions for each bank's VA payment method
export interface PaymentStep {
	title: string;
	steps: string[];
}

export const bankPaymentInstructions: Record<string, PaymentStep[]> = {
	bca: [
		{
			title: 'ATM BCA',
			steps: [
				'Masukkan kartu ATM dan PIN BCA Anda',
				'Pilih menu "Transaksi Lainnya" > "Transfer" > "Ke Rek. BCA Virtual Account"',
				'Masukkan nomor Virtual Account Anda',
				'Periksa informasi yang tampil di layar, pastikan nomor VA dan nama toko sudah benar',
				'Konfirmasi pembayaran Anda',
				'Transaksi selesai',
			],
		},
		{
			title: 'Mobile Banking BCA',
			steps: [
				'Login ke aplikasi BCA Mobile',
				'Pilih "m-BCA" > "m-Transfer" > "BCA Virtual Account"',
				'Masukkan nomor Virtual Account Anda',
				'Periksa informasi yang tampil di layar, pastikan nomor VA dan nama toko sudah benar',
				'Masukkan PIN m-BCA Anda',
				'Pembayaran selesai',
			],
		},
	],
	bni: [
		{
			title: 'ATM BNI',
			steps: [
				'Masukkan kartu ATM dan PIN BNI Anda',
				'Pilih menu "Lainnya" > "Transfer" > "Virtual Account"',
				'Masukkan nomor Virtual Account Anda',
				'Periksa informasi yang tampil di layar',
				'Konfirmasi pembayaran Anda',
				'Transaksi selesai',
			],
		},
		{
			title: 'Mobile Banking BNI',
			steps: [
				'Login ke aplikasi BNI Mobile',
				'Pilih menu "Transfer" > "Virtual Account"',
				'Masukkan nomor Virtual Account Anda',
				'Periksa informasi yang tampil di layar',
				'Masukkan password transaksi',
				'Pembayaran selesai',
			],
		},
	],
	mandiri: [
		{
			title: 'ATM Mandiri',
			steps: [
				'Masukkan kartu ATM dan PIN Mandiri Anda',
				'Pilih menu "Bayar/Beli" > "Multi Payment"',
				'Pilih "Lainnya" > "Virtualaccount"',
				'Masukkan kode perusahaan "88888" dan nomor Virtual Account Anda',
				'Periksa informasi yang tampil di layar',
				'Konfirmasi pembayaran',
				'Transaksi selesai',
			],
		},
		{
			title: 'Livin by Mandiri',
			steps: [
				'Login ke aplikasi Livin',
				'Pilih menu "Pembayaran" > "Multipayment"',
				'Cari dan pilih "Virtualaccount"',
				'Masukkan nomor Virtual Account Anda',
				'Periksa informasi yang tampil di layar',
				'Konfirmasi pembayaran',
				'Pembayaran selesai',
			],
		},
	],
	bri: [
		{
			title: 'ATM BRI',
			steps: [
				'Masukkan kartu ATM dan PIN BRI Anda',
				'Pilih menu "Transaksi Lainnya" > "Pembayaran" > "Lainnya" > "BRIVA"',
				'Masukkan nomor Virtual Account Anda',
				'Periksa informasi yang tampil di layar',
				'Konfirmasi pembayaran Anda',
				'Transaksi selesai',
			],
		},
		{
			title: 'BRI Mobile',
			steps: [
				'Login ke aplikasi BRI Mobile',
				'Pilih menu "Pembayaran" > "BRIVA"',
				'Masukkan nomor Virtual Account Anda',
				'Periksa informasi yang tampil di layar',
				'Masukkan PIN Anda',
				'Pembayaran selesai',
			],
		},
	],
	// Default instructions for banks not specifically listed
	default: [
		{
			title: 'ATM',
			steps: [
				'Masukkan kartu ATM dan PIN Anda',
				'Pilih menu Transaksi Lainnya / Transfer / Pembayaran',
				'Pilih menu Virtual Account atau Transfer Virtual Account',
				'Masukkan nomor Virtual Account Anda',
				'Periksa informasi yang tampil di layar',
				'Konfirmasi pembayaran Anda',
				'Transaksi selesai',
			],
		},
		{
			title: 'Mobile Banking',
			steps: [
				'Login ke aplikasi Mobile Banking Anda',
				'Pilih menu Transfer atau Pembayaran',
				'Pilih menu Virtual Account',
				'Masukkan nomor Virtual Account Anda',
				'Periksa informasi yang tampil di layar',
				'Konfirmasi pembayaran Anda',
				'Transaksi selesai',
			],
		},
	],
};
