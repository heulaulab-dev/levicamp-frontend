'use client'

import { AvailabilityDate } from '@/hooks/useAvailability'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Calendar, DollarSign } from 'lucide-react'

interface TentListProps {
  availabilityData: AvailabilityDate[]
  selectedDates: Date[]
  onBookNow: (tentId: string) => void
}

export function TentList({ availabilityData, selectedDates, onBookNow }: TentListProps) {
  // Get unique tents from first available date
  const firstAvailable = availabilityData.find((d) => d.status === 'available' && d.tents?.length)
  const tents = firstAvailable?.tents || []

  if (tents.length === 0) {
    return (
      <Card>
        <CardContent className="p-6 text-center">
          <p className="text-muted-foreground">
            Tidak ada tenda tersedia untuk tanggal yang dipilih
          </p>
        </CardContent>
      </Card>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {tents.map((tent) => (
          <Card key={tent.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center justify-between">
                <span>{tent.name}</span>
                <Badge variant="success">Tersedia</Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center gap-2 text-muted-foreground">
                <DollarSign className="h-4 w-4" />
                <span className="text-lg font-semibold text-foreground">
                  Rp {tent.price.toLocaleString('id-ID')}/malam
                </span>
              </div>

              {selectedDates.length >= 2 && (
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Calendar className="h-4 w-4" />
                  <span>
                    {selectedDates[0].toLocaleDateString('id-ID')} -{' '}
                    {selectedDates[1].toLocaleDateString('id-ID')}
                  </span>
                </div>
              )}

              <Button className="w-full" onClick={() => onBookNow(tent.id)}>
                Pesan Sekarang
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
  )
}