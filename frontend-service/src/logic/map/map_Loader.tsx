// Nowy plik: GameMapLoader.tsx
import { useEffect, useState } from 'react';
import { MapComponent, GameMap } from '@/components/ui/map'; 
import { createGameMap, MapConfig } from './map_init';

export interface GameMapLoaderProps {
  className?: string;
  mapConfig?: MapConfig;
}

export function GameMapLoader({ className = "", mapConfig }: GameMapLoaderProps) {
  const [gameMap, setGameMap] = useState<GameMap | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  useEffect(() => {
    try {
      const map = mapConfig 
        ? createGameMap(mapConfig) 
        : createGameMap({
            id: 'map-001',
            name: 'Map1',
            tileMapPath: '../../assets/maps/map1_metadata.tmj',
            imagePath: '/assets/maps/forest-dungeon.png',
            obstacleTilesets: ['walls', 'obstacles', 'water']
          });
      
      setGameMap(map);
      setLoading(false);
    } catch (err) {
      console.error('Failed to load map:', err);
      setError('Failed to load game map. Please try again.');
      setLoading(false);
    }
  }, [mapConfig]);
  
  if (loading) {
    return <div className="text-center p-12">Loading map...</div>;
  }
  
  if (error) {
    return <div className="text-center p-12 text-red-500">{error}</div>;
  }
  
  if (!gameMap) {
    return <div className="text-center p-12">No map data available</div>;
  }
  
  return <MapComponent map={gameMap} className={className} />;
}