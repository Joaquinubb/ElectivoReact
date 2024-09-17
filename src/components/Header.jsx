import React, { Fragment } from "react";
import { Link } from "react-router-dom";

export function Header() {
  return (
    <Fragment>
      <header className="bg-red d-flex flex-wrap justify-content-center py-1 fixed-top">
        <Link
          to={"/home"}
          className="ms-3 d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <img
            src="/images/logocp.png"
            alt="Chilean Premier League"
            height={50}
          />
        </Link>

        <ul className="nav nav-pills me-4">
          <li className="nav-item">
            <Link
              className="nav-link text-blanco decoration-none text-20 semibold"
              to={"/entrenadores"}
            >
              Entrenadores
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-blanco decoration-none text-20 semibold"
              to={"/arbitros"}
            >
              Árbitros
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-blanco decoration-none text-20 semibold"
              to={"/clubes"}
            >
              Clubes
            </Link>
          </li>
          <li className="nav-item">
            <Link
              className="nav-link text-blanco decoration-none text-20 semibold"
              to={"/jugadores"}
            >
              Jugadores
            </Link>
          </li>
        </ul>
      </header>
    </Fragment>
  );
}
