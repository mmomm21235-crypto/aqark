"use client"

import { useState } from "react"
import { Receipt } from "lucide-react"
import { CalculatorLayout } from "@/components/calculator-layout"
import { Input } from "@/components/ui/input"
import { Select } from "@/components/ui/select"
import { Button } from "@/components/ui/button"
import { calcPropertyTax, type TaxResult } from "@/lib/calculators"
import { formatCurrency } from "@/lib/utils"

export default function TaxPage() {
  const [value, setValue] = useState("5000000")
  const [firstProperty, setFirstProperty] = useState("yes")
  const [result, setResult] = useState<TaxResult | null>(null)

  const handleCalc = () => {
    setResult(calcPropertyTax(parseFloat(value), firstProperty === "yes"))
  }

  const items = [
    { key: "transactionTax", label: "ضريبة التصرفات العقارية (2.5%)" },
    { key: "registrationFees", label: "رسوم الشهر العقاري" },
    { key: "stampTax", label: "الدمغة والطوابع" },
    { key: "notaryFees", label: "رسوم التوثيق" },
  ] as const

  return (
    <CalculatorLayout
      title="حاسبة ضريبة التصرفات العقارية"
      description="احسب الضرائب والرسوم المطلوبة عند شراء أو بيع العقار"
      icon={<Receipt className="h-8 w-8" />}
      result={result && (
        <div className="space-y-4">
          {items.map(({ key, label }) => (
            <div key={key} className="flex justify-between p-3 rounded-lg bg-gray-50 dark:bg-gray-900">
              <span className="text-gray-600 dark:text-gray-400">{label}</span>
              <span className="font-semibold">{formatCurrency(result[key as keyof TaxResult] as number)}</span>
            </div>
          ))}
          <div className="flex justify-between p-3 rounded-lg bg-emerald-50 dark:bg-emerald-950 border border-emerald-200 dark:border-emerald-800">
            <span className="font-semibold text-emerald-800 dark:text-emerald-300">الإجمالي</span>
            <span className="font-bold text-xl text-emerald-700 dark:text-emerald-400">{formatCurrency(result.total)}</span>
          </div>
          <p className="text-xs text-gray-500 dark:text-gray-400 text-center">* الأسعار تقريبية وقد تختلف حسب التحديثات الحكومية</p>
        </div>
      )}
    >
      <Input id="value" label="قيمة العقار (جنيه)" type="number" value={value} onChange={(e) => setValue(e.target.value)} />
      <Select id="firstProperty" label="هل هذا أول عقار تملكه؟" value={firstProperty} onChange={(e) => setFirstProperty(e.target.value)} options={[{ value: "yes", label: "نعم" }, { value: "no", label: "لا" }]} />
      <Button onClick={handleCalc} className="w-full mt-2">احسب الضرائب</Button>
    </CalculatorLayout>
  )
}
