import './App.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainMenu from "./pages/MainMenu"
import PaymentPage from './pages/Payment';
import PaymentSuccess from './pages/PaymentSuccess';
// import React from "react";

import Gameplay from "@/pages/Gameplay.tsx";
// import BarDemo from './components/demo/bar.demo';
// import ChampionDemo from './components/demo/champion.demo';
import PrivateRoute from "@/components/routes/PrivateRoute.tsx";

function App() {
    return (
        <Router>
            <Routes>
                {/* Publiczne trasy */}
                <Route path="/" element={<Navigate to="/login" replace />} />
                <Route path="/login" element={<Login/>}/>
                <Route path="/register" element={<Register/>}/>
                    {/* <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/menu" element={<MainMenu />} /> */}



                {/* <Route path="/bar" element={<BarDemo/>}/> */}
                {/* <Route path="/champion" element={<ChampionDemo/>}/> */}
                


                {/* Prywatne trasy */}
                <Route element={<PrivateRoute />}>
                    <Route path="/gameplay" element={<Gameplay />} />
                    <Route path="/payment" element={<PaymentPage />} />
                        <Route path="/payment-success" element={<PaymentSuccess />} />
                    <Route path="/menu" element={<MainMenu />} />

                </Route>
            </Routes>
        </Router>
    );
}

export default App
