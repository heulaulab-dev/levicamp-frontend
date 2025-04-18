// components/layout/hero-section.tsx
import Image from 'next/image';

type HeroSectionProps = {
	iconSrc?: string;
	title: React.ReactNode;
	children?: React.ReactNode;
};

const HeroSection = ({
	iconSrc = '/assets/icons/camp-icon.png',
	title,
	children,
}: HeroSectionProps) => {
	return (
		<section
			className='flex flex-col justify-center items-center bg-gradient-to-b mt-20 px-4 py-10 min-h-screen'
			style={{
				backgroundImage: "url('/bg.png')",
				backgroundSize: 'cover',
				backgroundPosition: 'center',
				backgroundRepeat: 'no-repeat',
			}}
		>
			{/* Header */}
			<div className='flex flex-col items-center'>
				{iconSrc && (
					<Image src={iconSrc} alt='Section Icon' width={50} height={50} />
				)}

				<div className='mt-4 mb-6 max-w-3xl text-center'>
					<h1 className='font-bold text-primary dark:text-primary-foreground text-4xl md:text-5xl leading-tight'>
						{title}
					</h1>
				</div>
			</div>

			{/* Slot Content */}
			<div className='flex flex-col items-center w-full max-w-3xl'>
				{children}
			</div>
		</section>
	);
};

export default HeroSection;
