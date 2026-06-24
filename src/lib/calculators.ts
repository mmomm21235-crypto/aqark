export interface BuildingMaterialsResult {
  cement: number
  sand: number
  bricks: number
  steel: number
}

export function calcBuildingMaterials(
  length: number,
  width: number,
  height: number,
  wallThickness: "12" | "25"
): BuildingMaterialsResult {
  const volume = length * width * height
  const factor = wallThickness === "25" ? 2 : 1
  return {
    cement: Math.round(volume * 8 * factor),
    sand: Math.round(volume * 0.5 * factor),
    bricks: Math.round(volume * 500 * factor),
    steel: Math.round(volume * 0.12 * factor),
  }
}

export interface PaintResult {
  paintLiters: number
  primerLiters: number
  totalCost: number
}

export function calcPaintCost(
  length: number,
  width: number,
  height: number,
  pricePerLiter: number,
  coats: number,
  windows: number,
  doors: number
): PaintResult {
  const wallArea = 2 * (length + width) * height
  const windowArea = windows * 1.5 * 1.5
  const doorArea = doors * 2 * 0.9
  const netArea = Math.max(wallArea - windowArea - doorArea, 0)
  const paintLiters = Math.ceil((netArea / 35) * coats)
  const primerLiters = Math.ceil(netArea / 40)
  const totalCost = (paintLiters + primerLiters) * pricePerLiter
  return { paintLiters, primerLiters, totalCost }
}

export interface RentVsBuyResult {
  rentTotal: number
  buyTotal: number
  buyIsBetter: boolean
  savings: number
  years: number
  monthlyRent: number
  propertyPrice: number
}

export function calcRentVsBuy(
  propertyPrice: number,
  monthlyRent: number,
  years: number,
  downPaymentPercent: number,
  interestRate: number,
  rentIncreasePercent: number
): RentVsBuyResult {
  const downPayment = propertyPrice * (downPaymentPercent / 100)
  const loanAmount = propertyPrice - downPayment
  const monthlyRate = interestRate / 100 / 12
  const totalPayments = years * 12
  const monthlyPayment =
    (loanAmount * (monthlyRate * Math.pow(1 + monthlyRate, totalPayments))) /
    (Math.pow(1 + monthlyRate, totalPayments) - 1)
  const buyTotal = downPayment + monthlyPayment * totalPayments
  const annualRentIncrease = 1 + rentIncreasePercent / 100
  let rentTotal = 0
  for (let y = 0; y < years; y++) {
    rentTotal += monthlyRent * 12 * Math.pow(annualRentIncrease, y)
  }
  const buyIsBetter = buyTotal < rentTotal
  const savings = Math.abs(buyTotal - rentTotal)
  return { rentTotal: Math.round(rentTotal), buyTotal: Math.round(buyTotal), buyIsBetter, savings: Math.round(savings), years, monthlyRent, propertyPrice }
}

export interface FinishingResult {
  tiling: number
  plastering: number
  painting: number
  plumbing: number
  electrical: number
  carpentry: number
  total: number
}

export function calcFinishing(area: number, quality: "economy" | "standard" | "luxury"): FinishingResult {
  const rates = {
    economy: { tiling: 150, plastering: 80, painting: 60, plumbing: 200, electrical: 180, carpentry: 100 },
    standard: { tiling: 250, plastering: 120, painting: 100, plumbing: 350, electrical: 300, carpentry: 200 },
    luxury: { tiling: 450, plastering: 200, painting: 180, plumbing: 600, electrical: 500, carpentry: 400 },
  }
  const r = rates[quality]
  const tiling = area * r.tiling
  const plastering = area * r.plastering
  const painting = area * r.painting
  const plumbing = area * r.plumbing
  const electrical = area * r.electrical
  const carpentry = area * r.carpentry
  return { tiling, plastering, painting, plumbing, electrical, carpentry, total: tiling + plastering + painting + plumbing + electrical + carpentry }
}
