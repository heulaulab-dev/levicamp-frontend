import { useReservations } from "@hooks/useReservations"; // Import custom hook
import { format, isBefore, startOfToday } from "date-fns";
import { CalendarIcon } from "lucide-react";
import { Button } from "@components/ui/button";
import { Calendar } from "@components/ui/calendar";
import { Card, CardContent } from "@components/ui/card";
import { useState } from "react";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@components/ui/select";
import Image from "next/image";
import TentCollection from "@components/reservation/TentCollection";

export function HeroHeader() {
  const today = startOfToday();
  const {
    date,
    setDate,
    reservationData,
    loading,
    error,
    handleSearch,
    showResults,
    setSelectedCategory,
    selectedCategory,
  } = useReservations(); 

  const [tempSelectedCategory, setTempSelectedCategory] = useState(selectedCategory);

  return (
    <>
      <section
        className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-b px-4 py-10 mt-[80px]"
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
            Your <span className="text-brand">Reservation</span>, Your Way! <br />
            Fast, Flexible, and hassle-free. Book <br /> now and take control of
            your plans <br />
            today!
          </h1>
        </div>

        {/* Form Reservasi */}
        <div className="bg-card shadow-md rounded-lg p-6 w-full max-w-3xl flex flex-col md:flex-row items-center gap-4">
          <div className="w-full">
            <label className="text-sm font-medium text-text-card">Category</label>
            <Select onValueChange={setTempSelectedCategory}>
              <SelectTrigger className="w-full bg-white text-text-card">
                <SelectValue placeholder="All" />
              </SelectTrigger>
              <SelectContent className="bg-white">
                <SelectItem className="text-text-card" value="All">
                  All
                </SelectItem>
                <SelectItem className="text-text-card" value="VIP">
                  VIP
                </SelectItem>
                <SelectItem className="text-text-card" value="Standart">
                  Standart
                </SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full">
            <label className="text-sm font-medium text-text-card">
              Booking Date
            </label>
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant="outline"
                  className="w-full flex justify-between bg-white text-text-card"
                >
                  {date?.from ? (
                    date.to ? (
                      <>
                        {format(date.from, "PPP")} - {format(date.to, "PPP")}
                      </>
                    ) : (
                      format(date.from, "PPP")
                    )
                  ) : (
                    "Select date range"
                  )}
                  <CalendarIcon className="ml-2 h-4 w-4" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0">
                <Calendar
                  mode="range"
                  selected={date}
                  onSelect={setDate}
                  numberOfMonths={2}
                  className="rounded-md border"
                  disabled={(date) => isBefore(date, today)}
                />
              </PopoverContent>
            </Popover>
          </div>

          <Button
            className="bg-button hover:bg-button-hover text-white px-6 py-2 rounded-lg"
            onClick={() => {
              setSelectedCategory(tempSelectedCategory); 
              handleSearch();
            }}
            disabled={loading}
          >
            {loading ? "Loading..." : "Search"}
          </Button>
        </div>
        <div className="flex flex-col md:flex-row gap-4 mt-6">
        <Card className="w-full md:w-72 bg-white">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-text-card">
              Need to Reschedule?
            </h3>
            <p className="text-sm text-text-card">
              Flexible booking changes up to 48 hours before check-in
            </p>
            <Button
              variant="outline"
              className="mt-2 w-full bg-card text-brand"
            >
              Request Change
            </Button>
          </CardContent>
        </Card>

        <Card className="w-full md:w-72 bg-white">
          <CardContent className="p-4">
            <h3 className="text-lg font-semibold text-text-card">
              Request a Refund
            </h3>
            <p className="text-sm text-text-card">
              Our hassle-free refund process for eligible bookings
            </p>
            <Button
              variant="outline"
              className="mt-2 w-full bg-card text-brand"
            >
              Request Refund
            </Button>
          </CardContent>
        </Card>
      </div>
      </section>

      {/* Bagian Hasil Pencarian */}
      <section className="mt-6 w-full">
        {loading && <p className="text-white text-center">Fetching data...</p>}
        {error && <p className="text-red-500 text-center">{error}</p>}
        {!loading && !error && showResults && (
          <TentCollection
            categories={(reservationData ?? []).filter(
              (category) =>
                selectedCategory === "All" || category.name === selectedCategory
            )}
            loading={loading}
            error={error}
          />
        )}
      </section>
    </>
  );
}
