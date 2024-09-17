import React, { Fragment } from "react";
import { Routes, Route } from "react-router-dom";
import {
  Home,
  Arbitros,
  Clubes,
  Entrenadores,
  Jugadores,
  Start,
} from "./components";

import "./Globals.css";
import { Club } from "./pages/Club";

export function App() {
  return (
    <Fragment>
      <Routes>
        <Route path="/" element={<Start />} />
        <Route path="/home" element={<Home />} />
        <Route path="/arbitros" element={<Arbitros />} />
        <Route path="/clubes" element={<Clubes />} />
        <Route path="/entrenadores" element={<Entrenadores />} />
        <Route path="/jugadores" element={<Jugadores />} />
        <Route path="/clubes/*" element={<Club />} />
      </Routes>
    </Fragment>
  );
}
