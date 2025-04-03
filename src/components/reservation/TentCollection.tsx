"use client";

import CardTent from "@components/ui/cardTent";
import SummaryTent from "@components/ui/summaryTent";
import { useState } from "react";
import { Tent } from "../../types/reservations";
import { Award, Grid, Tent as TentIcon, Star } from "lucide-react";

interface TentCollectionProps {
  categories:
  | {
    id: string;
    name: string;
    status?: string;
    tents: Tent[];
  }[]
  | null;
  loading: boolean;
  error: string | null;
}

export default function TentCollection({ loading, error, categories }: TentCollectionProps) {
  const [selectedTents, setSelectedTents] = useState<number[]>([]);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  const reservationData = categories ?? [];
  const filteredCategories =
    selectedCategory === "All" ? reservationData : reservationData.filter(category => category.name === selectedCategory);

  const handleSelectTent = (tentId: number | string) => {
    setSelectedTents(prev => {
      const newId = Number(tentId);
      return prev.includes(newId) ? prev : [...new Set([...prev, newId])];
    });
  };

  return (
    <div className="flex gap-[50px] ml-20">
      {/* SECTION KIRI */}
      <div className="w-2/3 flex flex-col gap-6">
        {/* Header Section */}
        <div className="relative flex items-center justify-between">
          <div className="flex items-center gap-2 bg-card text-text-card px-5 py-2.5 rounded-lg shadow-md">
            <Award className="w-5 h-5" />
            <span>Our Tent Category</span>
          </div>
          <div className="flex items-center gap-2 bg-black p-1 rounded-lg shadow-md">
            {[
              { name: "All", icon: <Grid className="w-4 h-4" /> },
              { name: "Standart", icon: <TentIcon className="w-4 h-4" /> },
              { name: "VIP", icon: <Star className="w-4 h-4" /> },
            ].map(category => (
                <button
                  key={category.name}
                  className={`flex items-center gap-2 px-4 py-2 rounded-md transition-all duration-200 ease-in-out ${
selectedCategory === category.name
? "bg-orange-500 text-white shadow-md"
: "bg-transparent text-gray-400 hover:bg-gray-700 hover:text-white"
}`}
                  onClick={() => setSelectedCategory(category.name)}
                >
                  {category.icon}
                  {category.name}
                </button>
              ))}
          </div>
        </div>

        {/* Loading & Error Handling */}
        {loading && <p className="text-center">Loading reservations...</p>}
        {error && <p className="text-center text-red-500">{error}</p>}

        {/* Tent List */}
        {!loading && !error && (
          <div className="grid grid-cols-3 gap-4">
            {filteredCategories.length > 0 ? (
              filteredCategories.flatMap(category =>
                category.tents.map(tent => (
                  <CardTent
                    key={tent.id}
                    status={category.id === "unavailable" ? "unavailable" : "available"}
                    tent={{
                      ...tent,
                      category: tent.category ?? {
                        id: category.id,
                        name: category.name,
                        price: 0,
                        description: "",
                        tents: [],
                      },
                    }}
                    isSelected={selectedTents.includes(Number(tent.id))}
                    onSelect={() => handleSelectTent(tent.id)}
                  />
                ))
              )
            ) : (
                <p className="text-gray-500 col-span-3 text-center">No tents available</p>
              )}
          </div>
        )}
      </div>

      {/* SECTION KANAN (Summary Card) */}
      <div className="w-1/3">
        <SummaryTent
          selectedTents={
            selectedTents
            .map(id => (categories ?? []).flatMap(category => category.tents).find(tent => Number(tent.id) === id))
            .filter(Boolean) as Tent[]
          }

        />
      </div>
    </div>
  );
}
