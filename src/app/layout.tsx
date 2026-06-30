import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Navbar } from "@/components/navbar"
import { Footer } from "@/components/footer"
import { ThemeProvider } from "@/components/theme-provider"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "عقارك - حاسبات ومقالات عقارية ذكية",
  description: "مجموعة متكاملة من الحاسبات العقارية: مواد البناء، الدهان، الإيجار مقابل الشراء، التشطيب، العائد على الاستثمار، ومقارنة الأسعار",
  keywords: ["عقارات", "حاسبات عقارية", "مواد بناء", "تشطيب", "استثمار عقاري", "مصر"],
  openGraph: {
    title: "عقارك - حاسبات ومقالات عقارية ذكية",
    description: "أدوات عقارية ذكية مجانية لمساعدتك في كل قراراتك العقارية",
    locale: "ar_AR",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="ar"
      dir="rtl"
      className={`${geistSans.variable} ${geistMono.variable}`}
      suppressHydrationWarning
    >
      <body className="min-h-screen flex flex-col bg-gray-50 dark:bg-gray-950 text-gray-900 dark:text-gray-100">
        <ThemeProvider>
          <Navbar />
          <main className="flex-1">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  )
}
