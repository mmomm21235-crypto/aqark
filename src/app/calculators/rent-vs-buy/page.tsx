"use client"

import { useState } from "react"
import { Scale, TrendingDown, Home, XCircle, Building2, TrendingUp } from "lucide-react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { calcRentVsBuy, type RentVsBuyResult } from "@/lib/calculators"
import { formatCurrency } from "@/lib/utils"

export default function RentVsBuyPage() {
  const [price, setPrice] = useState("5000000")
  const [rent, setRent] = useState("15000")
  const [years, setYears] = useState("10")
  const [appreciation, setAppreciation] = useState("10")
  const [rentInc, setRentInc] = useState("10")
  const [result, setResult] = useState<RentVsBuyResult | null>(null)

  const handleCalc = () => {
    setResult(calcRentVsBuy(
      parseFloat(price), parseFloat(rent), parseInt(years),
      parseFloat(appreciation), parseFloat(rentInc)
    ))
  }

  return (
    <CalculatorLayout
      title="إيجار أم شراء؟"
      description="مقارنة ذكية بدون فوائد بنكية - تعتمد على ارتفاع قيمة العقار مقابل زيادة الإيجار"
      icon={<Scale className="h-8 w-8" />}
      result={
        result && (
          <div className="space-y-6">
            {result.buyIsBetter ? (
              <div className="rounded-xl bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 p-4 text-center">
                <TrendingDown className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
                <p className="text-lg font-bold text-emerald-800 dark:text-emerald-300">الشراء أوفر!</p>
                <p className="text-sm text-emerald-600 dark:text-emerald-400 mt-1">
                  ستوفر {formatCurrency(result.savings)} على مدى {result.years} سنوات
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-amber-50 dark:bg-amber-950 border border-amber-200 dark:border-amber-800 p-4 text-center">
                <TrendingUp className="mx-auto h-8 w-8 text-amber-600 mb-2" />
                <p className="font-bold text-amber-800 dark:text-amber-300">الإيجار أقل تكلفة حالياً</p>
                <p className="text-sm text-amber-600 dark:text-amber-400 mt-1">
                  لكن العقار استثمار طويل المدى أفضل
                </p>
              </div>
            )}
            <div className="p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800 text-center">
              <TrendingUp className="mx-auto h-6 w-6 text-emerald-600 mb-1" />
              <p className="text-sm text-emerald-700 dark:text-emerald-300 font-medium">
                قيمة العقار بعد {result.years} سنوات: {formatCurrency(result.ownershipEquity)}
              </p>
              <p className="text-xs text-emerald-600 dark:text-emerald-400 mt-1">
                العقار أصل يزداد قيمته بمرور الوقت - الإيجار فلوس تروح ولا ترجع
              </p>
            </div>
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2"><Home className="h-4 w-4" /> قيمة العقار بعد البيع</span>
                <span className="font-semibold text-emerald-700 dark:text-emerald-400">{formatCurrency(result.ownershipEquity)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
                <span className="text-gray-600 dark:text-gray-400 flex items-center gap-2"><Building2 className="h-4 w-4" /> إجمالي الإيجار المدفوع</span>
                <span className="font-semibold text-red-600">{formatCurrency(result.rentTotal)}</span>
              </div>
            </div>
          </div>
        )
      }
    >
      <Input id="price" label="سعر العقار (جنيه)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <Input id="rent" label="الإيجار الشهري (جنيه)" type="number" value={rent} onChange={(e) => setRent(e.target.value)} />
      <Input id="years" label="مدة المقارنة (سنوات)" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
      <Input id="appreciation" label="نسبة ارتفاع سعر العقار السنوية (%)" type="number" value={appreciation} onChange={(e) => setAppreciation(e.target.value)} />
      <Input id="rentInc" label="الزيادة السنوية للإيجار (%)" type="number" value={rentInc} onChange={(e) => setRentInc(e.target.value)} />
      <Button onClick={handleCalc} className="w-full mt-2">قارن</Button>
    </CalculatorLayout>
  )
}
