import Image from 'next/image';

interface FacilitiesCardProps {
	title: string;
	imageSrc: string;
}

const FacilitiesCard: React.FC<FacilitiesCardProps> = ({ title, imageSrc }) => {
	return (
		<div className='flex flex-col justify-between bg-secondary pt-6 rounded-2xl w-[449px] h-[604px] overflow-hidden'>
			<h2 className='mx-8 mb-4 font-semibold text-secondary-foreground text-3xl text-left'>
				{title}
			</h2>

			<div className='mx-8 rounded-t-xl overflow-hidden'>
				<Image
					src={imageSrc}
					alt={title}
					width={385}
					height={408}
					className='object-cover'
				/>
			</div>
		</div>
	);
};

export default FacilitiesCard;
