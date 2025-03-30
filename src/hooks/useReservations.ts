import { useState } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Category, responseArray } from "../types/reservations";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export function useReservations() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [reservationData, setReservationData] = useState<Category[] | null>(
    null
  );
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");


  const handleSearch = async () => {
    if (!date?.from || !date?.to) {
      alert("Please select a date range.");
      return;
    }
  
    if (!API_BASE_URL) {
      setError("API base URL is not set");
      return;
    }
  
    setLoading(true);
    setError(null);
    setShowResults(false);
  
    try {
      const start_date = format(date.from, "yyyy-MM-dd");
      const end_date = format(date.to, "yyyy-MM-dd");
      let apiUrl = `${API_BASE_URL}/reservations/availability?start_date=${start_date}&end_date=${end_date}`;
      if (selectedCategory !== "All") {
        apiUrl += `&name=${selectedCategory}`;
      }
  
      const response = await fetch(apiUrl);
      if (!response.ok) throw new Error("Failed to fetch reservations");
  
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const res: responseArray = await response.json();
      setReservationData(res.data);
      console.log(res.data);
      setShowResults(res.data.length > 0);
    } catch (err: unknown) {
      setError(err instanceof Error ? err.message : "An unknown error occurred");
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };
  

  return { date, setDate, reservationData, loading, error, handleSearch, showResults, setSelectedCategory, selectedCategory, };
}
