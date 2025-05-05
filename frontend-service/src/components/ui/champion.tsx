import { Champion } from "@/logic/champion"
import { PLAYER_HEIGHT, PLAYER_WIDTH } from "@/consts"


const FRAME_WIDTH = 32;
const FRAME_HEIGHT = FRAME_WIDTH;

export function ChampionComponent({
    champion,
}: {
    champion: Champion;
}) {
    const { x: spriteX, y: spriteY } = champion.imageCoords;
    const { skinPath } = champion;
    return (
        <div
            style={{
                position: "absolute",
                left: champion.coords.x,
                top: champion.coords.y,
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                transform: `scale(${PLAYER_WIDTH / FRAME_WIDTH}, ${PLAYER_HEIGHT / FRAME_HEIGHT})`,
            }}
            className="pointer-events-none"
        >
            <img
                src={skinPath}
                alt="player"
                style={{
                    width: FRAME_WIDTH, 
                    height: FRAME_HEIGHT, 
                    objectFit: "none",
                    maxWidth: "100%",
                    maxHeight: "100%",
                    objectPosition: `-${spriteX * FRAME_WIDTH}px -${spriteY * FRAME_HEIGHT}px`,
                }}
            />
        </div>
    );
}
