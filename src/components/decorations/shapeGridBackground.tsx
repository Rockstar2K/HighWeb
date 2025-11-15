"use client"

import { CSSProperties, HTMLAttributes, useMemo } from "react"

type ShapeConfig = {
  position: number
  borderRadius?: string
}

type ShapeStyle = ShapeConfig & {
  background: string
  boxShadow: string
}

const SHAPE_CONFIGS: ShapeConfig[] = [
  { position: 10, borderRadius: "65px" },
  { position: 24, borderRadius: "65px" },
  { position: 15, borderRadius: "0" },
  { position: 16, borderRadius: "0 0 65px 0" },
  { position: 19, borderRadius: "0 65px 0 0" },
  { position: 27, borderRadius: "0 65px 0 65px" },
  { position: 28, borderRadius: "65px" },
  { position: 35, borderRadius: "65px 0 65px 0" },
  { position: 37, borderRadius: "65px 65px 0 65px" },
  { position: 42, borderRadius: "65px 65px 0 0" },
  { position: 45, borderRadius: "65px 65px 0 0" },
  { position: 48, borderRadius: "0" },
  { position: 49, borderRadius: "0 0 65px 0" },
  { position: 50, borderRadius: "0 65px 0 65px" },
  { position: 51, borderRadius: "0 0 65px 0" },
  { position: 52, borderRadius: "65px" },
]

export interface ShapeGridBackgroundProps
  extends Omit<HTMLAttributes<HTMLDivElement>, "children"> {
  scrollProgress?: number
  showOnMobile?: boolean
  rows?: number
  columns?: number
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
        background: getRandomGradient(),
        boxShadow: getRandomShadow(),
      })
      return acc
    }, new Map())
  }, [])

  const effectiveProgress = Math.min(scrollProgress, 0.6)
  const combinedStyle: CSSProperties = {
    gridTemplateColumns: `repeat(${columns}, 1fr)`,
    gridTemplateRows: `repeat(${rows}, 1fr)`,
    ...style,
  }

  return (
    <div
      {...rest}
      className={`absolute inset-0 w-full h-full overflow-visible pointer-events-none -z-10 ${
        showOnMobile ? "grid" : "hidden lg:grid"
      } ${className}`}
      style={combinedStyle}
    >
      {Array.from({ length: rows * columns }).map((_, i) => {
        const currentShape = shapes.get(i)
        const depth = 140 + Math.floor(i / columns) * 28

        return (
          <div key={i} className="relative w-full">
            <div aria-hidden style={{ paddingBottom: "100%" }} />
            {currentShape && (
              <div
                className="absolute inset-0 flex items-center justify-center p-0"
                style={{
                  transform: `translate3d(0, ${effectiveProgress * depth}px, 0)`,
                }}
              >
                <div
                  className="w-full h-full"
                  style={{
                    boxShadow: currentShape.boxShadow,
                    background: currentShape.background,
                    borderRadius: currentShape.borderRadius ?? "0",
                  }}
                />
              </div>
            )}
          </div>
        )
      })}
    </div>
  )
}
