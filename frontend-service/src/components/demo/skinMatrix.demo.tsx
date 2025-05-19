import React, {useEffect, useState} from 'react';
import SkinMatrix from '../ui/skinMatrix';

import {useUserData} from '@/hooks/useUserData';
import {useSelectSkin} from "@/hooks/useSelectSkin.ts";
import {useBuySkin} from "@/hooks/useBuySkin.ts";

const SkinMatrixDemo: React.FC<{ onSkinBought: () => void }> = ({ onSkinBought }) => {
    const userId = localStorage.getItem("userId") || "";
    const [refreshKey, setRefreshKey] = useState(0);
    const { user, loading } = useUserData(Number(userId), refreshKey);

    const {selectSkin} = useSelectSkin();
    const { buySkin, error: buyError } = useBuySkin();

    const [skins, setSkins] = useState<
        { id?: number, isPurchased: boolean; price: number; image: string; isSelected?: boolean }[]
    >([]);

    useEffect(() => {
        if (user) {
            const owned = user.ownedSkins || [];
            const unowned = user.unownedSkins || [];

            const formattedOwned = owned.map((skin) => ({
                id: skin.id,
                isPurchased: true,
                price: skin.price,
                image: skin.imageUrl,
                isSelected: skin.id === user.selectedSkin?.id,
            }));

            const formattedUnowned = unowned.map((skin) => ({
                id: skin.id,
                isPurchased: false,
                price: skin.price,
                image: skin.imageUrl,
                isSelected: false,
            }));

            setSkins([...formattedOwned, ...formattedUnowned]);
        }
    }, [user]);

    const handleSkinSelect = async (index: number) => {
        const skin = skins[index];
        if (!skin.isPurchased) {
            const confirmBuy = confirm(`Kupujesz skórkę za ${skin.price} zł?`);
            if (!confirmBuy) return;

            await buySkin(Number(userId), skin.id!);

            if (buyError) {
                alert(`Błąd: ${buyError}`);
            } else {
                setRefreshKey(prev => prev + 1);
                onSkinBought();
                alert("Zakupiono skórkę!");
            }
            return;
        } else if (skin.isSelected) {
            alert(`Ta skórka jest już wybrana`);
        } else {
            if (skin.id && user) {
                try {
                    await selectSkin(Number(userId), skin.id);
                    setSkins((prevSkins) =>
                        prevSkins.map((s, i) => ({
                            ...s,
                            isSelected: i === index,
                        }))
                    );
                } catch (err) {
                    alert("Błąd przy zmianie skórki");
                    console.error(err);
                }
            }
        }
    };

    if (loading || !user) {
        return <div className="p-4">Ładowanie skórek...</div>;

    }

    return (
        <div className="p-4 sm:p-6 md:p-8">
            <SkinMatrix skins={skins} onSkinSelect={handleSkinSelect}/>
        </div>
    );
};

export default SkinMatrixDemo;