"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Globe, ShoppingBag, BookOpen, ShoppingCart } from "lucide-react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isHidden, setIsHidden] = useState(false);
  const lastScrollY = useRef(0);
  const pathname = usePathname(); // Cek halaman aktif

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
    { name: "Facilities", path: "/facilities", icon: Globe },
    { name: "Catalog", path: "/catalog", icon: ShoppingBag },
    { name: "Article", path: "/article", icon: BookOpen },
    { name: "Reservation", path: "/reservation", icon: ShoppingCart },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 w-full bg-black py-5 px-8 flex justify-between items-center z-50 transition-transform duration-300 ${
        isHidden ? "-translate-y-full" : "translate-y-0"
      }`}
      style={{ height: "80px" }}
    >
      {/* Logo */}
      <div className="flex items-center gap-2">
        <span className="text-brand font-semibold text-lg">Levi Camp.</span>
      </div>

      {/* Menu Desktop */}
      <div className="hidden md:flex gap-1">
        {menuItems.map((item, index) => {
          const isActive = pathname === item.path; 
          const Icon = item.icon;

          return (
            <Link
              key={index}
              href={item.path}
              className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-brand transition-all ${
                isActive ? "bg-card" : "hover:bg-card"
              }`}
            >
              <Icon
                className={`w-5 h-5 transition-all duration-300 ease-in-out ${
                  isActive ? "opacity-100 scale-100 text-brand" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                }`}
              />
              <span className="tracking-tight group-hover:tracking-normal transition-all duration-300 ease-in-out">
                {item.name}
              </span>
            </Link>
          );
        })}
      </div>

      {/* Mobile Menu Button */}
      <button className="md:hidden text-[var(--text)] text-2xl" onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? "✖" : "☰"}
      </button>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-black flex flex-col gap-4 py-4 px-8 shadow-md md:hidden">
          {menuItems.map((item, index) => {
            const isActive = pathname === item.path;
            const Icon = item.icon;

            return (
              <Link
                key={index}
                href={item.path}
                className={`group flex items-center gap-2 px-4 py-2 rounded-lg text-text transition-all ${
                  isActive ? "bg-button-hover" : "hover:bg-button"
                }`}
                onClick={() => setIsOpen(false)}
              >
                <Icon
                  className={`w-5 h-5 transition-all duration-300 ease-in-out ${
                    isActive ? "opacity-100 scale-100 text-text-white" : "opacity-0 scale-75 group-hover:opacity-100 group-hover:scale-100"
                  }`}
                />
                <span className="tracking-tight group-hover:tracking-normal transition-all duration-300 ease-in-out">
                  {item.name}
                </span>
              </Link>
            );
          })}
        </div>
      )}
    </nav>
  );
};

export default Navbar;
