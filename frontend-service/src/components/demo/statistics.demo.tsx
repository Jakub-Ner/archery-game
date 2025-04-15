import { Statistics } from "../ui/statistics";

export default function StatisticsDemo() {
  return (
    <Statistics
      gamesPlayed={42}
      averageScore={88.5}
      killsPerDeath={1.75}
      totalTimePlayed={"12h 30m"}
    />
  );
}
