"use client"

import { useState } from "react"
import { Wrench } from "lucide-react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { calcFinishing, type FinishingResult } from "@/lib/calculators"
import { formatCurrency } from "@/lib/utils"

const items = [
  { key: "tiling", label: "السيراميك والرخام" },
  { key: "plastering", label: "المحارة والتلييس" },
  { key: "painting", label: "الدهان" },
  { key: "plumbing", label: "السباكة" },
  { key: "electrical", label: "الكهرباء" },
  { key: "carpentry", label: "النجارة" },
] as const

export default function FinishingPage() {
  const [area, setArea] = useState("100")
  const [quality, setQuality] = useState<"economy" | "standard" | "luxury">("standard")
  const [result, setResult] = useState<FinishingResult | null>(null)

  const handleCalc = () => {
    const a = parseFloat(area)
    if (a) setResult(calcFinishing(a, quality))
  }

  return (
    <CalculatorLayout
      title="حاسبة تشطيب الشقة"
      description="تقدير تكلفة تشطيب الشقة بالكامل حسب المساحة ومستوى الجودة"
      icon={<Wrench className="h-8 w-8" />}
      result={
        result && (
          <div className="space-y-4">
            {items.map(({ key, label }) => (
              <div key={key} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                <span className="text-gray-600">{label}</span>
                <span className="font-semibold">{formatCurrency(result[key])}</span>
              </div>
            ))}
            <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="font-semibold text-emerald-800">الإجمالي</span>
              <span className="font-bold text-xl text-emerald-700">{formatCurrency(result.total)}</span>
            </div>
          </div>
        )
      }
    >
      <Input id="area" label="مساحة الشقة (م²)" type="number" value={area} onChange={(e) => setArea(e.target.value)} placeholder="مثال: 100" />
      <Select
        id="quality"
        label="مستوى التشطيب"
        value={quality}
        onChange={(e) => setQuality(e.target.value as "economy" | "standard" | "luxury")}
        options={[
          { value: "economy", label: "اقتصادي" },
          { value: "standard", label: "متوسط" },
          { value: "luxury", label: "فاخر" },
        ]}
      />
      <Button onClick={handleCalc} className="w-full mt-2">احسب التشطيب</Button>
    </CalculatorLayout>
  )
}
