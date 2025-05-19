import { Arrow } from "@/logic/arrow";
import { PLAYER_HEIGHT, PLAYER_WIDTH } from "@/consts"

const FRAME_WIDTH = 32;
const FRAME_HEIGHT = FRAME_WIDTH;

export function ArrowComponent({
    arrow,
}: {
    arrow: Arrow;
}) {
    const spriteX = arrow.imageCoordX;
    const spriteY = arrow.imageCoordY;
    return (
        <div
            style={{
                position: "absolute",
                left: arrow.x,
                top: arrow.y,
                width: PLAYER_WIDTH,
                height: PLAYER_HEIGHT,
                transform: `scale(${PLAYER_WIDTH / FRAME_WIDTH}, ${PLAYER_HEIGHT / FRAME_HEIGHT})`,
            }}
            className="pointer-events-none flex flex-col items-center"
        >
            
            <div
                style={{
                    width: PLAYER_WIDTH,
                    height: PLAYER_HEIGHT,
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    transformOrigin: "center",
                }}
            >
                <img
                    src={Arrow.skinPath}
                    alt="player"
                    style={{
                        width: FRAME_WIDTH,
                        height: FRAME_HEIGHT,
                        objectFit: "none",
                        objectPosition: `-${spriteX * FRAME_WIDTH}px -${spriteY * FRAME_HEIGHT}px`,
                    }}
                />
            </div>
        </div>
    );
}
