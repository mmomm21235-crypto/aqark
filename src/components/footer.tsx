import Link from "next/link"

export function Footer() {
  return (
    <footer className="border-t bg-white dark:bg-gray-950 dark:border-gray-800 py-10">
      <div className="mx-auto max-w-7xl px-4">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4 mb-8">
          <div>
            <h3 className="font-bold text-emerald-700 dark:text-emerald-500 mb-3">عقارك</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">أدوات عقارية ذكية مجانية لمساعدتك في كل قراراتك العقارية</p>
          </div>
          <div>
            <h4 className="font-semibold mb-3">الحاسبات</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/calculators/building-materials" className="hover:text-emerald-600">مواد البناء</Link></li>
              <li><Link href="/calculators/paint" className="hover:text-emerald-600">الدهان</Link></li>
              <li><Link href="/calculators/rent-vs-buy" className="hover:text-emerald-600">إيجار أم شراء</Link></li>
              <li><Link href="/calculators/finishing" className="hover:text-emerald-600">التشطيب</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">روابط سريعة</h4>
            <ul className="space-y-2 text-sm text-gray-500 dark:text-gray-400">
              <li><Link href="/blog" className="hover:text-emerald-600">المقالات</Link></li>
              <li><Link href="/properties" className="hover:text-emerald-600">العقارات</Link></li>
              <li><Link href="/compare" className="hover:text-emerald-600">مقارنة</Link></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-3">تواصل</h4>
            <p className="text-sm text-gray-500 dark:text-gray-400">للاستفسارات والاقتراحات</p>
          </div>
        </div>
        <div className="border-t dark:border-gray-800 pt-6 text-center text-sm text-gray-500 dark:text-gray-400">
          <p>جميع الحقوق محفوظة &copy; {new Date().getFullYear()} عقارك</p>
        </div>
      </div>
    </footer>
  )
}
