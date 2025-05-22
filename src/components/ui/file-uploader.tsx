'use client';

import { useRef, useState } from 'react';
import { Upload, X, Image as ImageIcon } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FileUploaderProps {
	accept?: string;
	maxFiles?: number;
	maxSize?: number; // in bytes
	onFilesChange: (files: File[]) => void;
	className?: string;
}

export function FileUploader({
	accept = '*/*',
	maxFiles = 1,
	maxSize = 5 * 1024 * 1024, // 5MB default
	onFilesChange,
	className,
}: FileUploaderProps) {
	const inputRef = useRef<HTMLInputElement>(null);
	const [files, setFiles] = useState<File[]>([]);
	const [isDragging, setIsDragging] = useState(false);
	const [previews, setPreviews] = useState<string[]>([]);
	const [error, setError] = useState<string | null>(null);

	const handleFileSelect = (selectedFiles: FileList | null) => {
		if (!selectedFiles) return;

		setError(null);

		// Check if exceeding max files
		if (selectedFiles.length > maxFiles) {
			setError(`Maksimal ${maxFiles} file yang dapat diunggah`);
			return;
		}

		const newFiles: File[] = [];
		const newPreviews: string[] = [];

		Array.from(selectedFiles).forEach((file) => {
			// Check file size
			if (file.size > maxSize) {
				setError(
					`File terlalu besar. Maksimal ${Math.floor(
						maxSize / (1024 * 1024),
					)}MB`,
				);
				return;
			}

			newFiles.push(file);

			// Generate preview for images
			if (file.type.startsWith('image/')) {
				const reader = new FileReader();
				reader.onload = (e) => {
					if (typeof e.target?.result === 'string') {
						newPreviews.push(e.target.result);
						if (newPreviews.length === newFiles.length) {
							setPreviews(newPreviews);
						}
					}
				};
				reader.readAsDataURL(file);
			}
		});

		if (newFiles.length > 0) {
			setFiles(newFiles);
			onFilesChange(newFiles);
		}
	};

	const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(true);
	};

	const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
	};

	const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
		e.preventDefault();
		setIsDragging(false);
		handleFileSelect(e.dataTransfer.files);
	};

	const removeFile = (index: number) => {
		const newFiles = [...files];
		const newPreviews = [...previews];
		newFiles.splice(index, 1);
		newPreviews.splice(index, 1);
		setFiles(newFiles);
		setPreviews(newPreviews);
		onFilesChange(newFiles);
	};

	return (
		<div className={cn('w-full', className)}>
			{error && <p className='mb-2 text-red-500 text-sm'>{error}</p>}

			{files.length === 0 ? (
				<div
					onClick={() => inputRef.current?.click()}
					onDragOver={handleDragOver}
					onDragLeave={handleDragLeave}
					onDrop={handleDrop}
					className={cn(
						'border-2 border-dashed rounded-lg p-6 transition-colors cursor-pointer flex flex-col items-center justify-center space-y-2',
						isDragging
							? 'border-primary bg-primary/10'
							: 'border-gray-300 hover:border-primary/50 hover:bg-gray-50',
					)}
				>
					<Upload className='w-8 h-8 text-gray-400' />
					<p className='font-medium text-sm'>
						Klik atau seret file untuk mengunggah bukti pembayaran
					</p>
					<p className='text-gray-500 text-xs'>
						Format: JPG, PNG, atau JPEG. Ukuran maksimum{' '}
						{Math.floor(maxSize / (1024 * 1024))}MB
					</p>
				</div>
			) : (
				<div className='space-y-4'>
					{previews.map((preview, index) => (
						<div
							key={index}
							className='relative border rounded-lg overflow-hidden'
						>
							<div className='flex items-center p-2'>
								<div className='flex-shrink-0 bg-gray-100 mr-3 rounded w-14 h-14 overflow-hidden'>
									{files[index].type.startsWith('image/') ? (
										<img
											src={preview}
											alt={files[index].name}
											className='w-full h-full object-cover'
										/>
									) : (
										<div className='flex justify-center items-center w-full h-full'>
											<ImageIcon className='w-6 h-6 text-gray-400' />
										</div>
									)}
								</div>
								<div className='flex-1 min-w-0'>
									<p className='font-medium text-gray-900 text-sm truncate'>
										{files[index].name}
									</p>
									<p className='text-gray-500 text-sm'>
										{Math.round(files[index].size / 1024)} KB
									</p>
								</div>
								<button
									type='button'
									onClick={() => removeFile(index)}
									className='flex-shrink-0 ml-2 text-gray-400 hover:text-red-500'
								>
									<X className='w-5 h-5' />
								</button>
							</div>
						</div>
					))}
					<button
						type='button'
						onClick={() => inputRef.current?.click()}
						className='flex items-center text-primary hover:text-primary/80 text-sm'
					>
						<Upload className='mr-1 w-4 h-4' />
						{maxFiles > 1 && files.length < maxFiles
							? 'Unggah file lainnya'
							: 'Ganti file'}
					</button>
				</div>
			)}

			<input
				type='file'
				ref={inputRef}
				onChange={(e) => handleFileSelect(e.target.files)}
				accept={accept}
				multiple={maxFiles > 1}
				className='hidden'
			/>
		</div>
	);
}
