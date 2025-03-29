import { Champion } from "@/logic/champion"
import { PLAYER_HEIGHT, PLAYER_WIDTH } from "@/consts"


export function ChampionComponent({
  champion,
}: {
  champion: Champion
}) {
  return (
    <div
      style={{
        position: "absolute",
        left: champion.coords.x,
        top: champion.coords.y,
        width: PLAYER_WIDTH,
        height: PLAYER_HEIGHT,
        backgroundColor: "red", // skin should fill the whole background
      }}
    >
      <img src={champion.skinPath} alt="player" />
    </div>
  )
}
