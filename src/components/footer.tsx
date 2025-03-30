import Image from "next/image";

const Footer = () => {
  return (
    <>
      {/* 🔹 Our Location Section */}
      <div className="bg-card py-24 text-center">
        <h2 className="text-4xl font-semibold text-text-card">Our Location</h2>
        <p className="text-text-card mt-5">Find us and reconnect with nature.</p>

        {/* Map Section */}
        <div className="relative w-full max-w-5xl mx-auto mt-16">
          <Image
            src="/assets/map-indonesia.png"
            alt="Indonesia Map"
            width={800}
            height={450}
            className="w-full object-contain"
          />

          {/* Location Marker */}
          <div className="absolute sm:left-[7%] md:left-[7%] lg:left-[10%] top-[71%] flex flex-col items-center group cursor-pointer transition-all duration-300">
            <div className="bg-button w-4 h-4 rounded-full animate-ping"></div>
            <div className="bg-button w-4 h-4 rounded-full mt-[-15px]"></div>

            {/* Location Info Card */}
            <div className="bg-button-hover text-text-white rounded-lg p-4 mt-3 shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300">
              <p className="font-semibold">Bogor, IND</p>
              <p className="text-sm">
                Curug Cibogo, Cibeureum, Kec. Cisarua, <br />
                Kabupaten Bogor, Jawa Barat 16750
              </p>
            </div>
          </div>
        </div>

        {/* Contact Section */}
        <div className="w-full max-w-screen-xl mx-auto flex justify-center items-center border-t-4 border-button px-28 mt-20 pt-6 mb-20">
          <div className="w-1/2 text-center">
            <h3 className="text-xl font-semibold text-text-card mt-6">Email</h3>
            <p className="text-text-card mt-2">hello@levicamp.com</p>
          </div>
          <div className="w-1/2 text-center">
            <h3 className="text-xl font-semibold text-text-card mt-6">WhatsApp</h3>
            <p className="text-text-card mt-2">+62 858 8515 9279</p>
          </div>
        </div>
      </div>

      {/* 🔹 Footer Utama */}
      <footer className="bg-card py-12 px-32">
        <div className="container mx-auto flex flex-col items-center text-center px-6">
          {/* Top Footer Section */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center border-b border-text-secondary pb-6">
            <div className="flex flex-col items-center md:items-start mb-8">
              <div className="flex items-center gap-2 pb-5">
                <Image
                  src="/assets/logo.svg"
                  alt="Levi Camp"
                  width={32}
                  height={32}
                />
                <h2 className="text-2xl font-semibold text-text-card">Levi Camp.</h2>
              </div>
              <nav className="flex gap-8 mt-2 text-text-card font-regular">
                <a href="#">Facilities</a>
                <a href="#">Article</a>
                <a href="#">Catalog</a>
                <a href="#">Reservation</a>
                <a href="#">Contact Us</a>
              </nav>
            </div>

            {/* Subscribe Section */}
            <div className="mt-6 mb-8 md:mt-0 flex flex-col items-center md:items-start">
              <p className="text-text-card font-medium mb-5">Stay up to date</p>
              <div className="flex gap-4">
                <input
                  type="email"
                  placeholder="Enter your email"
                  className="w-[229px] h-[44px] px-4 rounded-lg border border-text-secondary focus:outline-none focus:ring-2 focus:ring-button"
                />
                <button className="w-[115px] h-[44px] bg-button text-text-white rounded-lg hover:bg-button-hover transition">
                  Subscribe
                </button>
              </div>
            </div>
          </div>

          {/* Copyright */}
          <div className="w-full flex flex-col md:flex-row justify-between items-center text-text-card mt-8">
            <p>© 2025 Levi Camp. All rights reserved.</p>
            <div className="flex gap-6">
              <a href="#">Terms</a>
              <a href="#">Privacy</a>
              <a href="#">Cookies</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
