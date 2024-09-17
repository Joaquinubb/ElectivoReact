import React, { useEffect, useState } from "react";

export const JugadoresByClub = ({ club }) => {
  const [data, setData] = useState({
    nombre_club: null,
    jugadores: [
      {
        id: 0,
        nombre: null,
        apellido: null,
        edad: 0,
        posicion: null,
        nacionalidad: null,
      },
    ],
  });

  useEffect(() => {
    async function fetchJugadores() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/jugadores/club?nombre=${club}`, {
        method: "GET",
      }).then((response) => response.json());

      setData(data);
    }

    fetchJugadores();
  }, []);
  console.log(data.jugadores);

  const ARQUEROS = data.jugadores.filter(
    (jugador) => jugador.posicion === "PORTERO"
  );
  const DEFENSAS = data.jugadores.filter(
    (jugador) => jugador.posicion === "DEFENSA"
  );
  const MEDIOCAMPISTAS = data.jugadores.filter(
    (jugador) => jugador.posicion === "MEDIOCAMPISTA"
  );
  const DELANTEROS = data.jugadores.filter(
    (jugador) => jugador.posicion === "DELANTERO"
  );

  return (
    <>
      <p className="text-16 m-0 bold red-text">ARQUEROS</p>
      <div className="row">
        {/* card jugador*/}
        {ARQUEROS.map((jugador) => (
          <div className="col-md-4 w-fit border-red-2 red-text text-16 d-flex align-items-center text-start rounded-3 mx-2 mb-2 shadow-card ">
            <img width={40} height={40} src="/images/Group.png" alt="" />{" "}
            <div className="ms-2">
              <p className="m-0">
                {jugador.nombre} {jugador.apellido}
              </p>
              <p className="m-0 bold">{jugador.edad} Años</p>
              <img
                width={20}
                height={20}
                src={`/images/${jugador.nacionalidad}.png`}
                alt={jugador.nacionalidad}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="separation-bar"></div>
      <p className="text-16 m-0 bold red-text">DEFENSAS</p>
      <div className="row">
        {/* card jugador*/}
        {DEFENSAS.map((jugador) => (
          <div className="col-md-4 w-fit border-red-2 red-text text-16 d-flex align-items-center text-start rounded-3 mx-2 mb-2 shadow-card ">
            <img width={40} height={40} src="/images/Group.png" alt="" />{" "}
            <div className="ms-2">
              <p className="m-0">
                {jugador.nombre} {jugador.apellido}
              </p>
              <p className="m-0 bold">{jugador.edad} Años</p>
              <img
                width={20}
                height={20}
                src={`/images/${jugador.nacionalidad}.png`}
                alt={jugador.nacionalidad}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="separation-bar"></div>
      <p className="text-16 m-0 bold red-text">MEDIOCAMPISTAS</p>
      <div className="row">
        {/* card jugador*/}
        {MEDIOCAMPISTAS.map((jugador) => (
          <div className="col-md-4 w-fit border-red-2 red-text text-16 d-flex align-items-center text-start rounded-3 mx-2 mb-2 shadow-card ">
            <img width={40} height={40} src="/images/Group.png" alt="" />{" "}
            <div className="ms-2">
              <p className="m-0">
                {jugador.nombre} {jugador.apellido}
              </p>
              <p className="m-0 bold">{jugador.edad} Años</p>
              <img
                width={20}
                height={20}
                src={`/images/${jugador.nacionalidad}.png`}
                alt={jugador.nacionalidad}
              />
            </div>
          </div>
        ))}
      </div>
      <div className="separation-bar"></div>
      <p className="text-16 m-0 bold red-text">DELANTEROS</p>
      <div className="row">
        {/* card jugador*/}
        {DELANTEROS.map((jugador) => (
          <div className="col-md-4 w-fit border-red-2 red-text text-16 d-flex align-items-center text-start rounded-3 mx-2 mb-2 shadow-card ">
            <img width={40} height={40} src="/images/Group.png" alt="" />{" "}
            <div className="ms-2">
              <p className="m-0">
                {jugador.nombre} {jugador.apellido}
              </p>
              <p className="m-0 bold">{jugador.edad} Años</p>
              <img
                width={20}
                height={20}
                src={`/images/${jugador.nacionalidad}.png`}
                alt={jugador.nacionalidad}
              />
            </div>
          </div>
        ))}
      </div>
    </>
  );
};
