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
  ownershipEquity: number
}

export function calcRentVsBuy(
  propertyPrice: number,
  monthlyRent: number,
  years: number,
  annualAppreciation: number,
  rentIncreasePercent: number
): RentVsBuyResult {
  const appreciationRate = 1 + annualAppreciation / 100
  const annualRentIncrease = 1 + rentIncreasePercent / 100
  let rentTotal = 0
  for (let y = 0; y < years; y++) {
    rentTotal += monthlyRent * 12 * Math.pow(annualRentIncrease, y)
  }
  const ownershipEquity = Math.round(propertyPrice * Math.pow(appreciationRate, years))
  const buyIsBetter = ownershipEquity > rentTotal
  const savings = Math.abs(ownershipEquity - rentTotal)
  return {
    rentTotal: Math.round(rentTotal),
    buyTotal: ownershipEquity,
    buyIsBetter,
    savings: Math.round(savings),
    years,
    monthlyRent,
    propertyPrice,
    ownershipEquity,
  }
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
  return {
    tiling: area * r.tiling,
    plastering: area * r.plastering,
    painting: area * r.painting,
    plumbing: area * r.plumbing,
    electrical: area * r.electrical,
    carpentry: area * r.carpentry,
    total: area * (r.tiling + r.plastering + r.painting + r.plumbing + r.electrical + r.carpentry),
  }
}

export interface ROIResult {
  annualRentIncome: number
  annualExpenses: number
  netAnnualIncome: number
  roi: number
  paybackYears: number
  totalReturn: number
}

export function calcROI(
  propertyPrice: number,
  monthlyRent: number,
  annualMaintenance: number,
  annualTax: number,
  years: number
): ROIResult {
  const annualRentIncome = monthlyRent * 12
  const annualExpenses = annualMaintenance + annualTax
  const netAnnualIncome = annualRentIncome - annualExpenses
  const roi = propertyPrice > 0 ? (netAnnualIncome / propertyPrice) * 100 : 0
  const paybackYears = netAnnualIncome > 0 ? propertyPrice / netAnnualIncome : 0
  const totalReturn = netAnnualIncome * years
  return { annualRentIncome, annualExpenses, netAnnualIncome, roi: Math.round(roi * 100) / 100, paybackYears: Math.round(paybackYears * 10) / 10, totalReturn }
}

export interface MaintenanceResult {
  buildingMaintenance: number
  elevator: number
  cleaning: number
  security: number
  electricity: number
  water: number
  miscellaneous: number
  total: number
  totalYearly: number
}

export interface ValuationResult {
  estimatedValue: number
  pricePerMeter: number
  locationScore: number
  ageScore: number
  specsScore: number
  totalScore: number
  confidence: "منخفض" | "متوسط" | "مرتفع"
}

export function calcValuation(
  basePricePerMeter: number,
  area: number,
  age: number,
  type: "سكني" | "تجاري" | "إداري",
  finishing: "بدون" | "متوسط" | "فاخر",
  floor: number,
  rooms: number,
  bathrooms: number,
  hasElevator: boolean,
  hasParking: boolean
): ValuationResult {
  let typeFactor = type === "سكني" ? 1 : type === "تجاري" ? 1.5 : 1.3
  let finishingFactor = finishing === "بدون" ? 0.7 : finishing === "متوسط" ? 1 : 1.3
  let ageFactor = Math.max(0.5, 1 - age * 0.02)
  let floorFactor = floor <= 2 ? 0.95 : floor <= 5 ? 1 : floor <= 10 ? 1.05 : 1.1
  let roomFactor = 1 + (rooms - 2) * 0.03
  let bathFactor = 1 + (bathrooms - 1) * 0.02
  let amenityFactor = 1 + (hasElevator ? 0.05 : 0) + (hasParking ? 0.08 : 0)

  let score = typeFactor * finishingFactor * ageFactor * floorFactor * roomFactor * bathFactor * amenityFactor
  let pricePerMeter = Math.round(basePricePerMeter * score)
  let estimatedValue = pricePerMeter * area

  let totalScore = score * 100
  let confidence: "منخفض" | "متوسط" | "مرتفع" = totalScore > 90 ? "مرتفع" : totalScore > 70 ? "متوسط" : "منخفض"

  return { estimatedValue, pricePerMeter, locationScore: basePricePerMeter, ageScore: Math.round(ageFactor * 100), specsScore: Math.round(score * 100), totalScore: Math.round(totalScore), confidence }
}

export interface TaxResult {
  transactionTax: number
  registrationFees: number
  notaryFees: number
  stampTax: number
  total: number
}

export function calcPropertyTax(propertyValue: number, isFirstProperty: boolean): TaxResult {
  const transactionTax = propertyValue * 0.025
  const registrationFees = Math.min(propertyValue * 0.01, 50000)
  const notaryFees = 2000
  const stampTax = propertyValue * 0.005
  const firstPropertyDiscount = isFirstProperty ? 0.5 : 0
  const total = (transactionTax + registrationFees + stampTax) * (1 - firstPropertyDiscount) + notaryFees
  return {
    transactionTax: Math.round(transactionTax),
    registrationFees: Math.round(registrationFees),
    notaryFees,
    stampTax: Math.round(stampTax),
    total: Math.round(total),
  }
}

export function calcMaintenance(area: number, hasElevator: boolean, hasSecurity: boolean): MaintenanceResult {
  const buildingMaintenance = area * 10
  const elevator = hasElevator ? 5000 : 0
  const cleaning = area * 5
  const security = hasSecurity ? area * 3 : 0
  const electricity = area * 4
  const water = area * 2
  const miscellaneous = area * 3
  const monthly = buildingMaintenance + elevator + cleaning + security + electricity + water + miscellaneous
  return {
    buildingMaintenance, elevator, cleaning, security, electricity, water, miscellaneous,
    total: monthly,
    totalYearly: monthly * 12,
  }
}
