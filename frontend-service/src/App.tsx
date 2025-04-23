import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import MainMenu from "./pages/MainMenu"
import React from "react";
import ChampionDemo from "@/components/demo/champion.demo.tsx";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/menu" element={<MainMenu />} />
      <Route path="/championDemo" element={<ChampionDemo />} />
      </Routes>
    </Router>
  );
}

export default App
