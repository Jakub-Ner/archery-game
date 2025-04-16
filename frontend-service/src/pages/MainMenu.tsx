import StartGame from "@/components/demo/startgame.demo";
import StatisticsDemo from "../components/demo/statistics.demo";
import SkinMatrixDemo from "../components/demo/skinMatrix.demo";
import CoinsDemo from "../components/demo/coins.demo";

export default function MainMenu() {
  return (
    <div className="relative min-h-screen bg-background text-foreground">
      {/* Nagłówek */}
      <h1 className="text-7xl font-bold text-center pt-10 text-black-600">
        Archer's Survival
      </h1>

      {/* Główna zawartość */}
      <div className="flex flex-row justify-center gap-20 px-16 mt-16">
        {/* Statystyki po lewej */}
        <div className="flex flex-col justify-start pt-8">
          <StatisticsDemo />
        </div>

        {/* Środek: Skiny + Przycisk */}
        <div className="flex flex-col items-center justify-start">
          <SkinMatrixDemo />
          <div className="mt-12">
            <StartGame />
          </div>
        </div>

        {/* Coins po prawej */}
        <div className="flex flex-col justify-start pt-8">
          <CoinsDemo />
        </div>
      </div>
    </div>
  );
}
