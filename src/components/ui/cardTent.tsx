"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/Button";
import Image from "next/image";
import { Sun, Briefcase, Users } from "lucide-react";
import { Tent } from "../../types/reservations";
import { Award, Star } from "lucide-react";
import { formatToK } from "../lib/format";

interface CardTentProps {
  tent: Tent;
  isSelected: boolean;
  status: string;
  onSelect: () => void;
}

export default function CardTent({
  tent,
  isSelected,
  onSelect,
  status,
}: CardTentProps) {
  if (!tent) return <div>Loading...</div>;

  return (
    <Card
      key={tent.id}
      className="w-[258px] h-[424px] border rounded-2xl shadow-md overflow-hidden"
    >
      {/* Gambar dan Kategori */}
      <div className="relative">
        <Image
          src={tent.tent_image || "/tent-image.jpg"}
          alt={tent.name}
          width={258}
          height={182}
          className={`object-cover w-full h-[160px] ${status === "unavailable" ? "filter grayscale" : ""}`}
        />
        <span
          className={`absolute top-3 right-3 flex items-center gap-1 text-xs px-3 py-1 rounded-full font-medium ${
tent.category?.name === "VIP"
? "bg-button text-white"
: tent.category?.name === "Standart"
? "bg-white text-button"
: "bg-gray-200 text-gray-600"
}`}
        >
          {tent.category?.name === "VIP" ? (
            <Star size={14} />
          ) : tent.category?.name === "Standart" ? (
              <Award size={14} />
            ) : null}
          {tent.category?.name || "Uncategorized"}
        </span>
      </div>

      {/* Nama Tenda */}
      <CardHeader className="px-4 py-3 text-center">
        <CardTitle className="text-lg font-semibold">{tent.name}</CardTitle>
        <div className="flex justify-center items-center text-sm text-gray-500 mt-1">
          <Users size={16} className="mr-2" /> Up to{" "}
          <b className="ml-1">{tent.capacity} guests</b>
        </div>
      </CardHeader>

      <CardContent className="px-4 pb-4 flex flex-col h-full">
        {/* Harga Weekday */}
        <div className="flex justify-between items-center text-md mt-3">
          <span className="flex items-center gap-1 text-gray-700">
            <Briefcase size={16} />
            Weekday:
          </span>
          <b className="text-gray-900">
            {formatToK(tent.weekday_price ?? 0)}
            <span className="text-xs font-normal"> /night</span>
          </b>
        </div>

        {/* Harga Weekend */}
        <div className="flex justify-between items-center text-md mt-1">
          <span className="flex items-center gap-1 text-gray-700">
            <Sun size={16} />
            Weekend:
          </span>
          <b className="text-gray-900">
            {formatToK(tent.weekend_price ?? 0)}
            <span className="text-xs font-normal"> /night</span>
          </b>
        </div>

        {/* Status & Tombol Select */}
        <div className="flex items-center justify-between mt-[41px]">
          {/* Status Available / Booked */}
          <span
            className={`text-sm flex items-center px-3 py-1 rounded-full font-medium ${
status === "available"
? "bg-green-100 text-green-700"
: "bg-red-500 text-white"
}`}
          >
            {status === "available" ? "Available" : "Booked"}
          </span>

          {/* Tombol Select / Not Available */}
          <Button
            className={`w-[110px] ${
status === "available"
? "bg-button hover:bg-button-hover"
: "bg-gray-300"
}`}
            disabled={status !== "available"}
            onClick={onSelect}
          >
            {status === "available"
              ? isSelected
                ? "Selected"
                : "Select"
              : "Not Available"}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
