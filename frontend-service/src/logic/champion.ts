import { /*MOVEMENT_STEP,*/ WS_PUBLISH_DIRECTION_ROUTE, WS_SUB_PLAYER_POSITION_ROUTE, WS_PUBLISH_POSITION_INITIALIZE } from "@/consts";
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
    public playerId: string,
    public name: string,
    public skinPath: string,
    public hp: HP,
    public coords: Coords,
    public imageCoords: Coords,
  ) {}
  lvl: number = 1;
  currentDirection: Direction = Direction.NONE;

  public connect(setter: (champion: Champion) => void) {

    WSClient.get().send(WS_PUBLISH_POSITION_INITIALIZE, {
      playerId: this.playerId,
    });

    WSClient.get().subscribe(WS_SUB_PLAYER_POSITION_ROUTE, (message) => {
      const data = JSON.parse(message.body);

      console.log('Received message from server', data);
      this.coords.x = data.x;
      this.coords.y = data.y;
      this.hp.current = data.hp;
      this.imageCoords.x = (this.imageCoords.x++) % 4
      setter({...this})
    });

  }

  private notifyAboutDirectionChange = () => {
    console.log('Sending direction change to server', this.currentDirection);
    WSClient.get().send(WS_PUBLISH_DIRECTION_ROUTE, ({
      newDirection: this.currentDirection,
    }));
  }

  public goRight = () => {
    if (this.currentDirection !== Direction.RIGHT) {
      this.currentDirection = Direction.RIGHT;
      this.imageCoords.y = 2;
      console.log('Direction changed to right');
      this.notifyAboutDirectionChange();
    }
  }

  public goLeft = () => {
    if (this.currentDirection !== Direction.LEFT) {
      this.imageCoords.y = 1;
      this.currentDirection = Direction.LEFT;
      this.notifyAboutDirectionChange();
    }
  }

  public goUp = () => {
    if (this.currentDirection !== Direction.UP) {
      this.imageCoords.y = 3;
      this.currentDirection = Direction.UP;
      this.notifyAboutDirectionChange();
    }
  }

  public goDown = () => {
    if (this.currentDirection !== Direction.DOWN) {
      this.imageCoords.y = 0;
      this.currentDirection = Direction.DOWN;
      this.notifyAboutDirectionChange();
    }
  }

}
