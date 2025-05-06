
// API
export const HTTP_PROTOCOL = 'http://';
export const WS_PROTOCOL = 'ws://';

export const WS_URL = 'localhost:8081/gameplay';

export const WS_SUB_PLAYER_POSITION_ROUTE = '/topic/player/position'

export const WS_PUBLISH_DIRECTION_ROUTE = '/app/player/direction'

export const WS_PUBLISH_POSITION_INITIALIZE = '/player/position/initialize'

// GENERAL
export const MOVEMENT_STEP = 10; // px

// PLAYER
export const PLAYER_WIDTH = 80;
export const PLAYER_HEIGHT = 80;
export const INITIAL_PLAYER_HP = 100;
export const PLAYER_COORDS = { x: 100, y: 300 };
export const PLAYER_IMAGE_COORDS = { x: 0, y: 2 };
