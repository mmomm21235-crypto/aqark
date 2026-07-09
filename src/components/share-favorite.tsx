"use client"

import { Heart, Share2 } from "lucide-react"
import { addFavorite, removeFavorite, isFavorite, shareResult } from "@/lib/favorites"
import { Button } from "@/components/ui/button"
import { useEffect, useState } from "react"

interface ShareFavoriteProps {
  id: string
  title: string
  value: string
  type: "property" | "calculation"
}

export function ShareFavorite({ id, title, value, type }: ShareFavoriteProps) {
  const [fav, setFav] = useState(false)
  useEffect(() => { setFav(isFavorite(id)) }, [id])

  const toggleFav = () => {
    if (fav) {
      removeFavorite(id)
      setFav(false)
    } else {
      addFavorite({ id, type, title, value, url: window.location.href })
      setFav(true)
    }
  }

  return (
    <div className="flex gap-2">
      <Button variant="outline" size="sm" onClick={toggleFav}>
        <Heart className={`h-4 w-4 ${fav ? "fill-red-500 text-red-500" : ""}`} />
      </Button>
      <Button variant="outline" size="sm" onClick={() => shareResult(title, `${title}: ${value}`, window.location.href)}>
        <Share2 className="h-4 w-4" />
      </Button>
    </div>
  )
}
