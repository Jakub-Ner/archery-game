import { Direction } from "./champion";

export class Arrow {

  public static skinPath: string = "/assets/arrows/base-arrow.png";

  constructor(
    private readonly sessionId: string,
    private readonly damage: number,
    private readonly direction: Direction,
    public readonly imageCoordX: number,
    public imageCoordY: number,
    private timeToLive: number,
    public x: number,
    public y: number,
  ) { }

}
