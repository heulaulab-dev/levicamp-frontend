"use client";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReservationStepper from "@components/reservation/ReservationStepper";
import Link from "next/link";
import Image from "next/image";
import PersonalInfoCard from "@components/ui/personalInfoCard";
import { ToastContainer } from "react-toastify";
import SumaryPersonal from "@components/ui/summaryPersonal";

export default function CheckDetailPage() {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true); // Tambahkan state loading

  useEffect(() => {
    const storedData = localStorage.getItem("personalInfo");

    setTimeout(() => {
      if (!storedData) {
        router.push("/reservation/extras"); // Redirect jika tidak ada data
      } else {
        setPersonalInfo(JSON.parse(storedData));
      }
      setLoading(false);
    }, 1000); // Simulasi delay loading
  }, [router]);

  // Menampilkan loading spinner saat data sedang di-fetch
  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!personalInfo) return null; // Hindari error jika data kosong

  return (
    <>
      {/* Hero Section */}
      <div
        className="flex flex-col items-center bg-gradient-to-b px-4 py-10 mt-[80px] mb-24"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Image
          src="/assets/icons/camp-icon.png"
          alt="Camping Icon"
          width={50}
          height={50}
        />
        <div className="text-center mt-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-tight">
            One Last Step, take a moment to{" "}
            <span className="text-brand">review your details</span> and confirm{" "}
            <br />
            everything&apos;s set
          </h1>
        </div>
        <ToastContainer />
        <ReservationStepper />
      </div>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-12 w-full mx-auto px-[139px] mt-24 justify-center">
        <PersonalInfoCard />
        <SumaryPersonal />
      </div>

      {/* Navigation Buttons */}
      <div className="flex justify-between mt-6 px-[139px]">
        <Link href="/reservation/personal-info">
          <button className="px-6 py-3 bg-gray-300 text-gray-700 font-bold rounded-lg shadow-md hover:bg-gray-400 transition">
            Back
          </button>
        </Link>
        <Link href="/reservation/payment">
          <button className="px-6 py-3 bg-blue-500 text-white font-bold rounded-lg shadow-md hover:bg-blue-600 transition">
            Proceed to Payment
          </button>
        </Link>
      </div>
    </>
  );
}
