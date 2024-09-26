import React, { useEffect, useState } from "react";
import { CreateJugador } from "./CreateJugador";
import { CardJugador } from "./CardJugador";

export const JugadoresCrud = () => {
    const [jugadores, setJugadores] = React.useState([]);
    const [searchTerm, setSearchTerm] = React.useState("");

    useEffect(() => {
        async function fetchJugadores() {
        const apiUrl = process.env.REACT_APP_API;

        let jugador = await fetch(`${apiUrl}/jugadores`, {
            method: "GET",
        }).then((response) => response.json());

        setJugadores(jugador);
        }

        fetchJugadores();
        console.log(jugadores);
    }, []);

    const handleChange = (event) => {
        setSearchTerm(event.target.value);
        async function fetchJugadores() {
            const apiUrl = process.env.REACT_APP_API;

            try {
                let response = await fetch(
                    `${apiUrl}/jugadores?apellido=${event.target.value}`,
                    {
                        method: "GET",
                    }
                );
                if (!response.ok) {
                    throw new Error("Network response was not ok");
                }
                let jugador = await response.json();
                setJugadores(jugador);
            } catch (error) {
                console.error("Fetch error:", error);
                setJugadores([]); // Clear jugadores if there's an error
            }
        }

        fetchJugadores();
    };

  return (
    <>
      <div className="row d-flex  gap-2 mt-2">
      <div className="row mt-4">
        <div className="red-text w-100 d-flex justify-content-start mb-2">
              <input
                placeholder="Buscar por apellido"
                className="form-control w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus"
                type="text"
                onChange={handleChange}
              />
            </div>
              {/* card jugador*/}
              
              {jugadores && jugadores.map(
                (jugador) =>
                  jugador.nombre_jugador && (
                    <CardJugador
                      key={jugador.id_jugador}
                      nombre_jugador={jugador.nombre_jugador}
                      apellido_jugador={jugador.apellido_jugador}
                      club_jugador={jugador.club_jugador}
                      edad={jugador.edad}
                      estatura_jugador={jugador.estatura_jugador}
                      fechaNac_jugador={jugador.fechaNac_jugador}
                      id_jugador={jugador.id_jugador}
                      nacionalidad_jugador={jugador.nacionalidad_jugador}
                      posicion_jugador={jugador.posicion_jugador}
                    />
                  )
              )}
            </div>
      </div>
      <CreateJugador />
    </>
  );
};
