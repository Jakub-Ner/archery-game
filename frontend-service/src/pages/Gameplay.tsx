import { KeyboardManager } from "@/logic/keyboardManager";
import { Champion, HP } from "@/logic/champion";
import { useEffect, useState } from "react";
import { PLAYER_COORDS, INITIAL_PLAYER_HP, PLAYER_IMAGE_COORDS, WS_SUB_PLAYER_POSITION_ROUTE } from "@/consts";
import { WSClient } from "@/utils/WSClient";
import { ChampionComponent } from "@/components/ui/champion.tsx";
import { useUserData } from "@/hooks/useUserData.ts";

export default function Gameplay() {
  const userId = localStorage.getItem("userId") || "1"; // default to 1 just for testing
  const { user } = useUserData(Number(userId));

  const [player, setPlayer] = useState<Champion | null>(null);
  const [playerState, setPlayerState] = useState<Champion | null>(null);
  const [champions, setChampions] = useState<Champion[]>([]);

  useEffect(() => {
    if (user) {
      const newPlayer = new Champion(
        userId,
        user.nickname || "default_nickname",
        user.selectedSkin?.imageUrl || "/assets/skins/pretty-woman.png",
        new HP(INITIAL_PLAYER_HP),
        PLAYER_COORDS,
        PLAYER_IMAGE_COORDS,
      );
      setPlayer(newPlayer);
      setPlayerState({ ...newPlayer });
    }
  }, [user]);

  const stateUpdater = (playerMovement: () => void) => {
    if (!player) return;
    playerMovement();
  };

  useEffect(() => {
    if (!player) return;

    WSClient.get().onConnect(() => {
      player.connect();

      WSClient.get().subscribe(WS_SUB_PLAYER_POSITION_ROUTE, (message) => {
        const data = JSON.parse(message.body);

        // console.log("Received message: ", data);
        const newPlayer = player.findYourself(data.players);

        if (newPlayer.lvl !== player.lvl) {
          console.log("Level up!");
        }
        setChampions(data.players);
        setPlayerState({ ...newPlayer });
      });
    });

    WSClient.get().activate();
    const keysManager = new KeyboardManager(
      () => stateUpdater(player.goRight.bind(player)),
      () => stateUpdater(player.goLeft.bind(player)),
      () => stateUpdater(player.goUp.bind(player)),
      () => stateUpdater(player.goDown.bind(player)),
      // () => onOptionQ(),
      // () => onOptionW(),
      // () => onOptionE(),
    );
    keysManager.startListening();

    return () => {
      keysManager.stopListening();
      WSClient.get().stop();
    };
  }, [player]);

  if (!playerState) return <div>Loading player...</div>;

  return (
    <div>
      <h1>Gameplay view</h1>
      {champions.map((playerState, index) => (
        <ChampionComponent key={index} champion={playerState} />
      ))}


    </div>
  );
}
