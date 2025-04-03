import Image from "next/image";
import PricingCard from "@components/ui/PricingCard";
import { Award } from "lucide-react";

const TentPrice = () => {
  return (
    <section className="flex flex-col items-center text-center py-24 px-6 relative">
      <Image
        src="/assets/icons/camp-icon.png"
        alt="Tent Icon"
        width={70}
        height={70}
      />

      <h2 className="text-6xl font-semibold text-[var(--text)] mt-4 mb-24">
        Your Tent is Set. Your Adventure <br />
        Starts Now.
      </h2>

      <div className="relative w-full pl-32 mt-24">
        <div className="flex items-center gap-2 bg-card text-text-card px-5 py-2.5 rounded-lg shadow-md mb-12 w-max">
          <Award className="w-5 h-5" />
          <span>Our Tent Category</span>
        </div>
      </div>

      <div className="flex flex-wrap justify-center gap-8 overflow-x-auto w-full mb-24">
        <PricingCard
          type="Standard"
          price="400k"
          features={[
            "Fits up to 4 people - no extra fees!",
            "Best View",
            "Free Access to the Waterfall",
            "Free Breakfast",
            "Welcome Drink",
            "Cooking Equipment",
            "Bath Amenities",
          ]}
        />
        <PricingCard
          type="VIP"
          price="550k"
          features={[
            "Fits up to 4 people - no extra fees!",
            "Best View",
            "Free Access to the Waterfall",
            "Free Breakfast",
            "Welcome Drink",
            "Cooking Equipment",
            "Bath Amenities",
          ]}
        />
      </div>
    </section>
  );
};

export default TentPrice;
