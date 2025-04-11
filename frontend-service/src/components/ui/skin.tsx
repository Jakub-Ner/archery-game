import React from "react";
import { cn } from "@/lib/utils";

interface SkinProps {
  isPurchased: boolean;
  price: number;
  image: string;
  onClick: () => void;
}

const Skin: React.FC<SkinProps> = ({ isPurchased, price, image, onClick }) => {
  return (
    <div
      className="relative w-24 h-24 border rounded-lg overflow-hidden cursor-pointer"
      onClick={onClick}
    >
      <img
        src={image}
        alt="Skin"
        className={cn(
          "w-full h-full object-cover transition-all duration-200",
          !isPurchased && "blur-sm"
        )}
      />

      {!isPurchased && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="bg-black bg-opacity-60 text-white text-sm px-2 py-1 rounded">
            {price} zł
          </div>
        </div>
      )}
    </div>
  );
};

export default Skin;
