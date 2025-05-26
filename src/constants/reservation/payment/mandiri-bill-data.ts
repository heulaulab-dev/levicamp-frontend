export interface MandiriBillStep {
	title: string;
	steps: string[];
}

export const mandiriBillInstructions: MandiriBillStep[] = [
	{
		title: 'ATM Mandiri',
		steps: [
			'Masukkan kartu ATM dan PIN Mandiri Anda',
			'Pilih menu "Bayar/Beli"',
			'Pilih "Multi Payment"',
			'Masukkan kode perusahaan (akan diberikan setelah pembayaran dibuat)',
			'Masukkan kode pembayaran (Bill Key)',
			'Periksa informasi yang tampil di layar',
			'Konfirmasi pembayaran',
			'Transaksi selesai, simpan struk sebagai bukti pembayaran',
		],
	},
	{
		title: 'Livin by Mandiri (Mobile Banking)',
		steps: [
			'Login ke aplikasi Livin by Mandiri',
			'Pilih menu "Pembayaran"',
			'Pilih "Multipayment"',
			'Masukkan kode perusahaan (akan diberikan setelah pembayaran dibuat)',
			'Masukkan kode pembayaran (Bill Key)',
			'Periksa informasi yang tampil di layar',
			'Konfirmasi pembayaran dengan PIN/biometrik',
			'Pembayaran selesai',
		],
	},
	{
		title: 'Internet Banking Mandiri',
		steps: [
			'Login ke Mandiri Online',
			'Pilih menu "Pembayaran"',
			'Pilih "Multi Payment"',
			'Masukkan kode perusahaan (akan diberikan setelah pembayaran dibuat)',
			'Masukkan kode pembayaran (Bill Key)',
			'Periksa informasi yang tampil di layar',
			'Konfirmasi pembayaran dengan token',
			'Pembayaran selesai',
		],
	},
	{
		title: 'Kantor Cabang Mandiri',
		steps: [
			'Kunjungi kantor cabang Bank Mandiri terdekat',
			'Ambil nomor antrean untuk transaksi pembayaran',
			'Berikan kode perusahaan dan kode pembayaran (Bill Key) kepada teller',
			'Serahkan uang tunai sesuai jumlah tagihan',
			'Terima struk pembayaran sebagai bukti transaksi',
		],
	},
];

export const mandiriBillInfo = {
	name: 'Mandiri Bill',
	description: 'Pembayaran melalui sistem Mandiri Bill Payment',
	logo: 'https://upload.wikimedia.org/wikipedia/commons/a/ad/Bank_Mandiri_logo_2016.svg',
	notes: [
		'Pembayaran Mandiri Bill hanya dapat dilakukan melalui Bank Mandiri',
		'Kode perusahaan dan Bill Key akan diberikan setelah Anda membuat pembayaran',
		'Pastikan Anda menyimpan kode pembayaran dengan aman',
		'Pembayaran dapat dilakukan 24/7 melalui ATM dan mobile banking',
	],
};
