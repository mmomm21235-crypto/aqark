import Link from "next/link"
import { Building2, Menu } from "lucide-react"
import { ThemeToggle } from "@/components/theme-toggle"

const navItems = [
  { href: "/", label: "الرئيسية" },
  { href: "/calculators/building-materials", label: "مواد البناء" },
  { href: "/calculators/paint", label: "الدهان" },
  { href: "/calculators/rent-vs-buy", label: "إيجار أم شراء" },
  { href: "/calculators/finishing", label: "التشطيب" },
  { href: "/calculators/roi", label: "العائد على الاستثمار" },
  { href: "/calculators/maintenance", label: "الصيانة" },
  { href: "/compare", label: "مقارنة" },
  { href: "/blog", label: "المقالات" },
  { href: "/properties", label: "عقارات" },
]

export function Navbar() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:bg-gray-950/95 dark:border-gray-800">
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        <Link href="/" className="flex items-center gap-2 font-bold text-xl text-emerald-700 dark:text-emerald-500">
          <Building2 className="h-6 w-6" />
          <span>عقارك</span>
        </Link>
        <div className="flex items-center gap-4">
          <nav className="hidden lg:flex items-center gap-5">
            {navItems.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="text-sm font-medium text-gray-600 hover:text-emerald-700 transition-colors dark:text-gray-400 dark:hover:text-emerald-500"
              >
                {item.label}
              </Link>
            ))}
          </nav>
          <ThemeToggle />
          <details className="lg:hidden relative">
            <summary className="list-none cursor-pointer p-1">
              <Menu className="h-5 w-5" />
            </summary>
            <div className="absolute left-0 top-full mt-2 w-48 rounded-xl border bg-white p-2 shadow-lg dark:bg-gray-900 dark:border-gray-700">
              {navItems.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block px-3 py-2 rounded-lg text-sm hover:bg-gray-100 dark:hover:bg-gray-800"
                >
                  {item.label}
                </Link>
              ))}
            </div>
          </details>
        </div>
      </div>
    </header>
  )
}
