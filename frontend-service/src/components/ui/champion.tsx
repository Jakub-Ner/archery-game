import { Champion } from "@/logic/champion"
import { PLAYER_HEIGHT, PLAYER_WIDTH } from "@/consts"
import Bar from "../ui/bar";

const FRAME_WIDTH = 32;
const FRAME_HEIGHT = FRAME_WIDTH;
const BAR_WIDTH = 32; 
const BAR_HEIGHT = 4; 
const BAR_SPACING = 0.25; 
const LABEL_SIZE = 4; 

export function ChampionComponent({
    champion,
}: {
    champion: Champion;
}) {
    const { x: spriteX, y: spriteY } = champion.imageCoords;
    const { skinPath } = champion;
    const maxExperience = champion.lvl * 5;

    const computeXpBarColor = (percentage: number) => {
  if (percentage <= 20) {
    return "bg-blue-300";
  } else if (percentage <= 40) {
    return "bg-blue-400";
  } else if (percentage <= 60) {
    return "bg-blue-500";
  } else if (percentage <= 80) {
    return "bg-blue-600";
  } else {
    return "bg-blue-700";
  }
};

const computeHpBarColor = (percentage: number) => {
  if (percentage <= 20) {
    return "bg-red-600"; 
  } else if (percentage <= 40) {
    return "bg-orange-500"; 
  } else if (percentage <= 60) {
    return "bg-yellow-500"; 
  } else if (percentage <= 80) {
    return "bg-lime-500"; 
  } else {
    return "bg-green-600"; 
  }
};
    
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
            className="pointer-events-none flex flex-col items-center"
        >
            <div 
                style={{
                    position: "absolute",
                    top: -((BAR_HEIGHT + BAR_SPACING) + 2),
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: `${BAR_SPACING}px`,
                }}
            >
                <div className="w-full flex justify-center">
                    <Bar 
                        currentValue={Math.min(champion.hp.current || 0, champion.hp.full)}
                        maxValue={champion.hp.full} 
                        computeBarColor={computeHpBarColor}
                        label="HP" 
                        labelColor="bg-red-600"
                        barWidth={BAR_WIDTH}
                        barHeight={BAR_HEIGHT}
                        labelSize={LABEL_SIZE}
                    />
                </div>
                
                <div className="w-full flex justify-center">
                    <Bar 
                        currentValue={Math.min(champion.experience || 0, maxExperience)}
                        maxValue={maxExperience} 
                        label="XP" 
                        labelColor="bg-blue-600"
                        computeBarColor={computeXpBarColor}
                        barWidth={BAR_WIDTH}
                        barHeight={BAR_HEIGHT}
                        labelSize={LABEL_SIZE}
                    />
                </div>
            </div>
            
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
                    src={skinPath}
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