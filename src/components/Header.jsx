import React, { Fragment } from "react";
import { Link } from "react-router-dom";
import "./Header.css";

export function Header() {
  return (
    <Fragment>
      <header className="bg-red d-flex flex-wrap justify-content-center py-1">
        <Link
          to={"/"}
          className="ms-3 d-flex align-items-center mb-3 mb-md-0 me-md-auto link-body-emphasis text-decoration-none"
        >
          <img
            src="/images/logocp.png"
            alt="Chilean Premier League"
            height={50}
          />
        </Link>

        <ul class="nav nav-pills me-4">
          <li class="nav-item">
            <Link
              className="nav-link text-blanco decoration-none text-20 semibold"
              to={"/entrenadores"}
            >
              Entrenadores
            </Link>
          </li>
          <li class="nav-item">
            <Link
              className="nav-link text-blanco decoration-none text-20 semibold"
              to={"/arbitros"}
            >
              Arbitros
            </Link>
          </li>
          <li class="nav-item">
            <Link
              className="nav-link text-blanco decoration-none text-20 semibold"
              to={"/clubes"}
            >
              Clubes
            </Link>
          </li>
          <li class="nav-item">
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
