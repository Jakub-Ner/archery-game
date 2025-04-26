import { useEffect, useState } from "react";

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
    fetch(`http://localhost:8080/statistics/${userId}`)
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Failed to fetch statistics", err);
        setLoading(false);
      });
  }, [userId]);

  return { data, loading };
}
