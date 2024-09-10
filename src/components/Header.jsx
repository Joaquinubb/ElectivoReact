import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Fragment>
      <Link to={"/home"}>Home</Link>
      <Link to={"/arbitros"}>Arbitros</Link>
      <Link to={"/clubes"}>Clubes</Link>
      <Link to={"/entrenadores"}>Entrenadores</Link>
      <Link to={"/jugadores"}>Jugadores</Link>
      <Link to={"/"}>Salir</Link>
    </Fragment>
  );
}
