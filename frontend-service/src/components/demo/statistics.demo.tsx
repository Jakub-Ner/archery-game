import {Statistics} from "../ui/statistics";
import {useStatistics} from "../../hooks/useStatistics";
import {useEffect, useState} from "react";

export default function StatisticsDemo({refreshKey}: { refreshKey: number }) {

    const userId = Number(localStorage.getItem("userId"));
    const [shouldRefetch, setShouldRefetch] = useState(0);

    const {data, loading, refetch} = useStatistics(userId);

    useEffect(() => {
        refetch?.();
        setShouldRefetch(prev => prev + 1);
    }, [refreshKey]);

    console.log(data);
    console.log(userId);

    if (loading) return <div>Loading...</div>;
    if (!data) return <div>No statistics found</div>;

    const {gamesPlayed, averageScore, killsPerDeath, bestScore, totalTimePlayed} = data;

    const formatTime = (seconds: number): string => {
        const h = Math.floor(seconds / 3600);
        const m = Math.floor(seconds / 60);
        const s = Math.floor(seconds % 60);
        return `${h}h ${m}m ${s}s`;
    };

    return (
        <Statistics
            gamesPlayed={gamesPlayed}
            averageScore={averageScore}
            killsPerDeath={killsPerDeath}
            bestScore={bestScore}
            totalTimePlayed={formatTime(totalTimePlayed)}
        />
    );
}
