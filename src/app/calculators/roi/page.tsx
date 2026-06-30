"use client"

import { useState } from "react"
import { TrendingUp } from "lucide-react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { calcROI, type ROIResult } from "@/lib/calculators"
import { formatCurrency } from "@/lib/utils"

export default function ROIPage() {
  const [price, setPrice] = useState("5000000")
  const [rent, setRent] = useState("25000")
  const [maintenance, setMaintenance] = useState("30000")
  const [tax, setTax] = useState("5000")
  const [years, setYears] = useState("10")
  const [result, setResult] = useState<ROIResult | null>(null)

  const handleCalc = () => {
    setResult(calcROI(parseFloat(price), parseFloat(rent), parseFloat(maintenance), parseFloat(tax), parseInt(years)))
  }

  return (
    <CalculatorLayout
      title="حاسبة العائد على الاستثمار العقاري"
      description="احسب العائد السنوي ومدة استرداد رأس المال لمشروعك العقاري"
      icon={<TrendingUp className="h-8 w-8" />}
      result={
        result && (
          <div className="space-y-4">
            {[
              { label: "الدخل الإيجاري السنوي", value: result.annualRentIncome, color: "text-emerald-600" },
              { label: "المصروفات السنوية", value: result.annualExpenses, color: "text-red-600" },
              { label: "صافي الدخل السنوي", value: result.netAnnualIncome, color: "text-emerald-600" },
            ].map((item) => (
              <div key={item.label} className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <span className="text-gray-600 dark:text-gray-400">{item.label}</span>
                <span className={`font-semibold ${item.color}`}>{formatCurrency(item.value)}</span>
              </div>
            ))}
            <div className="flex justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
              <span className="font-semibold text-emerald-800 dark:text-emerald-300">نسبة العائد (ROI)</span>
              <span className="font-bold text-xl text-emerald-700 dark:text-emerald-400">{result.roi}%</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-blue-50 dark:bg-blue-950 border border-blue-200 dark:border-blue-800">
              <span className="font-semibold text-blue-800 dark:text-blue-300">مدة استرداد رأس المال</span>
              <span className="font-bold text-lg text-blue-700 dark:text-blue-400">{result.paybackYears} سنة</span>
            </div>
            <div className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
              <span className="text-gray-600 dark:text-gray-400">إجمالي العائد خلال {years} سنوات</span>
              <span className="font-semibold">{formatCurrency(result.totalReturn)}</span>
            </div>
          </div>
        )
      }
    >
      <Input id="price" label="سعر العقار (جنيه)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <Input id="rent" label="الإيجار الشهري المتوقع (جنيه)" type="number" value={rent} onChange={(e) => setRent(e.target.value)} />
      <Input id="maintenance" label="الصيانة السنوية (جنيه)" type="number" value={maintenance} onChange={(e) => setMaintenance(e.target.value)} />
      <Input id="tax" label="الضرائب والرسوم السنوية (جنيه)" type="number" value={tax} onChange={(e) => setTax(e.target.value)} />
      <Input id="years" label="مدة الاستثمار (سنوات)" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
      <Button onClick={handleCalc} className="w-full mt-2">احسب العائد</Button>
    </CalculatorLayout>
  )
}
