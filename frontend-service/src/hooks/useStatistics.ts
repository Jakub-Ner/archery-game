import { useEffect, useState } from "react";
import {PLAYER_SERVICE_URL} from "@/consts.ts";

type StatisticsData = {
  gamesPlayed: number;
  averageScore: number;
  killsPerDeath: number;
  totalTimePlayed: number;
  bestScore: number;
  accountCreatedAt: string;
  userId: number;
};

export function useStatistics(userId: number) {
  const [data, setData] = useState<StatisticsData | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!userId) {
      setLoading(false);
      return;
    }

    fetch(`${PLAYER_SERVICE_URL}/statistics/${userId}`)
        .then(async (res) => {
          if (res.status === 404) {
            // Statystyki nie istnieją
            console.warn("No statistics found for user.");
            setData(null);
          } else if (!res.ok) {
            throw new Error(`Error fetching statistics: ${res.statusText}`);
          } else {
            const json = await res.json();
            setData(json);
          }
        })
      .catch((err) => {
        console.error("Failed to fetch statistics", err);
        setLoading(false);
      })
        .finally(() => setLoading(false));
  }, [userId]);

  return { data, loading };
}
