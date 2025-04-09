import { MOVEMENT_STEP, WS_PUBLISH_DIRECTION_ROUTE, WS_SUB_PLAYER_POSITION_ROUTE } from "@/consts";
import { Coords } from "./common";
import { WSClient } from "@/utils/WSClient";


export class HP {
  constructor(
    public full: number,
  ) { }
  current: number = this.full;
}

export enum Direction {
  UP = 'UP',
  DOWN = 'DOWN',
  LEFT = 'LEFT',
  RIGHT = 'RIGHT',
  NONE = 'NONE',
}

export class Champion {
  constructor(
    public name: string,
    public skinPath: string,
    public hp: HP,
    public coords: Coords,
  ) { 
      WSClient.get().subscribe(WS_SUB_PLAYER_POSITION_ROUTE, (message) => {
        const data = JSON.parse(message.body);
        console.log('Received message from server', data);
        this.coords.x = data.x;
        this.coords.y = data.y;
        this.hp.current = data.hp;
      });

  }
  lvl: number = 1;
  currentDirection: Direction = Direction.NONE;

  private notifyAboutDirectionChange = () => {
    const wsClient = WSClient.get();
    console.log('Sending direction change to server', this.currentDirection);
    wsClient.send(WS_PUBLISH_DIRECTION_ROUTE, ({
      newDirection: this.currentDirection,
    }));
  }

  public goRight = () => {
    if (this.currentDirection !== Direction.RIGHT) {
      this.currentDirection = Direction.RIGHT;
      console.log('Direction changed to right');
      this.notifyAboutDirectionChange();
    }
    this.coords.x += MOVEMENT_STEP;
  }

  public goLeft = () => {
    if (this.currentDirection !== Direction.LEFT) {
      this.currentDirection = Direction.LEFT;
      this.notifyAboutDirectionChange();
    }
    this.coords.x -= MOVEMENT_STEP;
  }

  public goUp = () => {
    if (this.currentDirection !== Direction.UP) {
      this.currentDirection = Direction.UP;
      this.notifyAboutDirectionChange();
    }
    this.coords.y -= MOVEMENT_STEP;
  }

  public goDown = () => {
    if (this.currentDirection !== Direction.DOWN) {
      this.currentDirection = Direction.DOWN;
      this.notifyAboutDirectionChange();
    }
    this.coords.y += MOVEMENT_STEP;
  }

}
