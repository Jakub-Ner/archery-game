import { Card, CardContent } from "./card";

export function Statistics({
  gamesPlayed,
  averageScore,
  killsPerDeath,
  bestScore,
  totalTimePlayed,
}: {
  gamesPlayed: number;
  averageScore: number;
  killsPerDeath: number;
  bestScore: number;
  totalTimePlayed: string;
}) {
  const roundToTwo = (num: number): number => Math.round(num * 100) / 100;

  const stats = [
    { label: "Games played", value: gamesPlayed },
    { label: "Average score", value: roundToTwo(averageScore)},
    { label: "Kills per death", value: roundToTwo(killsPerDeath) },
    { label: "Best score", value: bestScore },
    { label: "Total time played", value: totalTimePlayed },
  ];

  return (
    <Card className="w-full max-w-sm bg-white shadow-lg p-6 rounded-2xl">
      <CardContent className="flex flex-col items-center gap-6">
        <h2 className="text-2xl font-bold mb-4">Statistics</h2>
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <p className="text-md text-gray-700">{stat.label}</p>
            <p className="text-2xl font-semibold text-black">{stat.value}</p>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
