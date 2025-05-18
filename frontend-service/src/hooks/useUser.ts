import { useEffect, useState } from "react";
import { PLAYER_SERVICE_URL } from "@/consts.ts";

export type UserData = {
  id: number;
  nickname: string;
  email: string;
  role: string;
  gems: number;
};

export function useUser(userId: number) {
  const [data, setData] = useState<UserData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`${PLAYER_SERVICE_URL}/users/${userId}`)
      .then(async (res) => {
        if (!res.ok) throw new Error("Failed to fetch user data");
        const json = await res.json();
        setData(json);
      })
      .catch((err) => {
        console.error("Error loading user:", err);
        setData(null);
      })
      .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading };
}
