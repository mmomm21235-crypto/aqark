import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

interface CalculatorLayoutProps {
  title: string
  description: string
  icon: ReactNode
  children: ReactNode
  result?: ReactNode
}

export function CalculatorLayout({ title, description, icon, children, result }: CalculatorLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 text-emerald-600">
          {icon}
        </div>
        <h1 className="text-3xl font-bold text-gray-900">{title}</h1>
        <p className="mt-2 text-gray-600">{description}</p>
      </div>
      <div className="grid gap-8 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>البيانات</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">{children}</CardContent>
        </Card>
        {result && (
          <Card>
            <CardHeader>
              <CardTitle>النتيجة</CardTitle>
            </CardHeader>
            <CardContent>{result}</CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
