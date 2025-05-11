export function decodeToken(token: string): { user_id: number } {
    const payload = token.split(".")[1];
    const decoded = atob(payload);
    return JSON.parse(decoded);
}
