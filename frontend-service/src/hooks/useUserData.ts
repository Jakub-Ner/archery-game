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

export function useUserData(userId: number | null, refreshKey?: number) {
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

        const parseSafe = async (res: Response) => {
          const text = await res.text();
          return text ? JSON.parse(text) : null;
        };

        if (!userRes.ok) throw new Error("User fetch failed");

        const userJson = await parseSafe(userRes);
        const selectedSkin = selectedRes.ok ? await parseSafe(selectedRes) : null;
        const ownedSkins = ownedRes.ok ? await parseSafe(ownedRes) : [];
        const unownedSkins = unownedRes.ok ? await parseSafe(unownedRes) : [];

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
  }, [userId, refreshKey]);

  return { user, loading };
}
