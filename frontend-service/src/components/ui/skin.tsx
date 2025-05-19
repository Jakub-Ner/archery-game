import React, { useState } from "react";
import { cn } from "@/lib/utils";

interface SkinProps {
  isPurchased: boolean;
  isSelected?: boolean;
  price: number;
  image: string;
  onClick: () => void;
}

const FRAME_WIDTH = 32;
const FRAME_HEIGHT = 32;
const SCALE = 2;

const Skin: React.FC<SkinProps> = ({
                                     isPurchased,
                                     isSelected = false,
                                     price,
                                     image,
                                     onClick,
                                   }) => {
  const [loaded, setLoaded] = useState(false);

  return (
      <div
          className={cn(
              "relative aspect-square w-full max-w-[132px] min-w-[89px]",
              "rounded-lg cursor-pointer p-0.5",
              "flex flex-col items-center justify-center transition-all duration-300",
              isSelected ? "bg-yellow-400/50" : "bg-white"
          )}
          onClick={(e) => {
              e.preventDefault();
              console.log("isSelected:", isSelected);
              onClick();
          }}
      >
        {/* Sprite display container */}
          <div
              style={{
                  width: FRAME_WIDTH * SCALE,
                  height: FRAME_HEIGHT * SCALE,
                  overflow: "hidden",
              }}
              className={cn(
                  "bg-white",
                  !isPurchased && "grayscale opacity-90"
              )}
          >
          <img
              src={image}
              alt="Skin"
              className={cn("transition-all duration-300", loaded ? "opacity-100" : "opacity-0")}
              style={{
                width: FRAME_WIDTH,
                height: FRAME_HEIGHT,
                objectFit: "none",
                objectPosition: "0px 0px",
                transform: `scale(${SCALE})`,
                transformOrigin: "top left",
              }}
              onLoad={() => setLoaded(true)}
              loading="lazy"
          />
        </div>

        {!loaded && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse"></div>
        )}

        {!isPurchased && (
            <div className="mt-2 text-center text-red-500 text-sm font-semibold">
              {price}
            </div>
        )}
      </div>
  );
};

export default Skin;
