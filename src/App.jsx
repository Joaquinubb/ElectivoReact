import React, { Fragment } from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home, Arbitros, Clubes, Entrenadores, Jugadores } from "./components";

export function App() {
  return (
    <Fragment>
      <Link to={"/"}>Home</Link>
      <Link to={"/arbitros"}>Arbitros</Link>
      <Link to={"/clubes"}>Clubes</Link>
      <Link to={"/entrenadores"}>Entrenadores</Link>
      <Link to={"/jugadores"}>Jugadores</Link>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/arbitros" element={<Arbitros />} />
        <Route path="/clubes" element={<Clubes />} />
        <Route path="/entrenadores" element={<Entrenadores />} />
        <Route path="/jugadores" element={<Jugadores />} />
      </Routes>
    </Fragment>
  );
}
