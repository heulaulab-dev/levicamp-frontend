import Image from "next/image";

interface FacilitiesCardProps {
  title: string;
  imageSrc: string;
}

const FacilitiesCard: React.FC<FacilitiesCardProps> = ({ title, imageSrc }) => {
  return (
    <div className="bg-card pt-6 rounded-2xl shadow-md w-[449px] h-[604px] flex flex-col justify-between overflow-hidden">
      <h2 className="text-3xl font-semibold text-text-card mb-4 mx-8 text-left">{title}</h2>

      <div className="overflow-hidden rounded-xl mx-8">
        <Image
          src={imageSrc}
          alt={title}
          width={385}
          height={408}
          className="rounded-xl object-cover"
        />
      </div>
    </div>
  );
};

export default FacilitiesCard;
