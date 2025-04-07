import { CheckPriceResponse } from "@types/reservations";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function checkPrice(tentIds: string[], startDate: string, endDate: string): Promise<any> {
  if (!API_BASE_URL || tentIds.length === 0) return null;

  try {
    const response = await fetch(`${API_BASE_URL}/reservations/price`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ tent_id: tentIds, start_date: startDate, end_date: endDate }),
    });

    if (!response.ok) {
      console.error("Failed to fetch price:", response.statusText);
      return null;
    }

    const data: CheckPriceResponse = await response.json();
    return data.data ?? null; 

  } catch (error) {
    console.error("Error fetching price:", error);
    return null;
  }
}