"use client"

import { Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { exportToPDF } from "@/lib/export-pdf"

export function ExportPDFBtn({ title }: { title: string }) {
  return (
    <Button variant="outline" size="sm" onClick={() => exportToPDF(title)}>
      <Printer className="h-4 w-4" /> PDF
    </Button>
  )
}
