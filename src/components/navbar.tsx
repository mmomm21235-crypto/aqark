import Link from "next/link"
import { Building2 } from "lucide-react"

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/calculators/building-materials", label: "مواد البناء" },
  { href: "/calculators/paint", label: "الدهان" },
  { href: "/calculators/rent-vs-buy", label: "إيجار أم شراء" },
  { href: "/calculators/finishing", label: "التشطيب" },
  { href: "/compare", label: "مقارنة" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700">
          <Building2 className="h-6 w-6" />
          <span>عقارك</span>
        </Link>
        <nav className="hidden md:flex items-center gap-6">
          {navItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors"
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  )
}
