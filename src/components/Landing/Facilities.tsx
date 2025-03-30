import Image from "next/image";
import { useRef, useState, useEffect } from "react";
import { motion, useAnimation } from "framer-motion";
import FacilitiesCard from "@components/ui/facilitiesCard";
import { Bookmark, ArrowUpRight, ArrowRight, ArrowLeft } from "lucide-react";

const facilities = [
  {
    title:
      "Escape the city, breathe in fresh air, and soak in stunning valley views.",
    imageSrc: "/assets/Toilet.png",
  },
  {
    title:
      "Cozy, spacious tents with comfy beds and everything you need to chill.",
    imageSrc: "/assets/waterfall.png",
  },
  {
    title:
      "Stay fresh & connected with clean restrooms, free Wi-Fi, and breakfast on us.",
    imageSrc: "/assets/wifi.png",
  },
  {
    title: "Wake up to a free breakfast every morning.",
    imageSrc: "/assets/Toilet.png",
  },
  {
    title: "Experience the thrill off-road ATV rides.",
    imageSrc: "/assets/waterfall.png",
  },
];

const HardSellingSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [scrollIndex, setScrollIndex] = useState(0);
  const controls = useAnimation();

  useEffect(() => {
    controls.start({
      x: -scrollIndex * 460,
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [scrollIndex, controls]);

  const handlePrev = () => {
    setScrollIndex((prev) => Math.max(prev - 1, 0));
  };

  const handleNext = () => {
    setScrollIndex((prev) => Math.min(prev + 1, facilities.length - 1));
  };

  return (
    <section
      ref={sectionRef}
      className="flex flex-col items-center text-center pt-24 mb-24 relative text-text"
    >
      <Image
        src="/assets/icons/camp-icon.png"
        alt="Tent Icon"
        width={70}
        height={70}
      />

      <h2 className="text-6xl font-semibold mt-4 mb-48 text-text-secondary">
        Your Campsite is Waiting. No Setup, <br /> No Stress.
      </h2>

      <div className="pl-28 relative w-full">
        <div className="flex items-center justify-between w-full mb-3">
          <div className="flex items-center gap-2 border rounded-lg px-[18px] py-2.5 mb-12 bg-card text-text-card shadow-md">
            <Bookmark className="w-5 h-5 text-current" />
            Our Facilities
          </div>

          <div className="flex gap-4 mr-28 mb-12">
            <button
              onClick={handlePrev}
              className="w-15 h-15 flex items-center justify-center rounded-full bg-button hover:bg-button-hover transition"
            >
              <ArrowLeft className="w-7 h-7 text-white group-hover:text-brand p-1" />
            </button>
            <button
              onClick={handleNext}
              className="w-15 h-15 flex items-center justify-center rounded-full bg-button hover:bg-button-hover transition"
            >
              <ArrowRight className="w-7 h-7 text-white group-hover:text-brand p-1" />
            </button>
          </div>
        </div>

        <div className="overflow-x-hidden relative">
          <motion.div animate={controls} className="flex gap-6">
            {facilities.map((facility, index) => (
              <motion.div
                key={index}
                className="snap-center flex-shrink-0 w-[449px]"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <FacilitiesCard {...facility} />
              </motion.div>
            ))}

            {/* Find Your Tent Card masuk ke dalam barisan */}
            <motion.div
              className="group snap-center flex-shrink-0 bg-card rounded-2xl p-6 flex flex-col justify-between h-[604px] w-[449px] shadow-lg text-start hover:bg-brand text-gray-900 hover:text-white"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: facilities.length * 0.1 }}
            >
              <div>
                <h3 className="text-6xl font-semibold italic leading-snug">
                  Find Out More !
                </h3>
              </div>

              <div className="flex items-center justify-between">
                <p className="text-xl leading-relaxed">
                  And see what&apos;s waiting <br /> for you
                </p>
                <div className="bg-brand group-hover:bg-white w-[72px] h-[72px] flex items-center justify-center rounded-full">
                  <ArrowUpRight className="w-8 h-8 text-white group-hover:text-brand" />
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HardSellingSection;
