import Link from "next/link"
import {
  Ruler, PaintBucket, Scale, Wrench, ChartBarStacked, ArrowLeft,
  TrendingUp, Building2, BookOpen, MapPin, HomeIcon, Receipt
} from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  { href: "/calculators/building-materials", title: "حاسبة كميات البناء", desc: "أسمنت، رمل، طوب، حديد", icon: Ruler, c: "text-blue-600 bg-blue-100 dark:bg-blue-950" },
  { href: "/calculators/paint", title: "حاسبة تكلفة الدهان", desc: "كمية الدهان حسب المساحة", icon: PaintBucket, c: "text-pink-600 bg-pink-100 dark:bg-pink-950" },
  { href: "/calculators/rent-vs-buy", title: "إيجار أم شراء؟", desc: "بدون فوائد - ليه الشراء أفضل", icon: Scale, c: "text-amber-600 bg-amber-100 dark:bg-amber-950" },
  { href: "/calculators/finishing", title: "حاسبة تشطيب الشقة", desc: "تقدير تكلفة التشطيب", icon: Wrench, c: "text-purple-600 bg-purple-100 dark:bg-purple-950" },
  { href: "/calculators/roi", title: "العائد على الاستثمار", desc: "ROI ومدة استرداد رأس المال", icon: TrendingUp, c: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950" },
  { href: "/calculators/maintenance", title: "حاسبة الصيانة", desc: "المصاريف الشهرية والسنوية", icon: Building2, c: "text-sky-600 bg-sky-100 dark:bg-sky-950" },
  { href: "/calculators/valuation", title: "تقييم العقار", desc: "قيم أي عقار بالموقع والمساحة والعمر", icon: HomeIcon, c: "text-indigo-600 bg-indigo-100 dark:bg-indigo-950" },
  { href: "/calculators/tax", title: "ضريبة التصرفات", desc: "احسب الضرائب والرسوم العقارية", icon: Receipt, c: "text-rose-600 bg-rose-100 dark:bg-rose-950" },
  { href: "/compare", title: "مقارنة عقارات", desc: "قارن بين عقارين جنباً لجنب", icon: ChartBarStacked, c: "text-teal-600 bg-teal-100 dark:bg-teal-950" },
  { href: "/properties", title: "عقارات", desc: "تصفح وفلتر بالميزانية والموقع", icon: MapPin, c: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950" },
  { href: "/blog", title: "المقالات", desc: "نصائح وإرشادات عقارية", icon: BookOpen, c: "text-orange-600 bg-orange-100 dark:bg-orange-950" },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold sm:text-5xl">عقارك</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">أدوات عقارية ذكية ومجانية: تقييم، ضريبة، مواد بناء، تشطيب، مقارنات وأكثر</p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((t) => (
          <Link key={t.href} href={t.href} className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-800">
              <CardHeader>
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${t.c}`}><t.icon className="h-6 w-6" /></div>
                <CardTitle className="text-lg">{t.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{t.desc}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-emerald-600 dark:text-emerald-500 group-hover:gap-2 transition-all">
                  <span>استخدم الأداة</span>
                  <ArrowLeft className="mr-1 h-4 w-4" />
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
