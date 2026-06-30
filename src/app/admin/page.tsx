"use client"

import { useState } from "react"
import { Plus, Trash2 } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

interface PropertyForm {
  name: string
  price: string
  area: string
  rooms: string
  bathrooms: string
  location: string
}

export default function AdminPage() {
  const [form, setForm] = useState<PropertyForm>({ name: "", price: "", area: "", rooms: "", bathrooms: "", location: "" })
  const [properties, setProperties] = useState<PropertyForm[]>([])

  const addProperty = () => {
    if (!form.name || !form.price) return
    setProperties([...properties, { ...form }])
    setForm({ name: "", price: "", area: "", rooms: "", bathrooms: "", location: "" })
  }

  const removeProperty = (i: number) => {
    setProperties(properties.filter((_, idx) => idx !== i))
  }

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8">
        <h1 className="text-3xl font-bold">لوحة التحكم</h1>
        <p className="text-gray-600 dark:text-gray-400 mt-1">إدارة العقارات المضافة</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <CardTitle className="flex items-center gap-2"><Plus className="h-5 w-5" /> إضافة عقار جديد</CardTitle>
          </CardHeader>
          <CardContent className="space-y-3">
            <Input id="name" label="اسم العقار" value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
            <Input id="price" label="السعر (جنيه)" type="number" value={form.price} onChange={(e) => setForm({ ...form, price: e.target.value })} />
            <Input id="area" label="المساحة (م²)" type="number" value={form.area} onChange={(e) => setForm({ ...form, area: e.target.value })} />
            <div className="grid grid-cols-2 gap-3">
              <Input id="rooms" label="الغرف" type="number" value={form.rooms} onChange={(e) => setForm({ ...form, rooms: e.target.value })} />
              <Input id="bathrooms" label="الحمامات" type="number" value={form.bathrooms} onChange={(e) => setForm({ ...form, bathrooms: e.target.value })} />
            </div>
            <Input id="location" label="الموقع" value={form.location} onChange={(e) => setForm({ ...form, location: e.target.value })} />
            <Button onClick={addProperty} className="w-full">إضافة العقار</Button>
          </CardContent>
        </Card>
        <Card className="dark:bg-gray-900 dark:border-gray-800">
          <CardHeader>
            <CardTitle>العقارات المضافة ({properties.length})</CardTitle>
          </CardHeader>
          <CardContent>
            {properties.length === 0 ? (
              <p className="text-gray-500 dark:text-gray-400 text-sm text-center py-8">لا توجد عقارات مضافة بعد</p>
            ) : (
              <div className="space-y-3">
                {properties.map((p, i) => (
                  <div key={i} className="flex items-center justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-800">
                    <div>
                      <p className="font-medium">{p.name}</p>
                      <p className="text-sm text-gray-500 dark:text-gray-400">{formatCurrency(parseFloat(p.price))} - {p.area}م²</p>
                    </div>
                    <button onClick={() => removeProperty(i)} className="text-red-500 hover:text-red-700 p-1">
                      <Trash2 className="h-4 w-4" />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
