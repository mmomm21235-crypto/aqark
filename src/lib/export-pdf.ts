export function exportToPDF(title: string) {
  window.print()
}

export function formatResultForPrint(title: string, data: Record<string, string>): string {
  const lines = [
    `═══════════════════════════════════`,
    `         ${title}`,
    `═══════════════════════════════════`,
    `التاريخ: ${new Date().toLocaleDateString("ar-EG")}`,
    `───────────────────────────────────`,
  ]
  Object.entries(data).forEach(([key, val]) => {
    lines.push(`${key}: ${val}`)
  })
  lines.push(`═══════════════════════════════════`)
  lines.push(`عقارك - aqark-delta.vercel.app`)
  return lines.join("\n")
}
