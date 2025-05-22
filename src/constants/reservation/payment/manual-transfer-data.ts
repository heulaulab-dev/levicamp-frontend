export const manualTransferInstructions = {
	bankName: 'BCA',
	accountNumber: '1080950752',
	accountName: 'Anwal Arif Pamungkas',
	importantNotes: [
		'Mohon lakukan pembayaran hanya ke rekening di atas. Kami tidak bertanggung jawab atas kerugian yang timbul akibat pembayaran ke rekening lain.',
		'Pembayaran harus diselesaikan dalam waktu 20 menit setelah melakukan booking.',
		'Jika pembayaran belum diterima, reservasi Anda akan otomatis dibatalkan.',
	],
	confirmationNotes: [
		'Anda telah melakukan pembayaran sesuai instruksi di atas.',
		'Anda menerima e-mail Booking Confirmation dan Reminder Check-in dari kami.',
	],
	paymentSteps: [
		{
			title: 'ATM BCA',
			steps: [
				'Masukkan kartu ATM dan PIN BCA Anda',
				'Pilih menu "Transaksi Lainnya" > "Transfer" > "Ke Rek. BCA"',
				'Masukkan nomor rekening 1080950752',
				'Masukkan jumlah transfer sesuai dengan total tagihan',
				'Periksa kembali data transfer Anda, pastikan nomor rekening dan jumlah sudah benar',
				'Konfirmasi pembayaran dan simpan bukti transfer',
			],
		},
		{
			title: 'Mobile Banking BCA',
			steps: [
				'Login ke aplikasi BCA Mobile',
				'Pilih "m-Transfer" > "Transfer"',
				'Pilih "Daftar Transfer" atau "Rekening Baru"',
				'Masukkan nomor rekening 1080950752 a.n. Anwal Arif Pamungkas',
				'Masukkan jumlah transfer sesuai dengan total tagihan',
				'Periksa kembali data transfer Anda',
				'Masukkan PIN m-BCA Anda untuk konfirmasi',
				'Simpan bukti transfer',
			],
		},
		{
			title: 'Internet Banking BCA',
			steps: [
				'Login ke KlikBCA',
				'Pilih "Transfer Dana" > "Transfer ke Rekening BCA"',
				'Masukkan nomor rekening 1080950752 dan nominal transfer',
				'Periksa kembali data transfer Anda',
				'Masukkan respon KeyBCA appli 1',
				'Simpan bukti transfer',
			],
		},
	],
};
