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

// GENERAL
export const MOVEMENT_STEP = 10; // px

// PLAYER
export const PLAYER_WIDTH = 40;
export const PLAYER_HEIGHT = 40;
export const INITIAL_PLAYER_HP = 100;
export const PLAYER_COORDS = { x: 100, y: 300 };
export const PLAYER_IMAGE_COORDS = { x: 0, y: 2 };
