import { KeyboardManager } from "@/logic/keyboardManager";
import { Champion, HP } from "@/logic/champion";
import { useEffect, useState } from "react";
import { PLAYER_COORDS, INITIAL_PLAYER_HP, PLAYER_IMAGE_COORDS } from "@/consts";
import { WSClient } from "@/utils/WSClient";
import {ChampionComponent} from "@/components/ui/champion.tsx";
import {useUserData} from "@/hooks/useUserData.ts";
import defaultSkin from "../../public/assets/skins/pretty-woman.png"

export default function Gameplay() {
    const userId = localStorage.getItem("userId") || "";
    const { user } = useUserData(Number(userId));

    const [player, setPlayer] = useState<Champion | null>(null);
    const [playerState, setPlayerState] = useState<Champion | null>(null);

    useEffect(() => {
        if (user) {
            const newPlayer = new Champion(
                userId,
                user.nickname || "default_nickname",
                user.selectedSkin?.imageUrl || defaultSkin,
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
        setPlayerState({ ...player });
    };

    useEffect(() => {
        if (!player) return;

        WSClient.get().onConnect(() => {
            player.connect(setPlayerState);
        });

        WSClient.get().activate();
        const keysManager = new KeyboardManager(
            () => stateUpdater(player.goRight.bind(player)),
            () => stateUpdater(player.goLeft.bind(player)),
            () => stateUpdater(player.goUp.bind(player)),
            () => stateUpdater(player.goDown.bind(player)),
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
            <ChampionComponent champion={playerState} />
        </div>
    );
}


//
// export default function Gameplay() {
//     const userId = localStorage.getItem("userId") || "";
//
//     const { user } = useUserData(Number(userId));
//
//     console.log(userId);
//     console.log(user?.nickname);
//     console.log(user?.selectedSkin?.imageUrl);
//     console.log(user);
//
//     let player;
//     useEffect(() => {
//         if (user?.selectedSkin?.imageUrl) {
//             player = new Champion(
//                 userId,
//                 user?.nickname || "default_nickname",
//                 user?.selectedSkin?.imageUrl,
//                 new HP(INITIAL_PLAYER_HP),
//                 PLAYER_COORDS,
//                 PLAYER_IMAGE_COORDS,
//             );
//         }
//     }, [user]);
//     const [playerState, setPlayerState] = useState(player)
//
//     const stateUpdater = (playerMovement: () => void) => {
//         playerMovement()
//         setPlayerState({ ...playerState })
//     }
//
//
//     useEffect(() => {
//         WSClient.get().onConnect(() => {
//             player.connect(setPlayerState);
//         });
//
//         WSClient.get().activate()
//         const keysManager = new KeyboardManager(
//             () => stateUpdater(player.goRight.bind(player)),
//             () => stateUpdater(player.goLeft.bind(player)),
//             () => stateUpdater(player.goUp.bind(player)),
//             () => stateUpdater(player.goDown.bind(player)),
//         )
//         keysManager.startListening()
//         return () => {
//             keysManager.stopListening();
//             WSClient.get().stop()
//         }
//         // eslint-disable-next-line react-hooks/exhaustive-deps
//     }, []);
//
//     return (
//         <div>
//             <h1>Gameplay view</h1 >
//             <ChampionComponent champion={playerState} />
//         </div>
//     )
// }