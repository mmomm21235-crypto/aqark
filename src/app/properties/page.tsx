"use client"

import { useState, useMemo } from "react"
import { MapPin, Home, Ruler, BedDouble, Search, Heart } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { formatCurrency } from "@/lib/utils"
import { addFavorite, removeFavorite, isFavorite } from "@/lib/favorites"
import dynamic from "next/dynamic"

const MapView = dynamic(() => import("@/components/map/map-view"), { ssr: false })

const allProperties = [
  { id: 1, name: "فيلا في الشيخ زايد", price: 8500000, area: 350, rooms: 5, bathrooms: 4, location: "الشيخ زايد", governorate: "القاهرة", type: "سكني", lat: 30.0444, lng: 31.2357 },
  { id: 2, name: "شقة في التجمع الخامس", price: 4200000, area: 180, rooms: 3, bathrooms: 2, location: "التجمع الخامس", governorate: "القاهرة", type: "سكني", lat: 30.0168, lng: 31.4808 },
  { id: 3, name: "دوبلكس في 6 أكتوبر", price: 5600000, area: 250, rooms: 4, bathrooms: 3, location: "6 أكتوبر", governorate: "الجيزة", type: "سكني", lat: 29.9773, lng: 30.9479 },
  { id: 4, name: "شقة في المهندسين", price: 3200000, area: 120, rooms: 2, bathrooms: 2, location: "المهندسين", governorate: "الجيزة", type: "سكني", lat: 30.0486, lng: 31.2026 },
  { id: 5, name: "محل تجاري - مدينة نصر", price: 8000000, area: 80, rooms: 1, bathrooms: 1, location: "مدينة نصر", governorate: "القاهرة", type: "تجاري", lat: 30.0585, lng: 31.3323 },
  { id: 6, name: "مكتب إداري - المعادي", price: 3500000, area: 60, rooms: 2, bathrooms: 1, location: "المعادي", governorate: "القاهرة", type: "إداري", lat: 29.9695, lng: 31.2568 },
  { id: 7, name: "شقة في سموحة", price: 2800000, area: 150, rooms: 3, bathrooms: 2, location: "سموحة", governorate: "الإسكندرية", type: "سكني", lat: 31.2001, lng: 29.9187 },
  { id: 8, name: "فيلا في سيدي جابر", price: 12000000, area: 400, rooms: 6, bathrooms: 5, location: "سيدي جابر", governorate: "الإسكندرية", type: "سكني", lat: 31.2189, lng: 29.9292 },
]

export default function PropertiesPage() {
  const [budgetMax, setBudgetMax] = useState("")
  const [governorate, setGovernorate] = useState("all")
  const [type, setType] = useState("all")
  const [minArea, setMinArea] = useState("")
  const [favorites, setFavorites] = useState<string[]>([])

  const filtered = useMemo(() => {
    return allProperties.filter((p) => {
      if (budgetMax && p.price > parseFloat(budgetMax)) return false
      if (minArea && p.area < parseFloat(minArea)) return false
      if (governorate !== "all" && p.governorate !== governorate) return false
      if (type !== "all" && p.type !== type) return false
      return true
    })
  }, [budgetMax, governorate, type, minArea])

  const toggleFav = (id: number) => {
    const key = id.toString()
    if (isFavorite(key)) { removeFavorite(key); setFavorites(favorites.filter((f) => f !== key)) }
    else { addFavorite({ id: key, type: "property", title: allProperties.find((p) => p.id === id)?.name || "", value: formatCurrency(allProperties.find((p) => p.id === id)?.price || 0), url: "/properties" }); setFavorites([...favorites, key]) }
  }

  return (
    <div className="mx-auto max-w-7xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
          <Search className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold">عقارات حسب ميزانيتك</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">ابحث عن العقار المناسب لميزانيتك وموقعك المفضل</p>
      </div>

      <Card className="mb-6 dark:bg-gray-900 dark:border-gray-800">
        <CardContent className="p-4">
          <div className="grid gap-3 sm:grid-cols-4">
            <Input id="budget" label="الميزانية القصوى" type="number" value={budgetMax} onChange={(e) => setBudgetMax(e.target.value)} placeholder="مثال: 5000000" />
            <Select id="gov" label="المحافظة" value={governorate} onChange={(e) => setGovernorate(e.target.value)} options={[{ value: "all", label: "الكل" }, { value: "القاهرة", label: "القاهرة" }, { value: "الجيزة", label: "الجيزة" }, { value: "الإسكندرية", label: "الإسكندرية" }]} />
            <Select id="typeFilter" label="النوع" value={type} onChange={(e) => setType(e.target.value)} options={[{ value: "all", label: "الكل" }, { value: "سكني", label: "سكني" }, { value: "تجاري", label: "تجاري" }, { value: "إداري", label: "إداري" }]} />
            <Input id="minArea" label="أقل مساحة (م²)" type="number" value={minArea} onChange={(e) => setMinArea(e.target.value)} placeholder="مثال: 100" />
          </div>
        </CardContent>
      </Card>

      <div className="h-72 rounded-xl overflow-hidden mb-8 border dark:border-gray-800">
        <MapView properties={filtered} />
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {filtered.length === 0 ? (
          <div className="col-span-full text-center py-12 text-gray-500 dark:text-gray-400">لا توجد عقارات تطابق بحثك</div>
        ) : filtered.map((prop) => (
          <Card key={prop.id} className="dark:bg-gray-900 dark:border-gray-800">
            <CardHeader className="pb-3">
              <div className="flex justify-between items-start">
                <CardTitle className="text-base">{prop.name}</CardTitle>
                <button onClick={() => toggleFav(prop.id)}><Heart className={`h-4 w-4 ${favorites.includes(prop.id.toString()) ? "fill-red-500 text-red-500" : "text-gray-400"}`} /></button>
              </div>
            </CardHeader>
            <CardContent className="space-y-2 text-sm">
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400"><Home className="h-3 w-3 inline" /> السعر</span><span className="font-semibold">{formatCurrency(prop.price)}</span></div>
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400"><Ruler className="h-3 w-3 inline" /> المساحة</span><span>{prop.area} م²</span></div>
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400"><BedDouble className="h-3 w-3 inline" /> الغرف</span><span>{prop.rooms} غرف</span></div>
              <div className="flex justify-between"><span className="text-gray-500 dark:text-gray-400"><MapPin className="h-3 w-3 inline" /> {prop.governorate}</span><span>{prop.type}</span></div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
