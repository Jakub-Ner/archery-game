import { MOVEMENT_STEP } from "@/consts";
import { Coords } from "./common";


export class HP {
  constructor(
    public full: number,
  ) { }
  current: number = this.full;
}

export class Champion {
  constructor(
    public name: string,
    public skinPath: string,
    public hp: HP,
    public coords: Coords,
  ) { }
  lvl: number = 1;

  public goRight = () => {
    this.coords.x += MOVEMENT_STEP;
  }

  public goLeft = () => {
    this.coords.x -= MOVEMENT_STEP;
  }

  public goUp = () => {
    this.coords.y -= MOVEMENT_STEP;
  }

  public goDown = () => {
    this.coords.y += MOVEMENT_STEP;
  }

}
