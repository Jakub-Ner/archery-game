import * as fs from 'fs';
import * as zlib from 'zlib';
import { TILES_NUM } from '@/consts';


// Interfaces for Tiled map format
interface TiledMap {
  width: number;
  height: number;
  tilesets: TileSet[];
  layers: Layer[];
}

interface TileSet {
  firstgid: number;
  name?: string;
  source?: string;
  columns?: number;
  tilecount?: number;
}

interface Layer {
  name: string;
  data: number[] | string;
  encoding?: string;
  compression?: string;
}

interface TileLocation {
  x: number;
  y: number;
}

interface TilesetInfo {
  tileset: string;
  firstgid: number;
  localId: number;
  tilesetX: number;
  tilesetY: number;
}

/**
 * Identifies the tileset a specific GID belongs to
 */
function identifyTileset(mapData: TiledMap, gid: number): TilesetInfo | null {
  if (!gid) {
    return null;
  }
  
  // Sort tilesets by firstgid (descending)
  const sortedTilesets = [...mapData.tilesets].sort((a, b) => b.firstgid - a.firstgid);
  
  // Find the tileset that the GID belongs to
  for (const tileset of sortedTilesets) {
    if (gid >= tileset.firstgid) {
      const localId = gid - tileset.firstgid;
      let tilesetName = tileset.name || '';
      
      if (!tilesetName && tileset.source) {
        tilesetName = tileset.source.replace('.tsx', '');
      }
      
      const columns = tileset.columns || 16;  // Default to 16 columns if not specified
      
      return {
        tileset: tilesetName,
        firstgid: tileset.firstgid,
        localId: localId,
        tilesetX: localId % columns,
        tilesetY: Math.floor(localId / columns)
      };
    }
  }
  
  return null;
}

/**
 * Decodes base64-encoded and potentially compressed layer data
 */
function decodeLayerData(layer: Layer): number[] {
  if (Array.isArray(layer.data)) {
    return layer.data;
  }
  
  if (typeof layer.data === 'string' && layer.encoding === 'base64') {
    const encodedData = layer.data;
    const buffer = Buffer.from(encodedData, 'base64');
    
    let decodedData: Buffer;
    if (layer.compression === 'zlib') {
      decodedData = zlib.inflateSync(buffer);
    } else {
      decodedData = buffer;
    }
    
    // Convert to array of GIDs (each GID is a 4-byte little-endian int)
    const tileData: number[] = [];
    for (let i = 0; i < decodedData.length; i += 4) {
      const gid = decodedData.readUInt32LE(i);
      tileData.push(gid);
    }
    
    return tileData;
  }
  
  throw new Error('Unsupported layer data format');
}

/**
 * Finds all tile locations based on tileset names
 * @param mapData - The Tiled map data
 * @param tilesetNames - Array of tileset names to find
 * @returns Array of tile locations
 */
export function findTileLocationsByTilesetNames(
  mapData: TiledMap, 
  tilesetNames: string[]
): TileLocation[] {
  const obstaclesLayer = mapData.layers.find(layer => layer.name === 'obstacles');
  
  if (!obstaclesLayer || !obstaclesLayer.data) {
    console.error("Obstacle layer not found or has no data!");
    return [];
  }
  
  // Decode the layer data if necessary
  const tileData = Array.isArray(obstaclesLayer.data) 
    ? obstaclesLayer.data 
    : decodeLayerData(obstaclesLayer);
  
  const locations: TileLocation[] = [];
  const mapWidth = mapData.width;
  
  // Create a set of GIDs that belong to the requested tilesets
  const targetGids = new Set<number>();
  
  // Find all GIDs that belong to the requested tilesets
  for (const gid of new Set(tileData)) {
    if (gid === 0) continue; // Skip empty tiles
    
    const tilesetInfo = identifyTileset(mapData, gid);
    if (tilesetInfo && tilesetNames.includes(tilesetInfo.tileset)) {
      targetGids.add(gid);
    }
  }
  
  // Find all locations of the target GIDs
  for (let i = 0; i < tileData.length; i++) {
    const tileGid = tileData[i];
    if (targetGids.has(tileGid)) {
      // Convert 1D index to 2D coordinates
      const x = i % mapWidth;
      const y = Math.floor(i / mapWidth);
      locations.push({ x, y });
    }
  }
  
  return locations;
}

/**
 * Main function that loads a map and finds tiles by tileset names
 */
export function findTilesByTilesetNames(
  filePath: string, 
  tilesetNames: string[]
): TileLocation[] {
  try {
    // Load the map
    const mapData: TiledMap = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
    
    console.log(`Loaded map: ${filePath}`);
    console.log(`Map size: ${mapData.width}x${mapData.height}`);
    
    // Show information about tilesets
    console.log("\nTilesets:");
    for (const tileset of mapData.tilesets) {
      let name = tileset.name || '';
      if (!name && tileset.source) {
        name = tileset.source.replace('.tsx', '');
      }
      
      const firstGid = tileset.firstgid;
      const tileCount = tileset.tilecount || TILES_NUM; 
      const lastGid = firstGid + tileCount - 1;
      
      console.log(`- ${name}: GID from ${firstGid} to ${lastGid}`);
    }
    
    // Find all tile locations based on tileset names
    const locations = findTileLocationsByTilesetNames(mapData, tilesetNames);
    
    console.log(`\nFound ${locations.length} tiles from tilesets: ${tilesetNames.join(', ')}`);
    
    if (locations.length > 0) {
      console.log("First 5 locations:");
      locations.slice(0, 5).forEach((loc, i) => {
        console.log(`  ${i+1}. X=${loc.x}, Y=${loc.y}`);
      });
    }
    
    return locations;
    
  } catch (error) {
    console.error("Error:", error);
    return [];
  }
}

export function findTilesInMap(
  mapFilePath: string,
  tilesetNames: string[]
): TileLocation[] {
  return findTilesByTilesetNames(mapFilePath, tilesetNames);
}