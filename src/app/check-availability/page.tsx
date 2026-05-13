'use client'

import { useState } from 'react'
import { GuestCalendar } from '@/components/pages/availability/guest-calendar'
import { TentList } from '@/components/pages/availability/tent-list'
import { useAvailability } from '@/hooks/useAvailability'

export default function CheckAvailabilityPage() {
  const [selectedDates, setSelectedDates] = useState<Date[]>([])

  const startDate = selectedDates[0]?.toISOString().split('T')[0] || ''
  const endDate = selectedDates[1]?.toISOString().split('T')[0] || ''

  const { data, loading, error } = useAvailability(startDate, endDate)

  const handleBookNow = (tentId: string) => {
    // Navigate to booking flow with selected dates and tent
    window.location.href = `/booking?tent=${tentId}&start=${startDate}&end=${endDate}`
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">Cek Ketersediaan</h1>
          <p className="text-muted-foreground">
            Pilih tanggal dan lihat tenda yang tersedia
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-1">
            <GuestCalendar
              selected={selectedDates}
              onSelect={setSelectedDates}
            />

            {selectedDates.length >= 2 && (
              <div className="mt-4 p-4 bg-white rounded-lg border">
                <p className="font-medium">Tanggal Terpilih:</p>
                <p className="text-muted-foreground">
                  {selectedDates[0].toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                  {' - '}
                  {selectedDates[1].toLocaleDateString('id-ID', {
                    weekday: 'long',
                    year: 'numeric',
                    month: 'long',
                    day: 'numeric',
                  })}
                </p>
              </div>
            )}
          </div>

          <div className="lg:col-span-2">
            {loading ? (
              <div className="text-center py-12">
                <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full mx-auto" />
                <p className="mt-4 text-muted-foreground">Memuat ketersediaan...</p>
              </div>
            ) : error ? (
              <div className="text-center py-12 text-red-500">{error}</div>
            ) : selectedDates.length < 2 ? (
              <div className="text-center py-12 bg-white rounded-lg border">
                <p className="text-muted-foreground">
                  Pilih rentang tanggal untuk melihat ketersediaan
                </p>
              </div>
            ) : (
              <TentList
                availabilityData={data}
                selectedDates={selectedDates}
                onBookNow={handleBookNow}
              />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}