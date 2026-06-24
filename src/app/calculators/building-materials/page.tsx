"use client"

import { useState } from "react"
import { Ruler } from "lucide-react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { calcBuildingMaterials, type BuildingMaterialsResult } from "@/lib/calculators"
import { formatNumber } from "@/lib/utils"

export default function BuildingMaterialsPage() {
  const [length, setLength] = useState("")
  const [width, setWidth] = useState("")
  const [height, setHeight] = useState("")
  const [thickness, setThickness] = useState<"12" | "25">("25")
  const [result, setResult] = useState<BuildingMaterialsResult | null>(null)

  const handleCalc = () => {
    const l = parseFloat(length)
    const w = parseFloat(width)
    const h = parseFloat(height)
    if (l && w && h) {
      setResult(calcBuildingMaterials(l, w, h, thickness))
    }
  }

  return (
    <CalculatorLayout
      title="حاسبة كميات البناء"
      description="احسب الكميات التقريبية لمواد البناء الأساسية حسب أبعاد المباني"
      icon={<Ruler className="h-8 w-8" />}
      result={
        result && (
          <div className="space-y-4">
            {[
              { label: "الأسمنت (شكارة)", value: result.cement, unit: "شكارة" },
              { label: "الرمل (م³)", value: result.sand, unit: "م³" },
              { label: "الطوب (ألف طوبة)", value: result.bricks, unit: "ألف" },
              { label: "الحديد (طن)", value: result.steel, unit: "طن" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                <span className="text-gray-600">{item.label}</span>
                <span className="font-semibold text-lg">{formatNumber(item.value)} {item.unit}</span>
              </div>
            ))}
          </div>
        )
      }
    >
      <Input id="length" label="طول المبنى (متر)" type="number" value={length} onChange={(e) => setLength(e.target.value)} placeholder="مثال: 10" />
      <Input id="width" label="عرض المبنى (متر)" type="number" value={width} onChange={(e) => setWidth(e.target.value)} placeholder="مثال: 8" />
      <Input id="height" label="ارتفاع المبنى (متر)" type="number" value={height} onChange={(e) => setHeight(e.target.value)} placeholder="مثال: 3" />
      <Select
        id="thickness"
        label="سمك الحائط"
        value={thickness}
        onChange={(e) => setThickness(e.target.value as "12" | "25")}
        options={[
          { value: "25", label: "طوب 25 سم (حامل)" },
          { value: "12", label: "طوب 12 سم (قاطع)" },
        ]}
      />
      <Button onClick={handleCalc} className="w-full mt-2">احسب الكميات</Button>
    </CalculatorLayout>
  )
}
