import { useState, useEffect } from 'react'
import api from '@/lib/api'

export interface AvailabilityDate {
  date: string
  status: 'available' | 'limited' | 'full' | 'blocked'
  available_count: number
  tents?: Array<{
    id: string
    name: string
    price: number
  }>
}

export function useAvailability(startDate: string, endDate: string, categoryId?: string) {
  const [data, setData] = useState<AvailabilityDate[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!startDate || !endDate) return

    const fetchAvailability = async () => {
      setLoading(true)
      setError(null)
      try {
        const response = await api.get('/calendar/availability', {
          params: { start_date: startDate, end_date: endDate, tent_category_id: categoryId }
        })
        setData(response.data.data.dates)
      } catch (err) {
        setError(`Failed to fetch availability: ${err}`);
      } finally {
        setLoading(false)
      }
    }

    fetchAvailability()
  }, [startDate, endDate, categoryId])

  return { data, loading, error }
}