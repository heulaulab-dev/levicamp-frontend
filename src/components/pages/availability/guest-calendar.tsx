'use client'

import { useState } from 'react'
import { DayPicker } from 'react-day-picker'
import 'react-day-picker/dist/style.css'

interface GuestCalendarProps {
  selected: Date[]
  onSelect: (dates: Date[]) => void
}

export function GuestCalendar({ selected, onSelect }: GuestCalendarProps) {
  const [month, setMonth] = useState(new Date())

  return (
    <div className="bg-white rounded-xl shadow-sm border p-6">
      <DayPicker
        mode="range"
        selected={selected}
        onSelect={onSelect}
        month={month}
        onMonthChange={setMonth}
        modifiersClassNames={{
          available: 'bg-green-500 text-white',
          limited: 'bg-orange-400 text-white',
          full: 'bg-red-500 text-white',
          blocked: 'bg-gray-300 text-gray-500',
        }}
        classNames={{
          months: 'relative',
          caption: 'flex justify-center items-center py-4',
          nav: 'flex gap-1 absolute right-0 top-4',
        }}
      />

      <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t text-sm">
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-green-500 rounded" />
          <span>Tersedia</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-orange-400 rounded" />
          <span>Terbatas</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-red-500 rounded" />
          <span>Penuh</span>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-4 h-4 bg-gray-300 rounded" />
          <span>Diblokir</span>
        </div>
      </div>
    </div>
  )
}