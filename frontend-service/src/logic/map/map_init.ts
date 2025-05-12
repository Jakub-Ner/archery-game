import { findTilesInMap } from './tiles_finder';
import { GameMap, Obstacle } from '@/components/ui/map';
import { TILE_HEIGHT, TILE_WIDTH, MAP_WIDTH, MAP_HEIGHT } from '@/consts';


/**
 * Initializes a game map using tileset data
 * @param mapId - Unique identifier for the map
 * @param mapName - Display name for the map
 * @param tileMapPath - Path to the Tiled JSON map file
 * @param mapImagePath - Path to the map background image
 * @param obstacleTilesets - Names of tilesets that represent obstacles
 * @returns A fully initialized GameMap object
 */
export function initializeGameMap(
  mapId: string,
  mapName: string,
  tileMapPath: string,
  mapImagePath: string,
  obstacleTilesets: string[]
): GameMap {
  // Load the map dimensions from the Tiled map
  // This could be improved to actually read the map dimensions from the file
  // For now we'll use placeholder values

  // Find all tiles that belong to obstacle tilesets
  const tileLocations = findTilesInMap(tileMapPath, obstacleTilesets);
  
  // Convert tile locations to obstacle objects
  // By default, each obstacle has the size of one tile
  const obstacles: Obstacle[] = tileLocations.map(location => ({
    x: location.x * TILE_WIDTH,
    y: location.y * TILE_HEIGHT,
    width: TILE_WIDTH,
    height: TILE_HEIGHT
  }));
  
  // Optional: Optimize obstacles by merging adjacent tiles
  // This step is optional but can reduce the number of obstacle objects
  const mergedObstacles = mergeAdjacentObstacles(obstacles);
  
  // Create and return the game map object
  return {
    id: mapId,
    name: mapName,
    imagePath: mapImagePath,
    obstacles: mergedObstacles,
    width: MAP_WIDTH,
    height: MAP_HEIGHT,
  };
}

/**
 * Merges adjacent obstacles with the same dimensions to reduce the total number of objects
 * This can significantly improve performance for large maps
 */
function mergeAdjacentObstacles(obstacles: Obstacle[]): Obstacle[] {
  if (obstacles.length === 0) return [];
  
  // First, create a 2D grid to easily identify adjacent obstacles
  const obstacleGrid: { [key: string]: Obstacle } = {};
  
  // Place obstacles in the grid
  obstacles.forEach(obstacle => {
    const key = `${obstacle.x},${obstacle.y}`;
    obstacleGrid[key] = obstacle;
  });
  
  // Sort obstacles by position for consistent processing
  const sortedObstacles = [...obstacles].sort((a, b) => {
    if (a.y !== b.y) return a.y - b.y;
    return a.x - b.x;
  });
  
  // Merged obstacles array
  const result: Obstacle[] = [];
  // Keep track of processed obstacles
  const processed = new Set<string>();
  
  // Process each obstacle
  for (const obstacle of sortedObstacles) {
    const key = `${obstacle.x},${obstacle.y}`;
    
    // Skip if already processed
    if (processed.has(key)) continue;
    
    // Mark as processed
    processed.add(key);
    
    // Try to merge horizontally first
    const mergedObstacle = { ...obstacle };
    let canMergeHorizontally = true;
    
    // Keep expanding horizontally as long as possible
    while (canMergeHorizontally) {
      const nextX = mergedObstacle.x + mergedObstacle.width;
      const nextKey = `${nextX},${mergedObstacle.y}`;
      
      if (obstacleGrid[nextKey] && 
          obstacleGrid[nextKey].height === mergedObstacle.height &&
          !processed.has(nextKey)) {
        // Merge horizontally
        mergedObstacle.width += obstacleGrid[nextKey].width;
        processed.add(nextKey);
      } else {
        canMergeHorizontally = false;
      }
    }
    
    result.push(mergedObstacle);
  }
  
  return result;
}

/**
 * Example usage:
 * 
 * This is how you would use the above functions to initialize your game map
 * at the beginning of your game
 */
/**
 * Interface definiujące konfigurację mapy
 */
export interface MapConfig {
  id: string;
  name: string;
  tileMapPath: string;
  imagePath: string;
  obstacleTilesets: string[];
}

/**
 * Tworzy mapę gry na podstawie przekazanej konfiguracji
 * @param mapConfig - Obiekt zawierający wszystkie ustawienia mapy
 * @returns GameMap - Zainicjalizowana mapa gry
 */
export function createGameMap(mapConfig: MapConfig): GameMap {
  // Initialize map
  return initializeGameMap(
    mapConfig.id,
    mapConfig.name,
    mapConfig.tileMapPath,
    mapConfig.imagePath,
    mapConfig.obstacleTilesets
  );
}

/**
  * Example usage:
 * 
 * const mapConfig = {
 *   id: 'map-002',
 *   name: 'Map2',
 *   tileMapPath: '../../assets/maps/map2_metadata.tmj',
 *   imagePath: '/assets/maps/map2.png',
 *   obstacleTilesets: ['TX Props', 'TX Tileset Wall', 'TX Struct']
 * };
 * 
 * const gameMap = createGameMap(mapConfig);
 */