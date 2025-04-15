import React from 'react';
import Skin from './skin';

interface SkinMatrixProps {
  skins: { isPurchased: boolean; price: number; image: string }[];
  onSkinSelect: (index: number) => void;
}

const SkinMatrix: React.FC<SkinMatrixProps> = ({ skins, onSkinSelect }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {skins.map((skin, index) => (
        <Skin
          key={index}
          isPurchased={skin.isPurchased}
          price={skin.price}
          image={skin.image}
          onClick={() => onSkinSelect(index)}
        />
      ))}
    </div>
  );
};

export default SkinMatrix;
