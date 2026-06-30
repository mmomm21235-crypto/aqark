"use client"

import { useState } from "react"
import { Wrench } from "lucide-react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { calcMaintenance, type MaintenanceResult } from "@/lib/calculators"
import { formatCurrency } from "@/lib/utils"

const items = [
  { key: "buildingMaintenance", label: "صيانة المبنى" },
  { key: "elevator", label: "المصعد" },
  { key: "cleaning", label: "النظافة" },
  { key: "security", label: "الحراسة" },
  { key: "electricity", label: "الكهرباء" },
  { key: "water", label: "المياه" },
  { key: "miscellaneous", label: "متنوعات" },
] as const

export default function MaintenancePage() {
  const [area, setArea] = useState("100")
  const [elevator, setElevator] = useState("yes")
  const [security, setSecurity] = useState("yes")
  const [result, setResult] = useState<MaintenanceResult | null>(null)

  const handleCalc = () => {
    const a = parseFloat(area)
    if (a) setResult(calcMaintenance(a, elevator === "yes", security === "yes"))
  }

  return (
    <CalculatorLayout
      title="حاسبة رسوم الصيانة السنوية"
      description="تقدير تكاليف الصيانة الشهرية والسنوية للعقار حسب المساحة والخدمات"
      icon={<Wrench className="h-8 w-8" />}
      result={
        result && (
          <div className="space-y-4">
            {items.map(({ key, label }) =>
              result[key as keyof MaintenanceResult] > 0 ? (
                <div key={key} className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                  <span className="text-gray-600 dark:text-gray-400">{label}</span>
                  <span className="font-semibold">{formatCurrency(result[key as keyof MaintenanceResult] as number)}</span>
                </div>
              ) : null
            )}
            <div className="flex justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">الإجمالي الشهري</span>
              <span className="font-bold text-xl text-emerald-700 dark:text-emerald-400">{formatCurrency(result.total)}</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <span className="font-semibold text-blue-800 dark:text-blue-300">الإجمالي السنوي</span>
              <span className="font-bold text-lg text-blue-700 dark:text-blue-400">{formatCurrency(result.totalYearly)}</span>
            </div>
          </div>
        )
      }
    >
      <Input id="area" label="مساحة العقار (م²)" type="number" value={area} onChange={(e) => setArea(e.target.value)} />
      <Select id="elevator" label="موجود مصعد؟" value={elevator} onChange={(e) => setElevator(e.target.value)} options={[{ value: "yes", label: "نعم" }, { value: "no", label: "لا" }]} />
      <Select id="security" label="موجود حراسة؟" value={security} onChange={(e) => setSecurity(e.target.value)} options={[{ value: "yes", label: "نعم" }, { value: "no", label: "لا" }]} />
      <Button onClick={handleCalc} className="w-full mt-2">احسب الصيانة</Button>
    </CalculatorLayout>
  )
}
