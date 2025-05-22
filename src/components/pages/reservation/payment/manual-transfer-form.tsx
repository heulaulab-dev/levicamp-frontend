'use client';

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent } from '@/components/ui/card';
import { FileUploader } from '@/components/ui/file-uploader';
import { useForm } from 'react-hook-form';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react';
import { useRouter } from 'next/navigation';
import { usePayment } from '@/hooks/payments/use-payments';

interface TransferFormData {
	accountName: string;
	bankName: string;
	accountNumber: string;
	proofImage?: File;
}

interface ManualTransferFormProps {
	bookingId: string;
	paymentId?: string;
}

export function ManualTransferForm({
	bookingId,
	paymentId,
}: ManualTransferFormProps) {
	const router = useRouter();
	const { confirmManualPayment } = usePayment();
	const [isSubmitting, setIsSubmitting] = useState(false);
	const [proofImage, setProofImage] = useState<File | null>(null);

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = useForm<TransferFormData>();

	const onSubmit = async (data: TransferFormData) => {
		if (!proofImage) {
			toast.error('Bukti pembayaran wajib diunggah');
			return;
		}

		try {
			setIsSubmitting(true);

			// Create FormData for file upload
			const formData = new FormData();
			formData.append('accountName', data.accountName);
			formData.append('bankName', data.bankName);
			formData.append('accountNumber', data.accountNumber);
			formData.append('proofImage', proofImage);
			if (paymentId) formData.append('paymentId', paymentId);

			await confirmManualPayment(bookingId, formData);

			toast.success('Konfirmasi pembayaran berhasil dikirim');

			// Redirect to payment status page
			router.push(`/reservation/payment/status/${bookingId}`);
		} catch (error) {
			console.error('Error submitting payment confirmation:', error);
			toast.error(
				error instanceof Error
					? error.message
					: 'Gagal mengirim konfirmasi pembayaran',
			);
		} finally {
			setIsSubmitting(false);
		}
	};

	const handleFileChange = (files: File[]) => {
		if (files.length > 0) {
			setProofImage(files[0]);
		} else {
			setProofImage(null);
		}
	};

	return (
		<Card className='mt-6 w-full'>
			<CardContent className='p-6'>
				<h3 className='mb-4 font-semibold text-lg'>Informasi Bank Transfer</h3>
				<p className='mb-6 text-gray-600 text-sm'>
					Mohon isi informasi bank yang digunakan saat melakukan transfer.
				</p>

				<form onSubmit={handleSubmit(onSubmit)}>
					<div className='space-y-4'>
						<div className='space-y-2'>
							<Label htmlFor='accountName'>Nama sesuai rekening</Label>
							<Input
								id='accountName'
								placeholder='contoh: Anwal Arif Pamungkas'
								{...register('accountName', {
									required: 'Nama rekening wajib diisi',
								})}
							/>
							{errors.accountName && (
								<p className='text-red-500 text-sm'>
									{errors.accountName.message}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='bankName'>Nama Bank</Label>
							<Input
								id='bankName'
								placeholder='contoh: Bank Central Asia'
								{...register('bankName', { required: 'Nama bank wajib diisi' })}
							/>
							{errors.bankName && (
								<p className='text-red-500 text-sm'>
									{errors.bankName.message}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label htmlFor='accountNumber'>Nomor Rekening</Label>
							<Input
								id='accountNumber'
								placeholder='contoh: 1080950752'
								{...register('accountNumber', {
									required: 'Nomor rekening wajib diisi',
								})}
							/>
							{errors.accountNumber && (
								<p className='text-red-500 text-sm'>
									{errors.accountNumber.message}
								</p>
							)}
						</div>

						<div className='space-y-2'>
							<Label>Bukti Pembayaran</Label>
							<FileUploader
								accept='image/*'
								maxFiles={1}
								maxSize={5 * 1024 * 1024} // 5MB
								onFilesChange={handleFileChange}
							/>
							{!proofImage && (
								<p className='text-red-500 text-sm'>
									Bukti pembayaran wajib diunggah
								</p>
							)}
							<p className='text-gray-500 text-xs'>
								Format: JPG, PNG, atau JPEG. Ukuran maksimum 5MB.
							</p>
						</div>

						<Button
							type='submit'
							className='mt-4 w-full'
							disabled={isSubmitting}
						>
							{isSubmitting ? (
								<>
									<Loader2 className='mr-2 w-4 h-4 animate-spin' />
									Mengirim...
								</>
							) : (
								'Konfirmasi Pembayaran'
							)}
						</Button>
					</div>
				</form>
			</CardContent>
		</Card>
	);
}
