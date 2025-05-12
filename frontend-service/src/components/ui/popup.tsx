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
      <div className="bg-gray-800 text-white p-6 rounded-2xl shadow-xl w-full max-w-md">
        <h2 className="text-xl font-bold mb-4 text-center">Wybierz akcję</h2>
        <div className="flex justify-between items-end space-x-4">
          {/* Każda kolumna zawiera napis + przycisk */}
          <div className="flex flex-col items-center">
            <span className="mb-2">ATT</span>
            <button
              onClick={onAttack}
              className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-xl shadow"
            >
              ⚔️
            </button>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2">DEF</span>
            <button
              onClick={onDefend}
              className="bg-blue-600 hover:bg-blue-700 px-4 py-2 rounded-xl shadow"
            >
              🛡️
            </button>
          </div>
          <div className="flex flex-col items-center">
            <span className="mb-2">SPD</span>
            <button
              onClick={onRun}
              className="bg-yellow-500 hover:bg-yellow-600 px-4 py-2 rounded-xl shadow"
            >
              🏃
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PopupActionMenu;
