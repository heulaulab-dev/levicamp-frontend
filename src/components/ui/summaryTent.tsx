"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@components/ui/card";
import { Button } from "@components/ui/Button";
import { Separator } from "@components/ui/separator";
import { Trash2 } from "lucide-react";
import { checkPrice } from "@hooks/checkPrice";
import { useEffect, useState } from "react";
import { format, differenceInDays } from "date-fns";

interface Tent {
  id: string;
  name: string;
  category?: { name: string };
  weekday_price: number;
  weekend_price: number;
  capacity: number;
}

interface SummaryTentProps {
  selectedTents: Tent[];
  onRemove: (tentId: string) => void;
  startDate: string;
  endDate: string;
}

export default function SummaryTent({ selectedTents, onRemove, startDate, endDate }: SummaryTentProps) {
  const [totalPrice, setTotalPrice] = useState<number>(0);
  const [loading, setLoading] = useState(false);
  const [loadingPerTent, setLoadingPerTent] = useState<Record<string, boolean>>({});
  const [days, setDays] = useState<number>(0);
  const [tentsWithPrices, setTentsWithPrices] = useState<Record<string, number>>({});

  useEffect(() => {
    const fetchPrice = async () => {
      setLoading(true);
      setLoadingPerTent({});
      try {
        if (selectedTents.length > 0 && startDate && endDate) {
          const data = await checkPrice(
            selectedTents.map((t) => t.id),
            startDate,
            endDate
          );

          if (data !== null) {
            setTotalPrice(data.total_price);
            const priceMap: Record<string, number> = {};
            const loadingMap: Record<string, boolean> = {};

            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            data.tents.forEach((t: any) => {
              priceMap[t.id] = t.price;
              loadingMap[t.id] = false;
            });

            setTentsWithPrices(priceMap);
            setLoadingPerTent(loadingMap);
          }
        } else {
          setTotalPrice(0);
        }
      } catch (err) {
        console.error("Failed to fetch price", err);
      } finally {
        setLoading(false);
      }
    };

    fetchPrice();
  }, [selectedTents, startDate, endDate]);

  useEffect(() => {
    const start = new Date(startDate);
    const end = new Date(endDate);

    if (startDate && endDate) {
      const diff = differenceInDays(end, start);
      setDays(diff);
    }
  }, [startDate, endDate]);

  // const tax = 15000;
  // const finalPrice = totalPrice + tax; 

  return (
    <Card className="w-[360px] p-4 shadow-md rounded-2xl border">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Reservation Summary</CardTitle>
      </CardHeader>
      <CardContent>
        {/* Section 1: Reservation Summary */}
        <div className="grid grid-cols-2 gap-4 items-center">
          <div>
            <h3 className="text-sm font-semibold text-gray-700">Check-In</h3>
            <p className="text-sm text-orange-600 font-semibold">  {startDate && (
              <p className="text-sm text-orange-600 font-semibold">
                {format(new Date(startDate), "EEE, dd MMM yyyy")}
              </p>
            )}
            </p>
            <p className="text-sm text-gray-500">From 14:00 WIB</p>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-gray-700 text-right">Check-Out</h3>
            <p className="text-sm text-orange-600 font-semibold text-right">  {endDate && (
              <p className="text-sm text-orange-600 font-semibold">
                {format(new Date(endDate), "EEE, dd MMM yyyy")}
              </p>
            )}
            </p>
            <p className="text-sm text-gray-500 text-right">To 12:00 WIB</p>
          </div>
        </div>
        <div className="mt-2 py-1 bg-text text-center text-brand font-medium rounded-md">
          {days} Day
        </div>

        <Separator className="my-3" />

        {/* Section 2: You Selected */}
        <h3 className="mt-4 font-semibold text-gray-700">You Selected</h3>
        {selectedTents.length === 0 ? (
          <p className="text-gray-500 text-sm">No tents selected.</p>
        ) : (
          selectedTents.map((tent) => (
            <div key={tent.id} className="border-b py-2">
              {/* Name & Trash Icon in the same row */}
              <div className="flex justify-between items-center">
                <p className="font-semibold text-brand">{tent.name}</p>
                <Button variant="ghost" size="icon" onClick={() => onRemove(tent.id)}>
                  <Trash2 className="w-5 h-5 text-red-500" />
                </Button>
              </div>

              {/* Tent Details */}
              <div className="grid grid-cols-2 text-sm text-gray-500 gap-2">
                <p className="font-medium text-gray-700">Category:</p>
                <p className="text-right">{tent.category?.name ?? "Unknown"}</p>

                <p className="font-medium text-gray-700">Max. Capacity:</p>
                <p className="text-right">{tent.capacity} guests</p>

                <p className="font-medium text-gray-700">Price:</p>
                {loadingPerTent[tent.id] ? (
                  <p className="text-right text-brand font-medium text-md animate-pulse">
                    Loading...
                  </p>
                ) : (
                  <p className="text-right text-brand font-medium text-md">
                    IDR {(tentsWithPrices[tent.id] ?? 0).toLocaleString("id-ID")}
                  </p>
                )}
              </div>
            </div>
          ))
        )}

        <Separator className="my-3" />
        <h3 className="font-semibold text-gray-700">Price Summary</h3>
        <div className="flex justify-between text-sm text-gray-600">
          <p>Prices</p>
          {loading ? (
            <p className="font-medium text-brand animate-pulse">
              Loading...
            </p>
          ) : (
            <p className="font-medium text-brand">
              IDR {totalPrice.toLocaleString("id-ID")}
            </p>
          )}        </div>
        {/* <div className="flex justify-between text-sm text-gray-600">
          <p>Tax</p>
          <p className="font-medium text-brand">IDR {tax.toLocaleString("id-ID")}</p>
        </div> */}

        <Separator className="my-3" />
        <div className="flex justify-between text-md font-semibold">
          <p>Total Price</p>
          {loading ? (
            <p className="font-medium text-brand animate-pulse">
              Loading...
            </p>) : (
            <p className="text-brand">
              IDR {totalPrice.toLocaleString("id-ID")}
            </p>
          )}
        </div>

        <Button className="mt-4 w-full bg-brand hover:bg-green-800 text-white py-2 rounded-lg">
          Request To Book
        </Button>
      </CardContent>
    </Card>
  );
}
