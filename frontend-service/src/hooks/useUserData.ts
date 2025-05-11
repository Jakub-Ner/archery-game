import { useEffect, useState } from "react";
import { PLAYER_SERVICE_URL } from "@/consts";

type Skin = {
  id: number;
  name: string;
  imageUrl: string;
  price: number;
};

type UserData = {
  nickname: string;
  gems: number;
  selectedSkin: Skin | null;
  ownedSkins: Skin[];
  unownedSkins: Skin[];
};

export function useUserData(userId: number | null) {
  const [user, setUser] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) return;

    async function fetchData() {
      try {
        const [userRes, selectedRes, ownedRes, unownedRes] = await Promise.all([
          fetch(`${PLAYER_SERVICE_URL}/users/${userId}`),
          fetch(`${PLAYER_SERVICE_URL}/skins/selected/${userId}`),
          fetch(`${PLAYER_SERVICE_URL}/skins/owned/${userId}`),
          fetch(`${PLAYER_SERVICE_URL}/skins/unowned/${userId}`),
        ]);

        if (!userRes.ok || !selectedRes.ok || !ownedRes.ok || !unownedRes.ok) {
          throw new Error("One or more requests failed");
        }

        const userJson = await userRes.json();
        const selectedSkin = await selectedRes.json();
        const ownedSkins = await ownedRes.json();
        const unownedSkins = await unownedRes.json();

        setUser({
          nickname: userJson.nickname,
          gems: userJson.gems,
          selectedSkin,
          ownedSkins,
          unownedSkins,
        });
      } catch (err) {
        console.error("Failed to fetch user data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, [userId]);

  return { user, loading };
}


// import { useEffect, useState } from "react";
// import { PLAYER_SERVICE_URL } from "@/consts";
//
// export function useUserData(userId: number | null) {
//   const [user, setUser] = useState<{ c: string; gems: number } | null>(null);
//   const [loading, setLoading] = useState(true);
//
//   useEffect(() => {
//     if (!userId) return;
//
//     fetch(`${PLAYER_SERVICE_URL}/users/${userId}`)
//       .then((res) => res.json())
//       .then((json) => {
//         setUser(json);
//         setLoading(false);
//       })
//       .catch((err) => {
//         console.error("Failed to fetch user", err);
//         setLoading(false);
//       });
//   }, [userId]);
//
//   return { user, loading };
// }