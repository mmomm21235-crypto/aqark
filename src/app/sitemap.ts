import type { MetadataRoute } from "next"

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://aqark-delta.vercel.app"
  const routes = [
    "", "/calculators/building-materials", "/calculators/paint", "/calculators/rent-vs-buy",
    "/calculators/finishing", "/calculators/roi", "/calculators/maintenance",
    "/compare", "/blog", "/properties",
  ]
  const slugs = ["نصائح-شراء-أول-عقار", "الفرق-بين-الإيجار-و-التملك", "حساب-تكاليف-البناء", "تشطيب-شقة-بميزانية-محدودة", "الاستثمار-العقاري-للمبتدئين", "رسوم-الصيانة-في-المجمعات-السكنية"]
  return [
    ...routes.map((route) => ({ url: `${baseUrl}${route}`, lastModified: new Date(), changeFrequency: "monthly" as const, priority: route === "" ? 1 : 0.8 })),
    ...slugs.map((slug) => ({ url: `${baseUrl}/blog/${slug}`, lastModified: new Date(), changeFrequency: "weekly" as const, priority: 0.6 })),
  ]
}
