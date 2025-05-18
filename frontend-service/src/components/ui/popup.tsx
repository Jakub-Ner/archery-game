import React from "react";

type PopupActionMenuProps = {
  onAttack: () => void;
  onDefend: () => void;
  onRun: () => void;
};

const PopupActionMenu: React.FC<PopupActionMenuProps> = ({
  onAttack,
  onDefend,
  onRun,
}) => {
  return (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-60 z-50">
    <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-2xl w-full max-w-md border-4 border-gray-700">
      <h2 className="text-2xl font-bold text-center mb-1">Level up!</h2>
      <p className="text-center mb-6 text-sm text-gray-300">Choose one stat!</p>

      <div className="flex justify-between items-center space-x-4">
        {/* ATT */}
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-xl shadow-inner w-full">
          <span className="text-3xl mb-2">⚔️</span>
          <button
            onClick={onAttack}
            className="bg-red-600 hover:bg-red-700 px-6 py-2 rounded-full shadow text-white font-semibold"
          >
            ATT
          </button>
        </div>

        {/* DEF */}
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-xl shadow-inner w-full">
          <span className="text-3xl mb-2">🛡️</span>
          <button
            onClick={onDefend}
            className="bg-blue-600 hover:bg-blue-700 px-6 py-2 rounded-full shadow text-white font-semibold"
          >
            DEF
          </button>
        </div>

        {/* SPD */}
        <div className="flex flex-col items-center bg-gray-700 p-4 rounded-xl shadow-inner w-full">
          <span className="text-3xl mb-2">🏃</span>
          <button
            onClick={onRun}
            className="bg-yellow-500 hover:bg-yellow-600 px-6 py-2 rounded-full shadow text-white font-semibold"
          >
            SPD
          </button>
        </div>
      </div>
    </div>
  </div>
  );
};

export default PopupActionMenu;
