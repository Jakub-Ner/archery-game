import { WS_PUBLISH_DIRECTION_ROUTE, WS_PUBLISH_POSITION_INITIALIZE, WS_PUBLISH_SHOOT_ROUTE } from "@/consts";
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
    public championId: string,
    public name: string,
    public skinPath: string,
    public hp: HP,
    public coords: Coords,
    public imageCoords: Coords,
  ) { }
  lvl: number = 1;
  experience: number = 0;
  currentDirection: Direction = Direction.NONE;

  public findYourself = (players: Champion[]) => {
    return players.find((player) => player.championId === this.championId) as Champion;
  }
  public connect() {
    WSClient.get().send(WS_PUBLISH_POSITION_INITIALIZE, {
      name: this.name,
      championId: this.championId,
      skinPath: this.skinPath,
    });

  }

  private notifyAboutDirectionChange = () => {
    console.log('Sending direction change to server', this.currentDirection);
    WSClient.get().send(WS_PUBLISH_DIRECTION_ROUTE, ({
      newDirection: this.currentDirection,
    }));
  }

  public shoot = () => {
    WSClient.get().send(WS_PUBLISH_SHOOT_ROUTE, {});

  }

  public goRight = () => {
    if (this.currentDirection !== Direction.RIGHT) {
      this.currentDirection = Direction.RIGHT;
      this.notifyAboutDirectionChange();
    }
  }

  public goLeft = () => {
    if (this.currentDirection !== Direction.LEFT) {
      this.currentDirection = Direction.LEFT;
      this.notifyAboutDirectionChange();
    }
  }

  public goUp = () => {
    if (this.currentDirection !== Direction.UP) {
      this.currentDirection = Direction.UP;
      this.notifyAboutDirectionChange();
    }
  }

  public goDown = () => {
    if (this.currentDirection !== Direction.DOWN) {
      this.currentDirection = Direction.DOWN;
      this.notifyAboutDirectionChange();
    }
  }

}
