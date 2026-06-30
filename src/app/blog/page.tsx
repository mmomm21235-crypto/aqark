import Link from "next/link"
import { BookOpen, Calendar, User } from "lucide-react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

const articles = [
  {
    slug: "نصائح-شراء-أول-عقار",
    title: "نصائح مهمة قبل شراء أول عقار لك",
    excerpt: "دليلك الشامل لشراء أول عقار: من تحديد الميزانية إلى التوقيع على العقد",
    author: "فريق عقارك",
    date: "2026-06-15",
    readTime: "5 دقائق",
  },
  {
    slug: "الفرق-بين-الإيجار-و-التملك",
    title: "الفرق بين الإيجار والتملك: أيهما أفضل لك؟",
    excerpt: "مقارنة شاملة بين الإيجار طويل المدى وتملك العقار مع تحليل المزايا والعيوب",
    author: "فريق عقارك",
    date: "2026-06-10",
    readTime: "7 دقائق",
  },
  {
    slug: "حساب-تكاليف-البناء",
    title: "كيف تحسب تكاليف البناء بدقة؟",
    excerpt: "طريقة حساب كميات المواد المطلوبة للبناء مع نصائح لتوفير التكاليف",
    author: "فريق عقارك",
    date: "2026-06-05",
    readTime: "6 دقائق",
  },
  {
    slug: "تشطيب-شقة-بميزانية-محدودة",
    title: "تشطيب شقة بميزانية محدودة: دليل عملي",
    excerpt: "أفضل الطرق لتشطيب شقتك بأقل التكاليف مع الحفاظ على الجودة",
    author: "فريق عقارك",
    date: "2026-05-28",
    readTime: "8 دقائق",
  },
  {
    slug: "الاستثمار-العقاري-للمبتدئين",
    title: "الاستثمار العقاري للمبتدئين: دليل شامل",
    excerpt: "كل ما تحتاج معرفته عن الاستثمار في العقارات: الأنواع، المخاطر، والعوائد",
    author: "فريق عقارك",
    date: "2026-05-20",
    readTime: "10 دقائق",
  },
  {
    slug: "رسوم-الصيانة-في-المجمعات-السكنية",
    title: "رسوم الصيانة في المجمعات السكنية: فهم والتخطيط",
    excerpt: "شرح مفصل لرسوم الصيانة الشهرية والسنوية وكيفية تخطيط ميزانيتك",
    author: "فريق عقارك",
    date: "2026-05-15",
    readTime: "4 دقائق",
  },
]

export default function BlogPage() {
  return (
    <div className="mx-auto max-w-5xl px-4 py-8 sm:px-6 lg:px-8">
      <div className="mb-8 text-center">
        <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 dark:bg-orange-950 text-orange-600">
          <BookOpen className="h-8 w-8" />
        </div>
        <h1 className="text-3xl font-bold">المقالات العقارية</h1>
        <p className="mt-2 text-gray-600 dark:text-gray-400">نصائح وإرشادات لمساعدتك في قراراتك العقارية</p>
      </div>
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {articles.map((article) => (
          <Link key={article.slug} href={`/blog/${article.slug}`}>
            <Card className="h-full transition-all hover:shadow-lg hover:-translate-y-1 dark:bg-gray-900 dark:border-gray-800">
              <CardHeader>
                <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400 mb-2">
                  <span className="flex items-center gap-1"><Calendar className="h-3 w-3" /> {article.date}</span>
                  <span>{article.readTime}</span>
                </div>
                <h2 className="text-lg font-semibold leading-tight">{article.title}</h2>
              </CardHeader>
              <CardContent>
                <p className="text-sm text-gray-600 dark:text-gray-400">{article.excerpt}</p>
                <div className="mt-3 flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                  <User className="h-3 w-3" /> {article.author}
                </div>
              </CardContent>
            </Card>
          </Link>
        ))}
      </div>
    </div>
  )
}
