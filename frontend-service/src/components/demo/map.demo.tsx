import { MapViewer, GameMap } from '@/components/ui/map';
import { MAPS_LOCATION } from '@/consts';

// Mock map data
const mockMap: GameMap = {
  id: "map-001",
  name: "MAP1",
  imagePath: `${MAPS_LOCATION}/map1.png`,
  width: 2048,
  height: 2048,
  obstacles: [
    { x: 22*32, y: 0*32, width: 32, height: 32 },
    { x: 23*32, y: 17*32, width: 32, height: 32 },
    { x: 35*32, y: 39*32, width: 32, height: 32 },
  ],
};
//
export default function MapDemo() {
  
  const mockMap2: GameMap = {
    id: "map-002",
    name: "MAP2",
    imagePath: `${MAPS_LOCATION}/map2.png`,
    width: 2048,
    height: 2048,
    obstacles: [
    { x: 22*32, y: 0*32, width: 32, height: 32 },
    { x: 23*32, y: 17*32, width: 32, height: 32 },
    { x: 35*32, y: 39*32, width: 32, height: 32 },
  ],
  };

  return (
    <div className="p-6 space-y-8">
      <h1 className="text-3xl font-bold mb-8">Map Component Demo</h1>
      
      <div className="space-y-12">
        <MapViewer map={mockMap} />
        <MapViewer map={mockMap2} />
      </div>
      
      
    </div>
  );
}