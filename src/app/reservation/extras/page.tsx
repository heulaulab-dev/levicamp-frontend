'use client';
import ReservationStepper from "@components/reservation/ReservationStepper";
import Link from "next/link";
import Image from "next/image";
import PersonalInfoCard from "@components/ui/personalInfoCard";
import { ToastContainer } from "react-toastify";
import SumaryPersonal from "@components/ui/summaryPersonal";

export default function ExtrasPage() {
  return (
    <>
      {/* Hero Section */}
      <section
        className="flex flex-col items-center bg-gradient-to-b px-4 py-10 mt-[100px] mb-24"
        style={{
          backgroundImage: "url('/bg.png')",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      >
        <Image src="/assets/icons/camp-icon.png" alt="Camping Icon" width={50} height={50} />
        <div className="text-center mt-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-tight">
            <span className="text-brand">Tell us a bit about yourself!</span>, Just fill in <br />
            your details, and we&apos;ll take care of <br /> the rest
          </h1>
        </div>
        <ToastContainer/>
        <ReservationStepper />
      </section>

      {/* Content Section */}
      <div className="flex flex-col lg:flex-row gap-12 w-full mx-auto px-[139px] mt-24 justify-center">
        <PersonalInfoCard />
        <SumaryPersonal />
      </div>

      {/* Navigation to Next Step */}
      <div className="text-center mt-6">
        <Link href="/reservation/check-detail">
          <button className="px-4 py-2 bg-blue-500 text-white rounded">Next</button>
        </Link>
      </div>
    </>
  );
}
