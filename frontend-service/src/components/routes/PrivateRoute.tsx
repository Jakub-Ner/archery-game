import { Navigate, Outlet } from "react-router-dom";

export default function PrivateRoute() {
    const token = localStorage.getItem("access_token");
    console.log("token")
    console.log(token)

    // Jeśli brak tokena → przekieruj na login
    return token ? <Outlet /> : <Navigate to="/login" />;
}