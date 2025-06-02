import { useEffect, useState, useCallback } from "react";
import { PLAYER_SERVICE_URL } from "@/consts.ts";

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

    const fetchData = useCallback(async () => {
        if (!userId) {
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const res = await fetch(`${PLAYER_SERVICE_URL}/statistics/${userId}`);
            if (res.status === 404) {
                console.warn("No statistics found for user.");
                setData(null);
            } else if (!res.ok) {
                throw new Error(`Error fetching statistics: ${res.statusText}`);
            } else {
                const json = await res.json();
                setData(json);
            }
        } catch (err) {
            console.error("Failed to fetch statistics", err);
        } finally {
            setLoading(false);
        }
    }, [userId]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);

    return { data, loading, refetch: fetchData };
}
