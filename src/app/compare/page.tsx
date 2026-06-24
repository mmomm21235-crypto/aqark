"use client"

import { useState } from "react"
import { ChartBarStacked } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { formatCurrency } from "@/lib/utils"

interface Property {
  name: string
  price: number
  area: number
  rooms: number
  bathrooms: number
  age: number
  floor: number
}

const defaultProps = {
  name: "",
  price: 0,
  area: 0,
  rooms: 0,
  bathrooms: 0,
  age: 0,
  floor: 0,
}

function compareProps(a: Property, b: Property) {
  const pricePerMeterA = a.area ? a.price / a.area : 0
  const pricePerMeterB = b.area ? b.price / b.area : 0
  const scoreA = pricePerMeterA > 0 ? (1 / pricePerMeterA) * 100000 : 0
  const scoreB = pricePerMeterB > 0 ? (1 / pricePerMeterB) * 100000 : 0
  return { pricePerMeterA, pricePerMeterB, scoreA, scoreB }
}

export default function ComparePage() {
  const [propA, setPropA] = useState<Property>({ ...defaultProps, name: "العقار الأول" })
  const [propB, setPropB] = useState<Property>({ ...defaultProps, name: "العقار الثاني" })

  const update = (side: "A" | "B", field: keyof Property, value: string) => {
    const setter = side === "A" ? setPropA : setPropB
    setter((prev) => ({
      ...prev,
      [field]: field === "name" ? value : parseFloat(value) || 0,
    }))
  }

  const c = compareProps(propA, propB)
  const best1 = c.pricePerMeterA < c.pricePerMeterB ? propA : propB
  const best2 = c.pricePerMeterA < c.pricePerMeterB ? propB : propA

  const rows = [
    { label: "السعر", valA: formatCurrency(propA.price), valB: formatCurrency(propB.price), better: propA.price < propB.price ? "A" : propB.price < propA.price ? "B" : null },
    { label: "المساحة (م²)", valA: propA.area.toString(), valB: propB.area.toString(), better: propA.area > propB.area ? "A" : propB.area > propA.area ? "B" : null },
    { label: "الغرف", valA: propA.rooms.toString(), valB: propB.rooms.toString(), better: propA.rooms > propB.rooms ? "A" : propB.rooms > propA.rooms ? "B" : null },
    { label: "الحمامات", valA: propA.bathrooms.toString(), valB: propB.bathrooms.toString(), better: propA.bathrooms > propB.bathrooms ? "A" : propB.bathrooms > propA.bathrooms ? "B" : null },
    { label: "سعر المتر", valA: formatCurrency(c.pricePerMeterA), valB: formatCurrency(c.pricePerMeterB), better: c.pricePerMeterA < c.pricePerMeterB ? "A" : "B" },
  ]

  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          <ChartBarStacked className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold text-gray-900">مقارنة أسعار العقارات</h1>
        <p className="mt-2 text-gray-600">قارن بين عقارين جنباً إلى جنب لاتخاذ القرار الأفضل</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 mb-8">
        {[{
          side: "A" as const, prop: propA, title: "العقار الأول", color: "border-emerald-500",
        }, {
          side: "B" as const, prop: propB, title: "العقار الثاني", color: "border-blue-500",
        }].map(({ side, prop, title, color }) => (
          <Card key={side} className={`border-t-4 ${color}`}>
            <CardHeader>
              <CardTitle>{title}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              <Input id={`name-${side}`} label="الاسم" value={prop.name} onChange={(e) => update(side, "name", e.target.value)} />
              <Input id={`price-${side}`} label="السعر (جنيه)" type="number" value={prop.price || ""} onChange={(e) => update(side, "price", e.target.value)} />
              <Input id={`area-${side}`} label="المساحة (م²)" type="number" value={prop.area || ""} onChange={(e) => update(side, "area", e.target.value)} />
              <Input id={`rooms-${side}`} label="عدد الغرف" type="number" value={prop.rooms || ""} onChange={(e) => update(side, "rooms", e.target.value)} />
              <Input id={`bath-${side}`} label="عدد الحمامات" type="number" value={prop.bathrooms || ""} onChange={(e) => update(side, "bathrooms", e.target.value)} />
            </CardContent>
          </Card>
        ))}
      </div>

      <Card>
        <CardHeader>
          <CardTitle>المقارنة</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <table className="w-full text-right">
              <thead>
                <tr className="border-b">
                  <th className="py-3 px-4 font-medium text-gray-500">المعيار</th>
                  <th className="py-3 px-4 font-medium text-emerald-700">العقار الأول</th>
                  <th className="py-3 px-4 font-medium text-blue-700">العقار الثاني</th>
                  <th className="py-3 px-4 font-medium text-gray-500">الأفضل</th>
                </tr>
              </thead>
              <tbody>
                {rows.map((row) => (
                  <tr key={row.label} className="border-b last:border-0">
                    <td className="py-3 px-4 text-gray-600">{row.label}</td>
                    <td className={`py-3 px-4 font-semibold ${row.better === "A" ? "text-emerald-600" : ""}`}>{row.valA}</td>
                    <td className={`py-3 px-4 font-semibold ${row.better === "B" ? "text-blue-600" : ""}`}>{row.valB}</td>
                    <td className="py-3 px-4">
                      {row.better === "A" && <span className="text-emerald-600 font-medium">العقار الأول</span>}
                      {row.better === "B" && <span className="text-blue-600 font-medium">العقار الثاني</span>}
                      {!row.better && <span className="text-gray-400">متساوٍ</span>}
                    </td>
                  </tr>
                ))}
                <tr className="bg-emerald-50 font-semibold">
                  <td className="py-3 px-4">التقييم العام</td>
                  <td className="py-3 px-4">{formatCurrency(c.pricePerMeterA)}/م²</td>
                  <td className="py-3 px-4">{formatCurrency(c.pricePerMeterB)}/م²</td>
                  <td className="py-3 px-4">
                    <span className={c.pricePerMeterA < c.pricePerMeterB ? "text-emerald-600" : "text-blue-600"}>
                      {c.pricePerMeterA < c.pricePerMeterB ? "العقار الأول" : "العقار الثاني"}
                    </span>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
