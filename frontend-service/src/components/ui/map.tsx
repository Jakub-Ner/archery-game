import * as React from "react"
import { cn } from "@/lib/utils"

export interface MapProps extends React.HTMLAttributes<HTMLDivElement> {
  src: string
  alt?: string
  width?: string | number
  height?: string | number
  className?: string
  overlays?: React.ReactNode
}

const Map = React.forwardRef<HTMLDivElement, MapProps>(
  ({ src, alt = "Mapa", width = "100%", height = "500px", className, overlays, ...props }, ref) => {
    const [isLoaded, setIsLoaded] = React.useState(false)

    return (
      <div 
        ref={ref}
        className={cn("relative overflow-hidden", className)} 
        style={{ width, height }}
        {...props}
      >
        <img
          src={src}
          alt={alt}
          className={cn("w-full h-full object-cover", !isLoaded && "opacity-0")}
          onLoad={() => setIsLoaded(true)}
        />
        {!isLoaded && (
          <div className="absolute inset-0 flex items-center justify-center bg-accent/20">
            Ładowanie mapy...
          </div>
        )}
        {overlays && <div className="absolute inset-0">{overlays}</div>}
      </div>
    )
  }
)

Map.displayName = "Map"

export { Map }