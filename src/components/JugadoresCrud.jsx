// src/components/JugadoresCrud.jsx
import React, { useContext, useEffect, useState } from "react";
import { ClubesContext } from "../contexts/ClubesContext";
import { CreateJugador } from "./CreateJugador";
import { EditJugador } from "./EditJugador";
import { DeleteJugador } from "./DeleteJugador";
import { ClipLoader } from "react-spinners";

export function JugadoresCrud() {
  const { loading: clubesLoading, error: clubesError } =
    useContext(ClubesContext);
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTermApellido, setSearchTermApellido] = useState("");
  const [searchTermClub, setSearchTermClub] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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
        setLoading(false);
      } catch (error) {
        console.error("Fetch error:", error);
        setError(
          "No se pudo cargar los jugadores. Inténtalo de nuevo más tarde."
        );
        setData([]);
        setAllData([]);
        setLoading(false);
      }
    }

    fetchData();
  }, [refresh]);

  const handleChangeApellido = (event) => {
    const value = event.target.value;
    setSearchTermApellido(value);
    filtrarDatos(value, searchTermClub);
  };

  const handleClubSearch = (event) => {
    const value = event.target.value;
    setSearchTermClub(value);
    filtrarDatos(searchTermApellido, value);
  };

  const filtrarDatos = (apellido, club) => {
    if (!allData) {
      console.error("allData no está disponible para filtrar.");
      return;
    }

    let filtrado = allData;

    if (apellido.trim() !== "") {
      filtrado = filtrado.filter((jugador) =>
        jugador.apellido_jugador.toLowerCase().includes(apellido.toLowerCase())
      );
    }

    if (club.trim() !== "") {
      filtrado = filtrado.filter((jugador) =>
        jugador.club_jugador.toLowerCase().includes(club.toLowerCase())
      );
    }

    setData(filtrado);
  };

  if (loading || clubesLoading) {
    return (
      <div className="w-100 d-flex justify-content-center mt-4">
        <ClipLoader color="#db1a33" />
      </div>
    );
  }

  if (error || clubesError) {
    return (
      <div className="text-center text-danger mt-4">{error || clubesError}</div>
    );
  }

  return (
    <>
      <div className="d-flex w-100 justify-content-start gap-2">
        <input
          placeholder="Buscar por apellido"
          className="form-control w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus mt-4"
          type="text"
          value={searchTermApellido}
          onChange={handleChangeApellido}
        />
        <input
          placeholder="Buscar por club"
          className="form-control w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus mt-4"
          type="text"
          value={searchTermClub}
          onChange={handleClubSearch}
        />
      </div>
      <div className="row d-flex gap-2 mt-2">
        <div className="jugadores-list mt-2">
          {data.length > 0 ? (
            data.map((jugador) => (
              <div
                className="red-text text-12 decoration-none medium text-center hover-bg-gray"
                key={jugador.id_jugador}
              >
                <div className="custom-border-type-crud">
                  <div className="row jugador">
                    <div className="col-3 foto-jugador">
                      <img src="/images/Group.png" alt="Foto del jugador" />
                    </div>
                    <div className="col-8 info-jugador">
                      <div>
                        {jugador.nombre_jugador} {jugador.apellido_jugador}
                      </div>
                      <div className="semibold">{jugador.club_jugador}</div>
                    </div>
                    <div className="col text-center d-flex justify-content-center gap-3">
                      <EditJugador
                        jugador={jugador}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        jugadorFromGrid={jugador}
                        className="cursor-pointer"
                      />
                      <DeleteJugador
                        jugador={jugador}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="text-center mt-4">No se encontraron jugadores.</div>
          )}
        </div>
      </div>
      <CreateJugador setRefresh={setRefresh} refresh={refresh} />
    </>
  );
}
