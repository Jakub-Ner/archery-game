import React, { useState } from 'react';
import SkinMatrix from '../ui/skinMatrix';
import reactLogo from '@/assets/react.svg';

const SkinMatrixDemo: React.FC = () => {
  const [skins, setSkins] = useState([
    { isPurchased: true, price: 0, image: reactLogo},
    { isPurchased: false, price: 200, image: reactLogo },
    { isPurchased: false, price: 200, image: reactLogo },
    { isPurchased: false, price: 400, image: reactLogo },
    { isPurchased: false, price: 400, image: reactLogo },
    { isPurchased: false, price: 400, image: reactLogo },
    { isPurchased: false, price: 600, image: reactLogo },
    { isPurchased: false, price: 600, image: reactLogo },
    { isPurchased: false, price: 600, image: reactLogo },
  ]);

  const handleSkinSelect = (index: number) => {
    if (!skins[index].isPurchased) {
      
      alert(`Kupujesz skórkę za ${skins[index].price} zł`);
    } else {
      alert(`Skórka jest już zakupiona`);
    }
  };

  return (
    <div className="p-8">
      <SkinMatrix skins={skins} onSkinSelect={handleSkinSelect} />
    </div>
  );
};

export default SkinMatrixDemo;
