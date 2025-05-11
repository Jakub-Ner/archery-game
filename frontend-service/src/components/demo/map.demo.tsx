import { MapComponent, MapViewer, GameMap } from '@/components/ui/map';
import { MAPS_LOCATION } from '@/consts';

// Mock map data
const mockMap: GameMap = {
  id: "map-001",
  name: "MAP1",
  imagePath: `${MAPS_LOCATION}/map1.png`,
  width: 2048,
  height: 2048,
  obstacles: [
    { x: 9*32, y: 0*32, width: 32, height: 32 },
    { x: 7*32, y: 1*32, width: 32, height: 32 },
    { x: 53*32, y: 1*32, width: 32, height: 32 },
    { x: 34*32, y: 2*32, width: 32, height: 32 },
  ],
};

export default function MapDemo() {
  
  const mockMap2: GameMap = {
    id: "map-002",
    name: "MAP2",
    imagePath: `${MAPS_LOCATION}/map2.png`,
    width: 2048,
    height: 2048,
    obstacles: [
      { x: 150*32, y: 150*32, width: 32, height: 32 },
      { x: 400*32, y: 250*32, width: 32, height: 32 },
      { x: 300*32, y: 350*32, width: 32, height: 32 },
    ],
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Map Component Demo</h1>
      
      <div className="space-y-12">
        <MapViewer map={mockMap} />
        <MapViewer map={mockMap2} />
      </div>
      
      <div className="mt-8 pt-8 border-t">
        <h2 className="text-xl font-semibold mb-4">Individual Map Components</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium mb-2">{mockMap.name}</h3>
            <MapComponent map={mockMap} className="w-full h-64" />
          </div>
          <div>
            <h3 className="font-medium mb-2">{mockMap2.name}</h3>
            <MapComponent map={mockMap2} className="w-full h-64" />
          </div>
        </div>
      </div>
    </div>
  );
}