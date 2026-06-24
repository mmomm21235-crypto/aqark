"use client"

import { useState } from "react"
import { Scale, TrendingDown, Home, XCircle, Building2 } from "lucide-react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { calcRentVsBuy, type RentVsBuyResult } from "@/lib/calculators"
import { formatCurrency } from "@/lib/utils"

export default function RentVsBuyPage() {
  const [price, setPrice] = useState("5000000")
  const [rent, setRent] = useState("15000")
  const [years, setYears] = useState("10")
  const [downPct, setDownPct] = useState("20")
  const [rate, setRate] = useState("12")
  const [rentInc, setRentInc] = useState("10")
  const [result, setResult] = useState<RentVsBuyResult | null>(null)

  const handleCalc = () => {
    setResult(calcRentVsBuy(
      parseFloat(price), parseFloat(rent), parseInt(years),
      parseFloat(downPct), parseFloat(rate), parseFloat(rentInc)
    ))
  }

  return (
    <CalculatorLayout
      title="إيجار أم شراء؟"
      description="مقارنة مالية شاملة توضح لماذا الشراء هو القرار الأفضل على المدى الطويل"
      icon={<Scale className="h-8 w-8" />}
      result={
        result && (
          <div className="space-y-6">
            {result.buyIsBetter ? (
              <div className="rounded-xl bg-emerald-50 border border-emerald-200 p-4 text-center">
                <TrendingDown className="mx-auto h-8 w-8 text-emerald-600 mb-2" />
                <p className="text-lg font-bold text-emerald-800">الشراء أوفر!</p>
                <p className="text-sm text-emerald-600 mt-1">
                  ستوفر {formatCurrency(result.savings)} على مدى {result.years} سنوات
                </p>
              </div>
            ) : (
              <div className="rounded-xl bg-amber-50 border border-amber-200 p-4 text-center">
                <XCircle className="mx-auto h-8 w-8 text-amber-600 mb-2" />
                <p className="font-bold text-amber-800">الإيجار أقل تكلفة حالياً</p>
                <p className="text-sm text-amber-600 mt-1">
                  الفرق {formatCurrency(result.savings)} لصالح الإيجار
                </p>
              </div>
            )}
            <div className="space-y-3">
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                <span className="text-gray-600 flex items-center gap-2"><Home className="h-4 w-4" /> إجمالي الشراء</span>
                <span className="font-semibold text-emerald-700">{formatCurrency(result.buyTotal)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-gray-50">
                <span className="text-gray-600 flex items-center gap-2"><Building2 className="h-4 w-4" /> إجمالي الإيجار</span>
                <span className="font-semibold text-red-600">{formatCurrency(result.rentTotal)}</span>
              </div>
              <div className="flex justify-between items-center p-3 rounded-lg bg-emerald-50 border border-emerald-200">
                <span className="font-semibold">الوفر</span>
                <span className="font-bold text-xl text-emerald-700">{formatCurrency(result.savings)}</span>
              </div>
            </div>
          </div>
        )
      }
    >
      <Input id="price" label="سعر العقار (جنيه)" type="number" value={price} onChange={(e) => setPrice(e.target.value)} />
      <Input id="rent" label="الإيجار الشهري (جنيه)" type="number" value={rent} onChange={(e) => setRent(e.target.value)} />
      <Input id="years" label="مدة المقارنة (سنوات)" type="number" value={years} onChange={(e) => setYears(e.target.value)} />
      <Input id="downPct" label="مقدمة الشراء (%)" type="number" value={downPct} onChange={(e) => setDownPct(e.target.value)} />
      <Input id="rate" label="فائدة التمويل السنوية (%)" type="number" value={rate} onChange={(e) => setRate(e.target.value)} />
      <Input id="rentInc" label="الزيادة السنوية للإيجار (%)" type="number" value={rentInc} onChange={(e) => setRentInc(e.target.value)} />
      <Button onClick={handleCalc} className="w-full mt-2">قارن</Button>
    </CalculatorLayout>
  )
}
