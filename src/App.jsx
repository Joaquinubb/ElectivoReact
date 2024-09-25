import React, { Fragment } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import {
  Home,
  Arbitros,
  Clubes,
  Entrenadores,
  Jugadores,
  Start,
  Editor,
} from "./components";

import "./Globals.css";
import { Club } from "./pages/Club";
import { Partidos } from "./pages/Partidos";

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
        <Route path="/editor/*" element={<Editor />} />
        <Route path="/partidos" element={<Partidos />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Fragment>
  );
}
