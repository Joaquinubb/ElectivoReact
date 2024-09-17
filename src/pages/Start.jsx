import React from "react";
import { Routes, Route, Link } from "react-router-dom";
import { Home } from "./Home";

export function Start() {
  return (
    <>
      <div className="bg-red bg p-10 container-fluid">
        <img
          src="/images/logocp.png"
          width={440}
          alt="Chilean Premier League"
        />
        <h1 className="text-blanco text-24 bold mt-5 mb-3">
          Bienvenido a la Chilean Premier League
        </h1>
        <h2 className="text-blanco text-20 semibold">
          Sumérgete en la emoción de la liga más competitiva de Chile. Conoce a
          fondo los equipos que representan la historia y la gloria del fútbol
          chileno. Descubre a los jugadores que se convierten en héroes cada fin
          de semana y a los entrenadores que trazan el camino hacia la victoria.
        </h2>
        <Routes>
          <Route path="/home" element={<Home />} />
        </Routes>
      </div>
      <Link className="text-blanco decoration-none text-24 bold" to={"/home"}>
        <div className="bg-blue fixed-bottom bg-size d-flex justify-content-center align-items-center">
          <svg
            className="me-3"
            width="33"
            height="50"
            viewBox="0 0 33 50"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M26.509 4.9636C26.509 7.70484 24.2866 9.92721 21.5454 9.92721C18.8041 9.92721 16.5818 7.70484 16.5818 4.9636C16.5818 2.22237 18.8041 0 21.5454 0C24.2866 0 26.509 2.22237 26.509 4.9636ZM26.509 36.3998C24.6814 36.3998 23.1999 37.8812 23.1999 39.7088C23.1999 41.5364 24.6814 43.0179 26.509 43.0179C28.3366 43.0179 29.8181 41.5364 29.8181 39.7088C29.8181 37.8812 28.3366 36.3998 26.509 36.3998ZM32.5977 20.1522L26.2774 13.8319C25.9792 13.4596 25.5298 13.2409 25.053 13.2363H1.69097C0.777336 13.2363 0.0364355 13.9772 0.0364355 14.8908C0.0364355 15.8044 0.777336 16.5453 1.69097 16.5453H10.6255L0.0364355 37.3925C-0.00922963 37.6109 -0.00922963 37.8359 0.0364355 38.0543C-0.15549 38.9679 0.429884 39.8643 1.34352 40.0563C2.25715 40.2482 3.15358 39.6628 3.3455 38.7492L6.65457 33.0907H13.2727L6.88621 47.1211C6.73002 47.3806 6.64994 47.6787 6.65457 47.9815C6.47191 48.8951 7.06457 49.7843 7.9782 49.9669C8.89184 50.1496 9.78098 49.5569 9.96364 48.6433L25.5163 17.6042L30.2813 22.5017C30.9795 23.0913 32.0232 23.0033 32.6129 22.3054C33.1394 21.682 33.1331 20.768 32.5977 20.1522Z"
              fill="#EAE8E0"
            />
          </svg>
          Comenzar
        </div>
      </Link>
    </>
  );
}
