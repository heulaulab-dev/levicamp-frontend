import Image from "next/image";

interface PricingCardProps {
  type: "Standard" | "VIP";
  price: string;
  features: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({ type, price, features }) => {
  return (
    <div className="bg-white rounded-2xl shadow-lg p-6 py-8 px-8 w-96 text-center border border-gray-200 mb-6">
      {/* Icon */}
      <div className="flex justify-center mb-4">
        <div className=" p-3 rounded-full">
          <Image src="/assets/icons/lightning.svg" alt="Lightning" width={40} height={40} />
        </div>
      </div>
      
      {/* Title */}
      <h3 className="text-xl font-semibold text-green-700">{type}</h3>
      
      {/* Price */}
      <p className="text-5xl font-bold text-gray-900 mt-2">
        {price}
        <span className="text-3xl font-semibold text-gray-600">/night</span>
      </p>
      
      <p className="text-gray-500 mt-4 text-base">Fits up to 4 people – no extra fees!</p>
      
      {/* Features */}
      <ul className="text-left mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Image
        src={
          type === "Standard" && (feature === "Best View" || feature === "Bath Amenities")
            ? "/assets/icons/cross-circle.svg" 
            : "/assets/icons/check-circle.svg"
        } alt="Check" width={24} height={24} />
            <span className="text-gray-700">{feature}</span>
          </li>
        ))}
      </ul>
      
      {/* Button */}
      <button className="mt-8 bg-green-600 text-white py-3 px-6 rounded-lg w-full font-semibold hover:bg-green-700 transition">
        Choose Your Tent
      </button>
    </div>
  );
};

export default PricingCard;
