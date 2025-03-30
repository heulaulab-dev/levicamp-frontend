import Image from "next/image";

interface PricingCardProps {
  type: "Standard" | "VIP";
  price: string;
  features: string[];
}

const PricingCard: React.FC<PricingCardProps> = ({ type, price, features }) => {
  return (
    <div className="bg-card rounded-2xl shadow-lg p-6 py-8 px-8 w-[594px] text-center border border-gray-200">
      {/* Title */}
      <h3 className="text-xl font-semibold text-brand border border-brand px-4 py-2 rounded-full inline-block mt-6 ">
        {type}
      </h3>

      <p className="text-text-card mt-5 text-xl">
        Start From
      </p>

      {/* Price */}
      <p className="text-5xl font-bold text-text-card mt-">
        {price}
        <span className="text-4xl font-semibold text-text-card">/night</span>
      </p>

      <div className="flex items-center justify-center mt-8 mb-8 border-t-2 border-button">
      </div>

      {/* Features */}
      <ul className="text-left mt-8 space-y-4">
        {features.map((feature, index) => (
          <li key={index} className="flex items-center space-x-2">
            <Image
              src={
                type === "Standard" &&
                (feature === "Best View" || feature === "Bath Amenities")
                  ? "/assets/icons/cross-circle.svg"
                  : "/assets/icons/check-circle.svg"
              }
              alt="Check"
              width={24}
              height={24}
            />
            <span className="text-text-card">{feature}</span>
          </li>
        ))}
      </ul>

      {/* Button */}
      <button className="mt-8 bg-button text-text-white py-3 px-6 rounded-lg w-full font-semibold hover:bg-button-hover transition">
        Choose Your Tent
      </button>
    </div>
  );
};

export default PricingCard;
