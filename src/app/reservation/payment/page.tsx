"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import ReservationStepper from "@components/reservation/ReservationStepper";
import Link from "next/link";
import Image from "next/image";
import PersonalInfoCard from "@components/ui/personalInfoCard";
import { ToastContainer } from "react-toastify";
import SumaryPersonal from "@components/ui/summaryPersonal";
import { Accordion, AccordionItem } from "@components/ui/accordion";
import { Card, CardContent } from "@components/ui/card";
import { Button } from "@components/ui/button";

export default function PaymentPage() {
  const router = useRouter();
  const [personalInfo, setPersonalInfo] = useState(null);
  const [loading, setLoading] = useState(true);
  const [selectedMethod, setSelectedMethod] = useState("qris");

  useEffect(() => {
    const storedData = localStorage.getItem("personalInfo");

    setTimeout(() => {
      if (!storedData) {
        router.push("/reservation/extras");
      } else {
        setPersonalInfo(JSON.parse(storedData));
      }
      setLoading(false);
    }, 1000);
  }, [router]);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="animate-spin rounded-full h-16 w-16 border-b-4 border-blue-500"></div>
      </div>
    );
  }

  if (!personalInfo) return null;

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
        <Image src="/assets/icons/camp-icon.png" alt="Camping Icon" width={50} height={50} />
        <div className="text-center mt-4 mb-6">
          <h1 className="text-4xl md:text-5xl font-bold text-gray-100 leading-tight">
            One Last Step, take a moment to {" "}
            <span className="text-brand">review your details</span> and confirm {" "}
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

      {/* Payment Methods Selection */}
      <div className="w-full max-w-2xl mx-auto mt-12 px-[139px] justify-start">
        <h2 className="text-2xl font-semibold mb-4">Select Payment Method</h2>
        <Card className="p-4">
          <Accordion type="single" collapsible>
            {["qris", "e-wallet", "bank", "credit-card"].map((method) => (
              <AccordionItem key={method} value={method}>
                <Button
                  variant={selectedMethod === method ? "outline" : "ghost"}
                  className="w-full flex items-center justify-between p-4 border rounded-lg"
                  onClick={() => setSelectedMethod(method)}
                >
                  <div className="flex items-center gap-3">
                    {method === "qris" && "QRIS"}
                    {method === "e-wallet" && "E-Wallet"}
                    {method === "bank" && "Bank Transfer"}
                    {method === "credit-card" && "Credit Card"}
                  </div>
                  {selectedMethod === method && <span className="text-green-500">✔</span>}
                </Button>
                {selectedMethod === method && (
                  <CardContent className="mt-4">
                    {method === "qris" && (
                      <>
                        <p>Scan the QR code to complete the payment.</p>
                        <Image src="/assets/qris-logo.png" alt="QRIS" width={200} height={200} />
                      </>
                    )}
                    {method === "e-wallet" && <p>Select your preferred e-wallet and proceed with payment.</p>}
                    {method === "bank" && (
                      <>
                        <p>Transfer to the following account:</p>
                        <ul className="list-disc pl-5">
                          <li>BCA: 123-456-7890 (John Doe)</li>
                          <li>Mandiri: 987-654-3210 (John Doe)</li>
                        </ul>
                      </>
                    )}
                    {method === "credit-card" && <p>Enter your credit card details securely to proceed.</p>}
                  </CardContent>
                )}
              </AccordionItem>
            ))}
          </Accordion>
        </Card>
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
