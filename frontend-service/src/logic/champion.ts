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
    public championId: string,
    public name: string,
    public skinPath: string,
    public hp: HP,
    public coords: Coords,
    public imageCoords: Coords,
  ) {}
  lvl: number = 1;
  experience: number = 0;
  currentDirection: Direction = Direction.NONE;

  private findYourself = (players: Champion[]) => {
    return players.find((player) => player.championId === this.championId) as Champion;
  }
  public connect(setter: (champion: Champion) => void) {
    WSClient.get().send(WS_PUBLISH_POSITION_INITIALIZE, {
      name: this.name,
      championId: this.championId,
      skinPath: this.skinPath,
    });

    WSClient.get().subscribe(WS_SUB_PLAYER_POSITION_ROUTE, (message) => {
      const data = JSON.parse(message.body);

  console.log("Received message: ", data);
  const player = this.findYourself(data.players);
    this.name = player.name;
      this.hp = player.hp;
      this.coords = player.coords;
      this.imageCoords = player.imageCoords
      this.lvl = player.lvl;
      this.experience = player.experience;
      this.currentDirection = player.currentDirection;
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
