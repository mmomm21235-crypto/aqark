import type { ReactNode } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ExportPDFBtn } from "@/components/export-pdf-btn"

interface CalculatorLayoutProps {
  title: string
  description: string
  icon: ReactNode
  children: ReactNode
  result?: ReactNode
  id?: string
  resultData?: Record<string, string>
}

export function CalculatorLayout({ title, description, icon, children, result, id, resultData }: CalculatorLayoutProps) {
  return (
    <div className="mx-auto max-w-4xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-600 dark:text-emerald-400">
          {icon}
        </div>
        <h1 className="text-3xl font-bold">{title}</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">{description}</p>
        {result && resultData && (
          <div className="flex justify-center gap-2 mt-3">
            <ExportPDFBtn title={title} />
          </div>
        )}
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
              <div className="flex items-center justify-between">
                <CardTitle>النتيجة</CardTitle>
                {id && <ExportPDFBtn title={title} />}
              </div>
            </CardHeader>
            <CardContent>{result}</CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
