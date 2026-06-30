"use client"

import { useEffect } from "react"
import { registerSW } from "@/lib/register-sw"

export function PWARegister() {
  useEffect(() => { registerSW() }, [])
  return null
}
