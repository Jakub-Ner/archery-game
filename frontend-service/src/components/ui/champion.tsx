import { Champion } from "@/logic/champion"
import { PLAYER_HEIGHT, PLAYER_WIDTH } from "@/consts"


const FRAME_WIDTH = 32;
const FRAME_HEIGHT = 48;

export function ChampionComponent({
                                      champion,
                                  }: {
    champion: Champion;
}) {
    const { x: spriteX, y: spriteY } = champion.imageCoords;

    return (
        <div
            style={{
                position: "absolute",
                left: champion.coords.x,
                top: champion.coords.y,
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                overflow: "hidden",
            }}
            className="pointer-events-none"
        >
            <img
                // src="src/assets/skins/skins1.png"
                src="../../assets/skins/skins1.png"
                alt="player"
                style={{
                    width: 128, // szerokość całego sprite sheeta
                    height: 192, // wysokość całego sprite sheeta
                    objectFit: "none",
                    objectPosition: `-${spriteX * FRAME_WIDTH}px -${spriteY * FRAME_HEIGHT}px`,
                }}
            />
        </div>
    );
}
