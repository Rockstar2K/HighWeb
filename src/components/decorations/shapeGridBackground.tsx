"use client"

import { CSSProperties, HTMLAttributes, useMemo } from "react"

type ShapeConfig = {
  position: number
  type?: "circle" | "square"
  borderRadius?: string
}

type ShapeStyle = ShapeConfig & {
  type: "circle" | "square"
  background: string
  boxShadow: string
}

const SHAPE_CONFIGS: ShapeConfig[] = [
  { position: 10, type: "circle" },
  { position: 24, type: "circle" },
  { position: 15, type: "square", borderRadius: "0%" },
  { position: 16, type: "square", borderRadius: "0 0 65px 0" },
  { position: 19, type: "square", borderRadius: "0 65px 0 0" },
  { position: 27, type: "square", borderRadius: "0 65px 0 65px" },
  { position: 28, type: "circle" },
  { position: 35, type: "square", borderRadius: "65px 0 65px 0" },
  { position: 37, type: "square", borderRadius: "65px 65px 0 65px" },
  { position: 42, type: "square", borderRadius: "65px 65px 0 0" },
  { position: 45, type: "square", borderRadius: "65px 65px 0 0" },
  { position: 48, type: "square", borderRadius: "0%" },
  { position: 49, type: "square", borderRadius: "0 0 65px 0" },
  { position: 50, type: "square", borderRadius: "0 65px 0 65px" },
  { position: 51, type: "square", borderRadius: "0 0 65px 0" },
  { position: 52, type: "circle" },
]

export interface ShapeGridBackgroundProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  scrollProgress?: number
  showOnMobile?: boolean
  rows?: number
  columns?: number
  visibleRows?: number
  rowStart?: number
  hiddenPositions?: number[]
  hiddenColumns?: number[]
}

const DEFAULT_ROWS = 6
const DEFAULT_COLUMNS = 9

export function ShapeGridBackground({
  scrollProgress = 0,
  className = "",
  style,
  showOnMobile = false,
  rows = DEFAULT_ROWS,
  columns = DEFAULT_COLUMNS,
  visibleRows,
  rowStart = 0,
  hiddenPositions = [],
  hiddenColumns = [],
  ...rest
}: ShapeGridBackgroundProps) {
  const shapes = useMemo(() => {
    const getRandomShadow = () => {
      const offsetX = Math.floor(Math.random() * 5)
      const offsetY = Math.floor(Math.random() * 5)
      const blur = 16 + Math.floor(Math.random() * 24)
      const spread = 4 + Math.floor(Math.random() * 8)
      const opacity = 0.1 + Math.random() * 0.15
      return `${offsetX}px ${offsetY}px ${blur}px ${spread}px rgba(0, 0, 0, ${opacity.toFixed(2)})`
    }

    const getRandomGradient = () => {
      const directions = [
        "to right",
        "to left",
        "to bottom",
        "to top",
        "to bottom right",
        "to top left",
        "to bottom left",
        "to top right",
      ]
      const direction = directions[Math.floor(Math.random() * directions.length)]
      const minLightness = 245
      const randomLightness = minLightness + Math.floor(Math.random() * (256 - minLightness))
      const randomColor = `rgb(${randomLightness}, ${randomLightness}, ${randomLightness})`

      return `linear-gradient(${direction}, #FFFFFF, ${randomColor})`
    }

    return SHAPE_CONFIGS.reduce<Map<number, ShapeStyle>>((acc, config) => {
      acc.set(config.position, {
        ...config,
        type: config.type ?? "square",
        background: getRandomGradient(),
        boxShadow: getRandomShadow(),
      })
      return acc
    }, new Map())
  }, [])

  const hiddenPositionsSet = useMemo(() => new Set(hiddenPositions), [hiddenPositions])
  const hiddenColumnsSet = useMemo(() => new Set(hiddenColumns), [hiddenColumns])

  const effectiveProgress = Math.min(scrollProgress, 0.6)
  const combinedStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    ...style,
  }

  const rowLimit = visibleRows ?? rows

  return (
    <div
      {...rest}
      className={`absolute inset-0 w-full h-full overflow-visible pointer-events-none -z-10 ${
        showOnMobile ? "grid" : "hidden lg:grid"
      } ${className}`}
      style={combinedStyle}
    >
      {Array.from({ length: rows * columns }).map((_, index) => {
        const rowIndex = Math.floor(index / columns)
        const columnIndex = index % columns
        if (rowIndex < rowStart || rowIndex >= rowStart + rowLimit) return null
        if (hiddenColumnsSet.has(columnIndex)) return null
        const globalIndex = index
        const currentShape = shapes.get(globalIndex)
        const depth = 140 + Math.floor(globalIndex / columns) * 28

        return (
          <div key={`${rowStart}-${index}`} className="relative w-full">
            <div aria-hidden style={{ paddingBottom: "100%" }} />
            {currentShape && !hiddenPositionsSet.has(globalIndex) && (
              <div
                className="absolute inset-0 flex items-center justify-center p-0"
                style={{
                  transform: `translate3d(0, ${effectiveProgress * depth}px, 0)`,
                }}
              >
                {currentShape.type === "circle" ? (
                  <div className="relative flex items-center justify-center h-full" style={{ width: "auto" }}>
                    <div
                      className="relative h-full rounded-full"
                      style={{
                        aspectRatio: "1/1",
                        boxShadow: currentShape.boxShadow,
                        background: currentShape.background,
                      }}
                    />
                  </div>
                ) : (
                  <div
                    className="w-full h-full"
                    style={{
                      boxShadow: currentShape.boxShadow,
                      background: currentShape.background,
                      borderRadius: currentShape.borderRadius ?? "0",
                    }}
                  />
                )}
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
