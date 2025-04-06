import './App.css'
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import ChampionDemo from "./components/demo/champion.demo"
import React from "react";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/champion-demo" element={<ChampionDemo />} />
      </Routes>
    </Router>
  );
}

export default App
