import './App.css'
import {BrowserRouter as Router, Route, Routes, Navigate} from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainMenu from "./pages/MainMenu"
import React from "react";

import Gameplay from "@/pages/Gameplay.tsx";
import PrivateRoute from "@/components/routes/PrivateRoute.tsx";
// import PrivateRoute from "@/components/routes/PrivateRoute.tsx";

function App() {
    return (
        <Router>
            <Routes>
                {/* Publiczne trasy */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>

                {/* Prywatne trasy */}
                { /* <Route element={<PrivateRoute/>}> */}
                    <Route path="/menu" element={<MainMenu/>}/>
                    <Route path="/gameplay" element={<Gameplay/>}/>
                    {/*  </Route> */}
            </Routes>
        </Router>
    );
}

export default App
