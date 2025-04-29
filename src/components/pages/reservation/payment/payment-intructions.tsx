'use client';

import { useState } from 'react';
import { ChevronDown } from 'lucide-react';
import { cn } from '@/lib/utils';

interface PaymentInstructionsProps {
	bankName: string;
	vaNumber: string;
}

export function PaymentInstructions({
	bankName,
	vaNumber,
}: PaymentInstructionsProps) {
	const [openSection, setOpenSection] = useState<string | null>(null);

	const toggleSection = (section: string) => {
		setOpenSection(openSection === section ? null : section);
	};

	const paymentMethods = [
		{
			id: 'atm',
			title: `ATM ${bankName}`,
			steps: [
				'Masukkan kartu ATM & PIN',
				'Pilih menu Transaksi Lainnya > Transfer > Ke Rek BCA Virtual Account',
				`Masukkan nomor Virtual Account ${vaNumber}`,
				'Konfirmasi detail pembayaran',
				'Pembayaran selesai',
			],
		},
		{
			id: 'mobile',
			title: `m-${bankName} (${bankName} mobile)`,
			steps: [
				'Login ke aplikasi m-BCA',
				'Pilih m-Transfer > BCA Virtual Account',
				`Masukkan nomor Virtual Account ${vaNumber}`,
				'Konfirmasi detail pembayaran',
				'Masukkan PIN m-BCA',
				'Pembayaran selesai',
			],
		},
		{
			id: 'internet',
			title: `Internet Banking ${bankName}`,
			steps: [
				'Login ke KlikBCA',
				'Pilih Transfer Dana > Transfer ke BCA Virtual Account',
				`Masukkan nomor Virtual Account ${vaNumber}`,
				'Klik Lanjutkan',
				'Konfirmasi detail pembayaran',
				'Masukkan respon KeyBCA appli 1',
				'Pembayaran selesai',
			],
		},
		{
			id: 'branch',
			title: `Kantor Bank ${bankName}`,
			steps: [
				'Ambil nomor antrean',
				'Isi formulir setoran tunai',
				`Masukkan nomor Virtual Account ${vaNumber} sebagai rekening tujuan`,
				'Serahkan formulir dan uang ke teller',
				'Simpan slip setoran sebagai bukti pembayaran',
			],
		},
	];

	return (
		<div className='space-y-4'>
			{paymentMethods.map((method) => (
				<div key={method.id} className='border rounded-lg overflow-hidden'>
					<button
						onClick={() => toggleSection(method.id)}
						className='flex justify-between items-center bg-white hover:bg-gray-50 p-4 w-full text-left transition-colors'
					>
						<span className='font-medium text-gray-800'>{method.title}</span>
						<ChevronDown
							className={cn(
								'w-5 h-5 text-gray-500 transition-transform duration-200',
								openSection === method.id && 'transform rotate-180',
							)}
						/>
					</button>
					<div
						className={cn(
							'overflow-hidden transition-all duration-300 ease-in-out',
							openSection === method.id
								? 'max-h-96 opacity-100'
								: 'max-h-0 opacity-0',
						)}
					>
						<div className='bg-gray-50 p-4'>
							<ol className='space-y-3'>
								{method.steps.map((step, index) => (
									<li key={index} className='flex gap-3'>
										<span className='flex flex-shrink-0 justify-center items-center bg-green-100 rounded-full w-6 h-6 text-green-800 text-sm'>
											{index + 1}
										</span>
										<span className='text-gray-700'>{step}</span>
									</li>
								))}
							</ol>
						</div>
					</div>
				</div>
			))}
		</div>
	);
}
