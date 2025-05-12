// SERVICE
export const SERVER_IP = window.location.hostname;

export const PLAYER_SERVICE_URL = `http://${SERVER_IP}:8080`;
export const AUTH_SERVICE_URL = `http://${SERVER_IP}:8000`;

// API
export const HTTP_PROTOCOL = 'http://';
export const WS_PROTOCOL = 'ws://';

export const WS_URL = `${SERVER_IP}:8081/gameplay`;

export const WS_SUB_PLAYER_POSITION_ROUTE = '/topic/player/position'

export const WS_PUBLISH_DIRECTION_ROUTE = '/app/player/direction'

export const WS_PUBLISH_POSITION_INITIALIZE = '/app/player/position/initialize'

export const MAPS_LOCATION = 'src/assets/maps/';



// GENERAL
export const MOVEMENT_STEP = 10; // px

// PLAYER
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 40;
export const INITIAL_PLAYER_HP = 100;
export const PLAYER_COORDS = { x: 100, y: 300 };
export const PLAYER_IMAGE_COORDS = { x: 0, y: 2 };
export const TILE_WIDTH = 32; //px
export const TILE_HEIGHT = 32; //px
export const TILES_NUM_WIDTH = 64; // tiles
export const TILES_NUM_HEIGHT = 64; // tiles
export const TILES_NUM = TILES_NUM_HEIGHT === TILES_NUM_WIDTH ? TILES_NUM_WIDTH : Math.max(TILES_NUM_HEIGHT, TILES_NUM_WIDTH); // tiles
export const MAP_WIDTH = TILES_NUM_WIDTH * TILE_WIDTH; // px
export const MAP_HEIGHT = TILES_NUM_HEIGHT * TILE_HEIGHT; // px




