"use client"

import { useState } from "react"
import { Home } from "lucide-react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { calcValuation, type ValuationResult } from "@/lib/calculators"
import { formatCurrency, formatNumber } from "@/lib/utils"

const locations = [
  { value: "50000", label: "القاهرة - التجمع الخامس" },
  { value: "45000", label: "القاهرة - الشيخ زايد" },
  { value: "35000", label: "القاهرة - مدينة نصر" },
  { value: "30000", label: "القاهرة - المهندسين" },
  { value: "28000", label: "القاهرة - المعادي" },
  { value: "25000", label: "الجيزة - الدقي" },
  { value: "22000", label: "الإسكندرية - سموحة" },
  { value: "18000", label: "الإسكندرية - محطة الرمل" },
  { value: "15000", label: "الجيزة - فيصل" },
  { value: "12000", label: "القاهرة - شبرا" },
  { value: "10000", label: "طنطا" },
  { value: "8000", label: "المنصورة" },
  { value: "7000", label: "أسيوط" },
  { value: "5000", label: "قنا" },
  { value: "3500", label: "الأقصر" },
]

export default function ValuationPage() {
  const [basePrice, setBasePrice] = useState("30000")
  const [area, setArea] = useState("120")
  const [age, setAge] = useState("5")
  const [type, setType] = useState<"سكني" | "تجاري" | "إداري">("سكني")
  const [finishing, setFinishing] = useState<"بدون" | "متوسط" | "فاخر">("متوسط")
  const [floor, setFloor] = useState("3")
  const [rooms, setRooms] = useState("3")
  const [bathrooms, setBathrooms] = useState("2")
  const [elevator, setElevator] = useState("yes")
  const [parking, setParking] = useState("no")
  const [result, setResult] = useState<ValuationResult | null>(null)

  const handleCalc = () => {
    setResult(calcValuation(
      parseFloat(basePrice), parseFloat(area), parseInt(age),
      type, finishing as "بدون" | "متوسط" | "فاخر",
      parseInt(floor), parseInt(rooms), parseInt(bathrooms),
      elevator === "yes", parking === "yes"
    ))
  }

  return (
    <CalculatorLayout
      title="حاسبة تقييم العقار"
      description="احسب القيمة التقديرية لأي عقار بناءً على الموقع والمساحة والعمر والمواصفات"
      icon={<Home className="h-8 w-8" />}
      result={result && (
        <div className="space-y-4">
          <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 p-4 text-center">
            <p className="text-sm text-emerald-600 dark:text-emerald-400">القيمة التقديرية</p>
            <p className="text-2xl font-bold text-emerald-700 dark:text-emerald-300">{formatCurrency(result.estimatedValue)}</p>
            <p className="text-sm text-gray-500">{formatCurrency(result.pricePerMeter)}/م²</p>
          </div>
          <div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
            <span className="text-gray-600 dark:text-gray-400">مستوى الثقة</span>
            <span className="font-semibold">{result.confidence}</span>
          </div>
          <div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
            <span className="text-gray-600 dark:text-gray-400">سعر المتر الأساسي</span>
            <span>{formatCurrency(result.locationScore)}</span>
          </div>
          <div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
            <span className="text-gray-600 dark:text-gray-400">نقاط العمر</span>
            <span>{result.ageScore}%</span>
          </div>
          <div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
            <span className="text-gray-600 dark:text-gray-400">نقاط المواصفات</span>
            <span>{result.specsScore}%</span>
          </div>
        </div>
      )}
    >
      <Select id="location" label="الموقع" value={basePrice} onChange={(e) => setBasePrice(e.target.value)} options={locations} />
      <Input id="area" label="المساحة (م²)" type="number" value={area} onChange={(e) => setArea(e.target.value)} />
      <Input id="age" label="عمر العقار (سنوات)" type="number" value={age} onChange={(e) => setAge(e.target.value)} />
      <Select id="type" label="نوع العقار" value={type} onChange={(e) => setType(e.target.value as "سكني" | "تجاري" | "إداري")} options={[{ value: "سكني", label: "سكني" }, { value: "تجاري", label: "تجاري" }, { value: "إداري", label: "إداري" }]} />
      <Select id="finishing" label="مستوى التشطيب" value={finishing} onChange={(e) => setFinishing(e.target.value as "بدون" | "متوسط" | "فاخر")} options={[{ value: "بدون", label: "بدون تشطيب" }, { value: "متوسط", label: "متوسط" }, { value: "فاخر", label: "فاخر" }]} />
      <div className="grid grid-cols-2 gap-3">
        <Input id="floor" label="الدور" type="number" value={floor} onChange={(e) => setFloor(e.target.value)} />
        <Input id="rooms" label="الغرف" type="number" value={rooms} onChange={(e) => setRooms(e.target.value)} />
      </div>
      <div className="grid grid-cols-2 gap-3">
        <Input id="bathrooms" label="الحمامات" type="number" value={bathrooms} onChange={(e) => setBathrooms(e.target.value)} />
        <Select id="elevator" label="مصعد؟" value={elevator} onChange={(e) => setElevator(e.target.value)} options={[{ value: "yes", label: "نعم" }, { value: "no", label: "لا" }]} />
      </div>
      <Select id="parking" label="موقف سيارات؟" value={parking} onChange={(e) => setParking(e.target.value)} options={[{ value: "yes", label: "نعم" }, { value: "no", label: "لا" }]} />
      <Button onClick={handleCalc} className="w-full mt-2">احسب التقييم</Button>
    </CalculatorLayout>
  )
}
