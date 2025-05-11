
// Define the obstacle type
export interface Obstacle {
  x: number;
  y: number;
  width: number;
  height: number;
}

// Define the map interface
export interface GameMap {
  id: string;
  name: string;
  imagePath: string;
  obstacles: Obstacle[];
  width: number;
  height: number;
}

// Map component props interface
export interface MapComponentProps {
  map: GameMap;
  className?: string;
}

// Map component
export function MapComponent({
  map,
  className = "",
}: MapComponentProps) {
  return (
    <div
      className={`relative rounded-xl border bg-card shadow overflow-hidden ${className}`}
      style={{
        width: map.width,
        height: map.height,
      }}
    >
      {/* Map background image */}
      <div 
        className="absolute inset-0 w-full h-full bg-gray-200"
        style={{
          backgroundImage: `url(${map.imagePath})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
        }}
      >
        {/* Fallback when image doesn't load */}
        <div className="absolute inset-0 flex items-center justify-center text-gray-500">
          {map.name} - Map Background
        </div>
      </div>


      {/* Render obstacles */}
      {map.obstacles.map((obstacle: Obstacle, index: number) => (
        <div
          key={`obstacle-${index}`}
          className="absolute bg-red-500/30 border border-red-600"
          style={{
            left: obstacle.x,
            top: obstacle.y,
            width: obstacle.width,
            height: obstacle.height,
          }}
        />
      ))}
    </div>
  );
}

// Map viewer component props interface
export interface MapViewerProps {
  map: GameMap;
  className?: string;
}

// Map viewer component that uses Card components
export function MapViewer({
  map,
  className = "",
}: MapViewerProps) {
  return (
    <div className={`w-full max-w-4xl ${className}`}>
      <div className="mb-6">
        <h2 className="text-2xl font-bold">{map.name}</h2>
        <p className="text-sm text-gray-500">Map ID: {map.id}</p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Map Preview */}
        <div className="md:col-span-2">
          <MapComponent map={map} className="w-full h-96" />
        </div>
        
        {/* Map Details */}
        <div className="space-y-4">
          <div className="rounded-xl border bg-white shadow p-4">
            <h3 className="font-semibold mb-2">Map Details</h3>
            <ul className="space-y-2 text-sm">
              <li><span className="font-medium">Dimensions:</span> {map.width}x{map.height}</li>
              <li><span className="font-medium">Obstacles:</span> {map.obstacles.length}</li>
            </ul>
          </div>
          
          <div className="rounded-xl border bg-white shadow p-4">
            <h3 className="font-semibold mb-2">Obstacle List</h3>
            <div className="max-h-48 overflow-y-auto">
              {map.obstacles.length > 0 ? (
                <ul className="space-y-2 text-sm">
                  {map.obstacles.map((obstacle: Obstacle, index: number) => (
                    <li key={index} className="border-b pb-1 last:border-0">
                      #{index+1}: ({obstacle.x}, {obstacle.y}) - {obstacle.width}x{obstacle.height}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-sm text-gray-500">No obstacles defined</p>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}