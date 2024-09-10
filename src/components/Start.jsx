import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";

export function Start() {
  return (
    <div>
      <h1>Bienvenido a la Chilean Premier League</h1>
      <Routes>
        <Route path="/home" element={<Home />} />
      </Routes>
      <Link to={"/home"}>Comenzar</Link>
    </div>
  );
}
