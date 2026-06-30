import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "عقارك - حاسبات ومقالات عقارية",
    short_name: "عقارك",
    description: "أدوات عقارية ذكية ومجانية: حاسبات، مقارنات، مقالات، وخريطة عقارات",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#059669",
    orientation: "portrait-primary",
    dir: "rtl",
    lang: "ar",
    icons: [
      { src: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml" },
      { src: "/icons/icon-512.svg", sizes: "512x512", type: "image/svg+xml" },
      { src: "/icons/icon-192.svg", sizes: "192x192", type: "image/svg+xml", purpose: "maskable" },
    ],
  }
}
