'use client'

import { HeroHeader } from "@components/reservation/HeroHeader";
import { useEffect } from "react";
// import TentCollection from "@components/reservation/TentCollection";

export default function ReservationPage() {
    useEffect(() => {
      localStorage.removeItem("reservation_body");
      localStorage.removeItem("reservation_search");
    }, []);
 
    return (
    <div className="bg-black">
      <HeroHeader />
      {/* <TentCollection/> */}
    </div>
  );
}
