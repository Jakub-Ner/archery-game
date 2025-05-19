import { Card, CardContent } from "../ui/card.tsx";
import { useNavigate } from "react-router-dom";
import {useUserData} from "@/hooks/useUserData.ts";

export default function CoinsDemo({ refreshKey }: { refreshKey: number }) {
  const navigate = useNavigate();
  const userId = Number(localStorage.getItem("userId"));
  const { user, loading } = useUserData(Number(userId), refreshKey);

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("userId");
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      <Card className="w-full max-w-sm bg-white shadow-lg p-6 rounded-2xl mb-2">
        <CardContent className="flex flex-col items-center gap-4">
          <p className="text-xl font-semibold text-gray-800">Coins</p>
          <p className="text-3xl font-bold text-yellow-500 mt-2">
            {loading ? "Loading..." : user?.gems ?? "N/A"}
          </p>

          <div className="mt-4 text-sm text-center text-gray-600">
            Need more coins?{" "}
            <span
              className="text-primary cursor-pointer"
              onClick={() => alert("Redirect to purchase page (coming soon)!")}
            >
              Buy now
            </span>
          </div>
        </CardContent>
      </Card>

      <Card className="w-full max-w-sm bg-white shadow-lg p-5 rounded-2xl mb-2">
        <CardContent className="flex flex-col items-center gap-6">
          <p className="text-xl font-semibold text-gray-800">Settings</p>
          <div className="space-y-3 text-center text-gray-700 w-full">
            <button className="w-full py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 mb-2">
              Your Data
            </button>
            <button className="w-full py-2 px-4 bg-gray-200 rounded-md hover:bg-gray-300 mb-2">
              Toggle Sound
            </button>
          </div>

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
