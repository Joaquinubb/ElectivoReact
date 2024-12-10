import React, { useEffect, useState } from "react";
import { CardJugador, Header, Sidebar } from "../components/index";

export function Jugadores() {
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTermApellido, setSearchTermApellido] = useState("");
  const [searchTermClub, setSearchTermClub] = useState("");
  const [clubes, setClubes] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      try {
        let response = await fetch(`${apiUrl}/jugadores`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let jugadores = await response.json();
        setData(jugadores);
        setAllData(jugadores);
      } catch (error) {
        console.error("Fetch error:", error);
        setData([]);
        setAllData([]);
      }
    }

    fetchData();
  }, []);

  useEffect(() => {
    async function fetchClubes() {
      const apiUrl = process.env.REACT_APP_API;

      try {
        let response = await fetch(`${apiUrl}/clubes`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let clubesData = await response.json();
        setClubes(clubesData);
      } catch (error) {
        console.error("Fetch error:", error);
        setClubes([]);
      }
    }

    fetchClubes();
  }, []);

  const handleChangeApellido = (event) => {
    const value = event.target.value;
    setSearchTermApellido(value);
    filtrarDatos(value, searchTermClub);
  };

  const handleChangeClub = (event) => {
    const value = event.target.value;
    setSearchTermClub(value);
    filtrarDatos(searchTermApellido, value);
  };

  const filtrarDatos = (apellido, club) => {
    let filtrado = allData;

    if (apellido) {
      filtrado = filtrado.filter((jugador) =>
        jugador.apellido_jugador.toLowerCase().includes(apellido.toLowerCase())
      );
    }

    if (club) {
      filtrado = filtrado.filter((jugador) =>
        jugador.club_jugador.toLowerCase().includes(club.toLowerCase())
      );
    }

    setData(filtrado);
  };

  return (
    <div className="container-fluid d-flex flex-column vh-100">
      <Header />
      <div className="row flex-grow-1">
        <div className="col-sidebar blue d-flex flex-column sidebar-container">
          <Sidebar />
        </div>
        <div className="col mt-5 pt-4 content-container">
          <div className="bg-white p-3">
            <div className="red-text w-100 d-flex justify-content-between">
              <h1 className="bold text-20">
                Jugadores de la Chilean Premier League
              </h1>
              <div className="d-flex justify-content-between gap-2">
                <input
                  placeholder="Buscar por apellido"
                  className="form-control w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus"
                  type="text"
                  value={searchTermApellido}
                  onChange={handleChangeApellido}
                />
                <input
                  placeholder="Buscar por club"
                  className="form-control w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus"
                  type="text"
                  value={searchTermClub}
                  onChange={handleChangeClub}
                />
              </div>
            </div>

            <div className="row mt-4 justify-content-center">
              {/* card jugador */}
              {data.map(
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
                      escudo_club={
                        clubes.find(
                          (club) => club.nombre_club === jugador.club_jugador
                        )?.escudo_club || ""
                      }
                    />
                  )
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
