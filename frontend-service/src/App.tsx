import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import ChampionDemo from "./components/demo/champion.demo"
import MainMenu from "./pages/MainMenu"

import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/champion-demo" element={<ChampionDemo />} />
        <Route path="/menu" element={<MainMenu />} />
      </Routes>
    </Router>
  );
}

export default App
