import { useState } from "react";
import { PLAYER_SERVICE_URL } from "@/consts.ts";

export function useBuySkin() {
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<boolean>(false);

    const buySkin = async (userId: number, skinId: number) => {
        setLoading(true);
        setError(null);
        setSuccess(false);

        try {
            const response = await fetch(
                `${PLAYER_SERVICE_URL}/users/${userId}/buy-skin/${skinId}`,
                {
                    method: "POST",
                }
            );

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(errorText || "Nieznany błąd");
            }

            setSuccess(true);
        } catch (err: any) {
            console.error("Błąd podczas zakupu skórki:", err);
            setError(err.message ?? "Nieznany błąd");
        } finally {
            setLoading(false);
        }
    };

    return { buySkin, loading, error, success };
}
