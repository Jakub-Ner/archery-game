import {useState} from "react";
import {PLAYER_SERVICE_URL} from "@/consts.ts";

export function useSelectSkin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const selectSkin = async (userId: number, skinId: number) =>  {
        setLoading(true);
        setError(null);

        try {
            const response = await fetch(
                `${PLAYER_SERVICE_URL}/skins/select?userId=${userId}&skinId=${skinId}`,
                {
                    method: "PUT",
                }
            );

            if (!response.ok) {
                if (response.status === 404) {
                    throw new Error("Nie znaleziono użytkownika lub skórki.");
                } else {
                    throw new Error(`Błąd serwera: ${response.statusText}`);
                }
            }
        } catch (err: any) {
            console.error("Błąd podczas zaznaczania skórki:", err);
            setError(err.message ?? "Nieznany błąd");
        } finally {
            setLoading(false);
        }
    };


    return {selectSkin, loading, error};
}
