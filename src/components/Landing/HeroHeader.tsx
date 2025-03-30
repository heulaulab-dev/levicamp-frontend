import Marquee from "react-fast-marquee";
import Image from "next/image";

const Hero = () => {
  return (
    <section
      className="relative w-full min-h-screen flex flex-col md:flex-row items-center justify-between px-6 md:px-12 overflow-hidden bg-cover bg-center mt-[80px]"
      style={{ backgroundImage: "url('/bg.png')" }}
    >
      <div className="max-w-3xl text-center md:text-left relative z-10 ml-12">
        <div className="flex items-center gap-2 justify-center md:justify-start">
          <Image
            src="/assets/icons/camp-icon.png"
            alt="Tent Icon"
            width={70}
            height={70}
          />
        </div>

        <h1 className="text-4xl md:text-6xl font-bold text-brand mt-6 leading-tight">
          Your Perfect Nature <br /> Glamping Experience
        </h1>

        <p className="text-text mt-6 text-xl">
          Reconnect with nature without the hassle of planning. We take care of
          everything for you. Just pick a date, book your tent, and enjoy the
          great outdoors.
        </p>

        <button className="mt-12 bg-button hover:bg-button-hover text-text-white font-semibold w-[235px] h-[60px] px-[28px] py-[16px] rounded-lg shadow-lg transition">
          Book Your Tent Now!
        </button>
      </div>

      {/* Marquee Container */}
      <div className="relative w-full md:w-1/2 h-[500px] flex items-center justify-center z-10">
        {/* Marquee Pertama */}
        <div
          className="absolute"
          style={{
            right: "-450px",
            top: "0px",
            height: "100%",
            transform: "rotate(-65deg)",
          }}
        >
          <Marquee speed={40} direction="left" gradient={true}>
            {[...Array(10)].map((_, index) => (
              <Image
                key={index}
                src="/camp-image.png"
                alt="Camping Site"
                width={180}
                height={120}
                style={{ marginRight: "44px" }}
              />
            ))}
          </Marquee>
        </div>

        {/* Marquee Kedua */}
        <div
          className="absolute"
          style={{
            right: "-600px",
            top: "400px",
            transform: "rotate(-65deg)",
          }}
        >
          <Marquee
            speed={40}
            direction="right"
            gradient={true}
            className="flex gap-11"
          >
            {[...Array(10)].map((_, index) => (
              <Image
                key={index}
                src="/camp-image.png"
                alt="Camping Site"
                width={180}
                height={120}
                style={{ marginRight: "44px" }}
              />
            ))}
          </Marquee>
        </div>
      </div>
    </section>
  );
};

export default Hero;
