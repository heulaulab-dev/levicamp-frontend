import Image from "next/image";
import PricingCard from "@components/ui/PricingCard";

const TentPrice = () => {
  return (
    <section className="flex flex-col items-center text-center py-24 px-6 relative">
      <Image src="/assets/icons/camp-icon.png" alt="Tent Icon" width={70} height={70} />

      <h2 className="text-6xl font-semibold text-gray-900 mt-4 mb-24">
        Your Tent is Set. Your Adventure <br />
        Starts Now.
      </h2>

      <div className="flex flex-wrap justify-center gap-8 overflow-x-auto w-full my-24">
        <div className="bg-green-200 rounded-2xl p-6 flex flex-col justify-between h-[622px] w-[384px] shadow-lg text-start mb-6">
          <div>
            <h3 className="text-4xl font-semibold text-gray-900 leading-snug">
              Find Your Tent
            </h3>
            <p className="light italic text-3xl text-gray-700 mt-1">
              & Make Unforgettable Memories!
            </p>
          </div>

          <div className="flex items-center justify-between ">
            <p className="text-gray-900 text-xl leading-relaxed text-left">
              Choose your tent <br /> category and book <br /> your perfect <br /> escape.
            </p>
            <div className="bg-green-600 w-[72px] h-[72px] flex items-center justify-center rounded-full ">
              <Image
                src="/assets/icons/arrow-up-right.svg"
                alt="Arrow"
                width={30}
                height={30}
              />
            </div>
          </div>
        </div>

        <PricingCard
          type="Standard"
          price="600k"
          features={[
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
          price="900k"
          features={[
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
