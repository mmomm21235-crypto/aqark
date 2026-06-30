import Link from "next/link"
import { Ruler, PaintBucket, Scale, Wrench, ChartBarStacked, ArrowLeft, TrendingUp, Building2, BookOpen, MapPin } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const tools = [
  { href: "/calculators/building-materials", title: "حاسبة كميات البناء", description: "أسمنت، رمل، طوب، حديد", icon: Ruler, color: "text-blue-600 bg-blue-100 dark:bg-blue-950" },
  { href: "/calculators/paint", title: "حاسبة تكلفة الدهان", description: "كمية الدهان والتكلفة حسب المساحة", icon: PaintBucket, color: "text-pink-600 bg-pink-100 dark:bg-pink-950" },
  { href: "/calculators/rent-vs-buy", title: "إيجار أم شراء؟", description: "بدون فوائد - اعرف ليه الشراء أفضل", icon: Scale, color: "text-amber-600 bg-amber-100 dark:bg-amber-950" },
  { href: "/calculators/finishing", title: "حاسبة تشطيب الشقة", description: "تقدير تكلفة التشطيب بالكامل", icon: Wrench, color: "text-purple-600 bg-purple-100 dark:bg-purple-950" },
  { href: "/calculators/roi", title: "العائد على الاستثمار", description: "احسب ROI ومدة استرداد رأس المال", icon: TrendingUp, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950" },
  { href: "/calculators/maintenance", title: "حاسبة الصيانة", description: "رسوم الصيانة الشهرية والسنوية", icon: Building2, color: "text-sky-600 bg-sky-100 dark:bg-sky-950" },
  { href: "/compare", title: "مقارنة أسعار العقارات", description: "قارن بين عقارين جنباً لجنب", icon: ChartBarStacked, color: "text-teal-600 bg-teal-100 dark:bg-teal-950" },
  { href: "/properties", title: "عقارات", description: "تصفح العقارات المتاحة", icon: MapPin, color: "text-emerald-600 bg-emerald-100 dark:bg-emerald-950" },
  { href: "/blog", title: "المقالات", description: "نصائح وإرشادات عقارية", icon: BookOpen, color: "text-orange-600 bg-orange-100 dark:bg-orange-950" },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold sm:text-5xl">عقارك</h1>
        <p className="mt-4 text-xl text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
          أدوات عقارية ذكية ومجانية: من البناء إلى التشطيب، ومن الإيجار إلى الشراء
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-800">
              <CardHeader>
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${tool.color}`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{tool.description}</p>
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
