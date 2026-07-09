export interface FavoriteItem {
  id: string
  type: "property" | "calculation"
  title: string
  value: string
  url: string
}

export function getFavorites(): FavoriteItem[] {
  if (typeof window === "undefined") return []
  try {
    return JSON.parse(localStorage.getItem("aqark-favorites") || "[]")
  } catch { return [] }
}

export function addFavorite(item: FavoriteItem) {
  const favs = getFavorites()
  if (!favs.some((f) => f.id === item.id)) {
    favs.push(item)
    localStorage.setItem("aqark-favorites", JSON.stringify(favs))
  }
}

export function removeFavorite(id: string) {
  const favs = getFavorites().filter((f) => f.id !== id)
  localStorage.setItem("aqark-favorites", JSON.stringify(favs))
}

export function isFavorite(id: string): boolean {
  return getFavorites().some((f) => f.id === id)
}

export function shareResult(title: string, text: string, url?: string) {
  const shareData = { title, text, url: url || window.location.href }
  if (navigator.share) {
    navigator.share(shareData).catch(() => {})
  } else {
    navigator.clipboard.writeText(`${text}\n${shareData.url}`).then(() => {
      alert("تم نسخ الرابط!")
    })
  }
}
