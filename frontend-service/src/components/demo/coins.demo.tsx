import { Card, CardContent } from "../ui/card.tsx"; // Importujemy Card i CardContent
import {useNavigate} from "react-router-dom";

export default function CoinsDemo() {
  const navigate = useNavigate();

  const handleLogout = () => {

    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");

    navigate("/login");
  };

    return (
      <div className="space-y-6">
        {/* Karta z monetami */}
        <Card className="w-full max-w-sm bg-white shadow-lg p-6 rounded-2xl">
          <CardContent className="flex flex-col items-center gap-4">
            <p className="text-xl font-semibold text-gray-800">Coins</p>
            <p className="text-3xl font-bold text-yellow-500 mt-2">123</p>
            
            {/* Komunikat o dokupieniu monet */}
            <div className="mt-4 text-sm text-center text-gray-600">
              Need more coins?{" "}
              <span
                className="text-primary cursor-pointer"
                onClick={() => alert('Redirect to purchase page (coming soon)!')}
              >
                Buy now
              </span>
            </div>
          </CardContent>
        </Card>
  
        <Card className="w-full max-w-sm bg-white shadow-lg p-5 rounded-2xl">
          <CardContent className="flex flex-col items-center gap-6">
            <p className="text-xl font-semibold text-gray-800">Settings</p>

            {/* Możliwości ustawień */}
            <div className="space-y-3 text-center text-gray-700 w-full">
              <button className="w-full py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300">
                Your Data
              </button>
              <button className="w-full py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300">
                Toggle Sound
              </button>
            </div>

            {/* Przycisk logowania */}
            <div className="flex justify-center w-full">
              <button
                className="w-full py-2 px-4 bg-red-500 text-white rounded-md hover:bg-red-600 transition"
                onClick={handleLogout}
              >
                Log out
              </button>
            </div>
          </CardContent>
        </Card>

      </div>
    );
  }