import StartGame from "@/components/demo/startgame.demo";
import StatisticsDemo from "../components/demo/statistics.demo";
import SkinMatrixDemo from "../components/demo/skinMatrix.demo";
import CoinsDemo from "../components/demo/coins.demo";
import UserInfo from "../components/demo/userNickname.demo";
import {useEffect, useState} from "react";
import {useLocation, useNavigate} from "react-router-dom";

export default function MainMenu() {
    const [refreshKey, setRefreshKey] = useState(0);
    const location = useLocation();
    const navigate = useNavigate();

    useEffect(() => {
        if (location.state?.refresh) {
            setRefreshKey(prev => prev + 1);

            navigate(location.pathname, { replace: true, state: {} });
        }
    }, [location.state, location.pathname, navigate]);


  return (
    <div className="relative min-h-screen bg-background text-foreground flex flex-col">
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-center pt-8 lg:pt-12 text-primary px-4">
        Archer's Survival
      </h1>

      <div className="flex-1 grid grid-cols-1 lg:grid-cols-3 items-start justify-items-center gap-2 px-4 sm:px-6 md:px-8 py-8 lg:py-12">
        <div className="w-full flex justify-center lg:justify-end">
          <StatisticsDemo refreshKey={refreshKey}  />
        </div>

        <div className="flex flex-col items-center gap-2 w-full max-w-2xl">
          <UserInfo />
            <SkinMatrixDemo onSkinBought={() => setRefreshKey(prev => prev + 1)} />
          <StartGame />
        </div>

        <div className="w-full flex justify-center lg:justify-start">
            <CoinsDemo refreshKey={refreshKey} />
        </div>
      </div>
    </div>
  );
}

