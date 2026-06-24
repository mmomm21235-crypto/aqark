"use client"

import { useState } from "react"
import { PaintBucket } from "lucide-react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { calcPaintCost, type PaintResult } from "@/lib/calculators"
import { formatNumber, formatCurrency } from "@/lib/utils"

export default function PaintPage() {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [price, setPrice] = useState("250")
  const [coats, setCoats] = useState("2")
  const [windows, setWindows] = useState("1")
  const [doors, setDoors] = useState("1")
  const [result, setResult] = useState<PaintResult | null>(null)

  const handleCalc = () => {
    const l = parseFloat(length); const w = parseFloat(width); const h = parseFloat(height)
    const p = parseFloat(price); const c = parseInt(coats); const win = parseInt(windows); const d = parseInt(doors)
    if (l && w && h && p && c) {
      setResult(calcPaintCost(l, w, h, p, c, win, d))
    }
  }

  return (
    <CalculatorLayout
      title="حاسبة تكلفة الدهان"
      description="احسب كمية الدهان المطلوبة والتكلفة الإجمالية حسب مساحة الغرفة"
      icon={<PaintBucket className="h-8 w-8" />}
      result={
        result && (
          <div className="space-y-4">
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
              <span className="text-gray-600">دهان الحوائط</span>
              <span className="font-semibold">{formatNumber(result.paintLiters)} لتر</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
              <span className="text-gray-600">البرايمر (الأساس)</span>
              <span className="font-semibold">{formatNumber(result.primerLiters)} لتر</span>
            </div>
            <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-50 border border-emerald-200">
              <span className="font-semibold text-emerald-800">الإجمالي</span>
              <span className="font-bold text-xl text-emerald-700">{formatCurrency(result.totalCost)}</span>
            </div>
          </div>
        )
      }
    >
      <Input id="length" label="طول الغرفة (متر)" type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="مثال: 5" />
      <Input id="width" label="عرض الغرفة (متر)" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="مثال: 4" />
      <Input id="height" label="ارتفاع الغرفة (متر)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="مثال: 3" />
      <Input id="price" label="سعر لتر الدهان (جنيه)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <Input id="coats" label="عدد طبقات الدهان" type="number" value={coats} onChange={(e) => setCoats(e.target.value)} />
      <Input id="windows" label="عدد النوافذ" type="number" value={windows} onChange={(e) => setWindows(e.target.value)} />
      <Input id="doors" label="عدد الأبواب" type="number" value={doors} onChange={(e) => setDoors(e.target.value)} />
      <Button onClick={handleCalc} className="w-full mt-2">احسب التكلفة</Button>
    </CalculatorLayout>
  )
}
