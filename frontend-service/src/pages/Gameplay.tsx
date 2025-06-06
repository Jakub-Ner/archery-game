import { KeyboardManager } from "@/logic/keyboardManager";
import { Arrow } from "@/logic/arrow";
import { Champion, HP } from "@/logic/champion";
import { useEffect, useState } from "react";
import {
  PLAYER_COORDS,
  INITIAL_PLAYER_HP,
  PLAYER_IMAGE_COORDS,
  WS_SUB_PLAYER_POSITION_ROUTE,
} from "@/consts";
import { WSClient } from "@/utils/WSClient";
import { ChampionComponent } from "@/components/ui/champion.tsx";
import { useUserData } from "@/hooks/useUserData.ts";
import PopupActionMenu from "@/components/ui/popup.tsx";
import ExitButton from "@/components/ui/exitButton";
import { ArrowComponent } from "@/components/ui/arrow";


export default function Gameplay() {
  const userId = localStorage.getItem("userId") || "1";
  const { user } = useUserData(Number(userId));

  const [player, setPlayer] = useState<Champion | null>(null);
  const [playerState, setPlayerState] = useState<Champion | null>(null);
  const [champions, setChampions] = useState<Champion[]>([]);
  const [arrows, setArrows] = useState<Arrow[]>([]);
  const [showPopup, setShowPopup] = useState(false);

  const onOptionQ = () => {
    console.log("Q pressed → Attack");
    setShowPopup(false);
  };
  const onOptionW = () => {
    console.log("W pressed → Defend");
    setShowPopup(false);
  };
  const onOptionE = () => {
    console.log("E pressed → Run");
    setShowPopup(false);
  };

  useEffect(() => {
    document.title = "Gameplay";
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "auto";
    };
  }, []);

  useEffect(() => {
    if (user) {
      const newPlayer = new Champion(
          userId,
          user.nickname || "default_nickname",
          user.selectedSkin?.imageUrl || "/assets/skins/pretty-woman.png",
          new HP(INITIAL_PLAYER_HP),
          PLAYER_COORDS,
          PLAYER_IMAGE_COORDS
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

        console.log("Received message: ", data);
        const newPlayer = player.findYourself(data.players);

        if (newPlayer.lvl !== player.lvl) {
          console.log("Level up!");
          // setShowPopup(true)
        }
        setChampions(data.players);
        setPlayerState({ ...newPlayer });
        setArrows(data.arrows);
      });
    });

    WSClient.get().activate();
    const keysManager = new KeyboardManager(
        () => stateUpdater(player.goRight.bind(player)),
        () => stateUpdater(player.goLeft.bind(player)),
        () => stateUpdater(player.goUp.bind(player)),
        () => stateUpdater(player.goDown.bind(player)),
        () => stateUpdater(player.shoot.bind(player)),
        () => onOptionQ(),
        () => onOptionW(),
        () => onOptionE()
    );
    keysManager.startListening();

    return () => {
      keysManager.stopListening();
      WSClient.get().stop();
    };
  }, [player]);

  if (!playerState) return <div>Loading player...</div>;

  return (
      <div
          style={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            width: "100vw",
            height: "100vh",
            backgroundColor: "#000",
          }}
      >
        <div
            style={{
              backgroundImage: 'url("/map.png")',
              backgroundSize: "100% 100%",
              backgroundRepeat: "no-repeat",
              position: "relative",
              width: "960px",
              height: "640px",
            }}
        >
          <ExitButton />
          {showPopup && (
              <PopupActionMenu
                  onAttack={onOptionQ}
                  onDefend={onOptionW}
                  onRun={onOptionE}
              />
          )}
          {champions.map((playerState, index) => (
              <ChampionComponent key={index} champion={playerState} />
          ))}
          {arrows.map((arrow, index) => (
              <ArrowComponent key={index} arrow={arrow} />
          ))}
        </div>
      </div>
  );
}
