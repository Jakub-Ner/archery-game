import { Statistics } from "../ui/statistics";
import { useStatistics } from "../../hooks/useStatistics";

export default function StatisticsDemo() {
  const { data, loading } = useStatistics(2); // <--- userId = 1

  if (loading) return <div>Loading...</div>;
  if (!data) return <div>No statistics found</div>;

  const { gamesPlayed, averageScore, killsPerDeath, totalTimePlayed } = data;

  const formatTime = (minutes: number): string => {
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return `${h}h ${m}m`;
  };

  return (
    <Statistics
      gamesPlayed={gamesPlayed}
      averageScore={averageScore}
      killsPerDeath={killsPerDeath}
      totalTimePlayed={formatTime(totalTimePlayed)}
    />
  );
}
