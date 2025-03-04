"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      if (currentScrollY > lastScrollY.current && currentScrollY > 50) {
        setIsHidden(true);
      } else {
        setIsHidden(false);
      }
      lastScrollY.current = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const menuItems = [
    { name: "Facilities", icon: "assets/icons/globe.svg" },
    { name: "Catalog", icon: "assets/icons/catalog.svg" },
    { name: "Article", icon: "assets/icons/article.svg" },
    { name: "Reservation", icon: "assets/icons/cart.svg" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-white/80 backdrop-blur-md py-5 px-8 flex justify-between items-center z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ height: "80px" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-green-700 font-semibold text-lg">Levi Camp.</span>
      </div>

      {/* Menu Desktop */}
      <div className="hidden md:flex gap-1">
        {menuItems.map((item, index) => (
          <Link
            key={index}
            href={`#${item.name.toLowerCase()}`}
            className="group flex items-center gap-1 px-4 py-2 rounded-lg text-green-800 hover:bg-green-200 transition-all"
          >
            <div className="w-5 h-5 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
              <Image src={item.icon} alt={`${item.name} Icon`} width={20} height={20} />
            </div>
            <span className="tracking-tight group-hover:tracking-normal transition-all duration-300 ease-in-out">
              {item.name}
            </span>
          </Link>
        ))}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-green-800 text-2xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-white/90 backdrop-blur-md flex flex-col gap-4 py-4 px-8 shadow-md md:hidden">
          {menuItems.map((item, index) => (
            <Link
              key={index}
              href={`#${item.name.toLowerCase()}`}
              className="group flex items-center gap-1 px-4 py-2 rounded-lg text-green-800 hover:bg-green-200 transition-all"
              onClick={() => setIsOpen(false)}
            >
              <div className="w-5 h-5 opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100 transition-all duration-300 ease-in-out">
                <Image src={item.icon} alt={`${item.name} Icon`} width={20} height={20} />
              </div>
              <span className="tracking-tight group-hover:tracking-normal transition-all duration-300 ease-in-out">
                {item.name}
              </span>
            </Link>
          ))}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
