import Link from "next/link"
import { Ruler, PaintBucket, Scale, Wrench, ChartBarStacked, ArrowLeft } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

const tools = [
  {
    href: "/calculators/building-materials",
    title: "حاسبة كميات البناء",
    description: "احسب كميات الأسمنت والرمل والطوب والحديد المطلوبة لمشروعك",
    icon: Ruler,
    color: "text-blue-600 bg-blue-100",
  },
  {
    href: "/calculators/paint",
    title: "حاسبة تكلفة الدهان",
    description: "احسب كمية الدهان والتكلفة حسب مساحة الغرفة وعدد الأبواب والنوافذ",
    icon: PaintBucket,
    color: "text-pink-600 bg-pink-100",
  },
  {
    href: "/calculators/rent-vs-buy",
    title: "إيجار أم شراء؟",
    description: "مقارنة مالية ذكية توضح لماذا الشراء أوفر من الإيجار على المدى الطويل",
    icon: Scale,
    color: "text-amber-600 bg-amber-100",
  },
  {
    href: "/calculators/finishing",
    title: "حاسبة تشطيب الشقة",
    description: "تقدير تكلفة تشطيب الشقة بالكامل حسب المساحة ومستوى الجودة",
    icon: Wrench,
    color: "text-purple-600 bg-purple-100",
  },
  {
    href: "/compare",
    title: "مقارنة أسعار العقارات",
    description: "قارن بين عقارين من حيث السعر والمساحة والموقع والقيمة",
    icon: ChartBarStacked,
    color: "text-emerald-600 bg-emerald-100",
  },
]

export default function Home() {
  return (
    <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="text-center mb-12">
        <h1 className="text-4xl font-bold text-gray-900 sm:text-5xl">
          عقارك
        </h1>
        <p className="mt-4 text-xl text-gray-600 max-w-2xl mx-auto">
          مجموعة أدوات ذكية لمساعدتك في كل قراراتك العقارية: من البناء إلى التشطيب، ومن الإيجار إلى الشراء
        </p>
      </div>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {tools.map((tool) => (
          <Link key={tool.href} href={tool.href} className="group">
            <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1">
              <CardHeader>
                <div className={`mb-3 flex h-12 w-12 items-center justify-center rounded-xl ${tool.color}`}>
                  <tool.icon className="h-6 w-6" />
                </div>
                <CardTitle className="text-lg">{tool.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600">{tool.description}</p>
                <div className="mt-4 flex items-center text-sm font-medium text-emerald-600 group-hover:gap-2 transition-all">
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
