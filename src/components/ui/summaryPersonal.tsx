"use client";

import { useState } from "react";
import Image from "next/image"; // Import next/image
import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/Button";
import { Separator } from "@components/ui/separator";
import { Trash2 } from "lucide-react";

interface Tent {
  id: string;
  name: string;
  image: string;
  category?: { name: string };
  max_capacity: number;
  weekend_price: number;
}

interface SummaryTentProps {
  selectedTents: Tent[];
  onRemove: (tentId: string) => void;
}

function SummaryPersonal({ selectedTents, onRemove }: SummaryTentProps) {
  const totalPrice = selectedTents.reduce((sum, tent) => sum + tent.weekend_price, 0);
  const tax = 15000;
  const finalPrice = totalPrice + tax;

  return (
    <Card className="w-[557px] p-4 shadow-md rounded-2xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Reservation Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Check-In</h3>
            <p className="text-sm text-orange-600 font-semibold">Sun, 22 Feb 2025</p>
            <p className="text-sm text-gray-500">From 14:00 WIB</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 text-right">Check-Out</h3>
            <p className="text-sm text-orange-600 font-semibold text-right">Mon, 23 Feb 2025</p>
            <p className="text-sm text-gray-500 text-right">To 11:00 WIB</p>
          </div>
        </div>
        <div className="mt-2 py-1 bg-orange-100 text-center text-orange-600 font-medium rounded-md">
          1 Day
        </div>
        <Separator className="my-3" />
        <h3 className="mt-4 font-semibold text-gray-700">You Selected</h3>
        {selectedTents.length === 0 ? (
          <p className="text-gray-500 text-sm">No tents selected.</p>
        ) : (
            selectedTents.map((tent) => (
              <div key={tent.id} className="flex items-center gap-3 border-b py-3">
                <div className="relative w-16 h-16 rounded-md overflow-hidden">
                  <Image
                    src={tent.image}
                    alt={tent.name}
                    layout="fill"
                    objectFit="cover"
                    className="rounded-md"
                  />
                </div>
                <div className="flex-1">
                  <p className="font-semibold text-orange-600">{tent.name}</p>
                  <p className="text-sm text-gray-500">Category: {tent.category?.name ?? "Unknown"}</p>
                  <p className="text-sm text-gray-500">Max. Capacity: {tent.max_capacity} guests</p>
                  <p className="text-sm font-medium text-orange-600">
                    IDR {tent.weekend_price.toLocaleString("id-ID")}
                  </p>
                </div>
                <Button variant="ghost" size="icon" onClick={() => onRemove(tent.id)}>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </div>
            ))
          )}
        <Separator className="my-3" />
        <h3 className="font-semibold text-gray-700">Price Summary</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <p>Prices</p>
          <p className="font-medium text-orange-600">IDR {totalPrice.toLocaleString("id-ID")}</p>
        </div>
        <div className="flex justify-between text-sm text-gray-600">
          <p>Tax</p>
          <p className="font-medium text-orange-600">IDR {tax.toLocaleString("id-ID")}</p>
        </div>
        <Separator className="my-3" />
        <div className="flex justify-between text-md font-semibold">
          <p>Total Price</p>
          <p className="text-orange-600">IDR {finalPrice.toLocaleString("id-ID")}</p>
        </div>
        <Button className="mt-4 w-full bg-orange-600 hover:bg-orange-700 text-white py-2 rounded-lg">
          Request To Book
        </Button>
      </CardContent>
    </Card>
  );
}

export default function App() {
  const [selectedTents, setSelectedTents] = useState<Tent[]>([
    {
      id: "1",
      name: "Standard Tent 1",
      image: "/tents/tent1.jpg",
      category: { name: "Standard" },
      max_capacity: 4,
      weekend_price: 530000,
    },
    {
      id: "2",
      name: "VIP Tent 1",
      image: "/tents/tent2.jpg",
      category: { name: "VIP" },
      max_capacity: 4,
      weekend_price: 730000,
    },
  ]);

  const handleRemoveTent = (tentId: string) => {
    setSelectedTents((prevTents) => prevTents.filter((tent) => tent.id !== tentId));
  };

  return <SummaryPersonal selectedTents={selectedTents} onRemove={handleRemoveTent} />;
}
