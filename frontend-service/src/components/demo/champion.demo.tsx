import { KeyboardManager } from "@/logic/keyboardManager";
import { ChampionComponent } from "../ui/champion";
import { Champion, HP } from "@/logic/champion";
import { useEffect, useState } from "react";
import { PLAYER_COORDS, INITIAL_PLAYER_HP  } from "@/consts";

export default function ChampionDemo() {
  const player = new Champion(
    "Garen",
    "https://img.favpng.com/25/19/23/pixel-art-fan-art-png-favpng-4kSGLds3bXkK46gQJXPt5xGGh.jpg",
    new HP(INITIAL_PLAYER_HP),
    PLAYER_COORDS,
  );

  const [playerState, setPlayerState] = useState(player)

  const stateUpdater = (playerMovement: () => void) => {
    playerMovement()
    setPlayerState({...playerState})
  }

  useEffect(() => {
    const keysManager = new KeyboardManager(
      () => stateUpdater(player.goRight.bind(player)),
      () => stateUpdater(player.goLeft.bind(player)),
      () => stateUpdater(player.goUp.bind(player)),
      () => stateUpdater(player.goDown.bind(player)),
    )
    keysManager.startListening()
    return () => keysManager.stopListening();
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div>
      <h1>Player Demo</h1 >
      <ChampionComponent champion={playerState} />
    </div>
  )
}



