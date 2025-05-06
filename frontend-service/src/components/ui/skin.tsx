import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SkinProps {
  isPurchased: boolean;
  price: number;
  image: string;
  onClick: () => void;
}

const Skin: React.FC<SkinProps> = ({ isPurchased, price, image, onClick }) => {
  const [loaded, setLoaded] = useState(false);

  return (
    <div
      className={cn(
        "relative aspect-square w-full max-w-[132px] min-w-[89px]",
        "border rounded-lg overflow-hidden cursor-pointer",
        "flex items-center justify-center bg-gray-100 transition-all duration-300"
      )}
      onClick={onClick}
    >
      <img
        src={image}
        alt="Skin"
        className={cn(
          "w-full h-full object-cover transition-all duration-300",
          "absolute inset-0",
          !isPurchased && "blur-sm",
          loaded ? "opacity-100" : "opacity-0"
        )}
        onLoad={() => setLoaded(true)}
        loading="lazy"
      />

      {!loaded && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
      )}

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