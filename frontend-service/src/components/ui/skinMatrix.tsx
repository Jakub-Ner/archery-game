import React from 'react';
import Skin from './skin';

interface SkinMatrixProps {
    skins: { isPurchased: boolean; price: number; image: string; isSelected?: boolean }[];
    onSkinSelect: (index: number) => void;
}

const SkinMatrix: React.FC<SkinMatrixProps> = ({skins, onSkinSelect}) => {

    return (
        <div className="grid grid-cols-3 gap-6">
            {skins.map((skin, index) => (
                <div
                    key={index}
                    className="aspect-square"
                    style={{
                        width: '100%',
                        maxWidth: '132px',
                        minWidth: '89px',
                    }}
                >
                    <Skin
                        isPurchased={skin.isPurchased}
                        price={skin.price}
                        image={skin.image}
                        isSelected={skin.isSelected}
                        onClick={() => onSkinSelect(index)}
                    />
                </div>
            ))}
        </div>
    );
};

export default SkinMatrix;