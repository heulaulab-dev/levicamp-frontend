import { useState, useEffect } from "react";
import { format } from "date-fns";
import { DateRange } from "react-day-picker";
import { Category, responseArray } from "../types/reservations";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
const STORAGE_KEY = "reservation_search";

export function useReservations() {
  const [date, setDate] = useState<DateRange | undefined>({
    from: undefined,
    to: undefined,
  });

  const [reservationData, setReservationData] = useState<Category[] | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [showResults, setShowResults] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        if (parsed.date) {
          setDate(parsed.date);
        }
        if (parsed.selectedCategory) {
          setSelectedCategory(parsed.selectedCategory);
        }
      } catch (e) {
        console.warn("Corrupted reservation data");
      }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ date, selectedCategory, savedAt: new Date().toISOString() })
    );
  }, [date, selectedCategory]);

  const handleSearch = async (
    onError: (message: string) => void
  ) => {
    if (!date?.from || !date?.to) {
      onError("Please select a date range");
      return;
    }

    if (!API_BASE_URL) {
      onError("please try again later");
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

      const res: responseArray = await response.json();
      setReservationData(res.data);
      setShowResults(res.data.length > 0);
    } catch (err: unknown) {
      onError(err instanceof Error ? err.message : "Something went wrong");
      setShowResults(false);
    } finally {
      setLoading(false);
    }
  };

  return {
    date,
    setDate,
    reservationData,
    loading,
    error,
    handleSearch,
    showResults,
    selectedCategory,
    setSelectedCategory,
  };
}
