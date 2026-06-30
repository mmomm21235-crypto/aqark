"use client"

import { MapPin, Home, Ruler, BedDouble } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { formatCurrency } from "@/lib/utils"
import dynamic from "next/dynamic"

const MapView = dynamic(() => import("@/components/map/map-view"), { ssr: false })

const sampleProperties = [
  { id: 1, name: "فيلا في الشيخ زايد", price: 8500000, area: 350, rooms: 5, bathrooms: 4, location: "الشيخ زايد", lat: 30.0444, lng: 31.2357 },
  { id: 2, name: "شقة في التجمع الخامس", price: 4200000, area: 180, rooms: 3, bathrooms: 2, location: "التجمع الخامس", lat: 30.0168, lng: 31.4808 },
  { id: 3, name: "دوبلكس في ٦ أكتوبر", price: 5600000, area: 250, rooms: 4, bathrooms: 3, location: "٦ أكتوبر", lat: 29.9773, lng: 30.9479 },
  { id: 4, name: "شقة في المهندسين", price: 3200000, area: 120, rooms: 2, bathrooms: 2, location: "المهندسين", lat: 30.0486, lng: 31.2026 },
]

export default function PropertiesPage() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
          <MapPin className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold">العقارات المتاحة</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">تصفح العقارات المعروضة مع إمكانية المقارنة</p>
      </div>

      <div className="h-80 rounded-xl overflow-hidden mb-8 border dark:border-gray-800">
        <MapView properties={sampleProperties} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {sampleProperties.map((prop) => (
          <Card key={prop.id} className="dark:bg-gray-900 dark:border-gray-800">
            <CardHeader>
              <CardTitle className="text-base">{prop.name}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1"><Home className="h-3 w-3" /> السعر</span>
                <span className="font-semibold">{formatCurrency(prop.price)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1"><Ruler className="h-3 w-3" /> المساحة</span>
                <span>{prop.area} م²</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1"><BedDouble className="h-3 w-3" /> الغرف</span>
                <span>{prop.rooms} غرف، {prop.bathrooms} حمام</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500 dark:text-gray-400 flex items-center gap-1"><MapPin className="h-3 w-3" /> الموقع</span>
                <span>{prop.location}</span>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
