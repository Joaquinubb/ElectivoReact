import React, { useEffect, useState } from "react";
import { CreateJugador } from "./CreateJugador";
import { EditJugador } from "./EditJugador";
import { DeleteJugador } from "./DeleteJugador";

export function JugadoresCrud() {
  const [data, setData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/jugadores`, {
        method: "GET",
      }).then((response) => response.json());

      setData(data);
    }

    fetchData();
  }, [refresh]);

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
        setData(jugador);
      } catch (error) {
        console.error("Fetch error:", error);
        setData([]); // Clear jugadores if there's an error
      }
    }

    fetchJugadores();
  };

  const handleClubSearch = (event) => {
    const searchTerm = event.target.value;
    setSearchTerm(searchTerm);

    async function fetchJugadores() {
      const apiUrl = process.env.REACT_APP_API;

      try {
        if (searchTerm === "") {
          let response = await fetch(`${apiUrl}/jugadores`, {
            method: "GET",
          });
          if (!response.ok) {
            throw new Error("Network response was not ok");
          }
          let jugadores = await response.json();
          setData(jugadores);
        } else {
          let filteredData = data.filter((jugador) =>
            jugador.club_jugador
              .toLowerCase()
              .includes(searchTerm.toLowerCase())
          );
          setData(filteredData);
        }
      } catch (error) {
        console.error("Fetch error:", error);
        setData([]); // Clear jugadores if there's an error
      }
    }

    fetchJugadores();
  };

  return (
    <>
      <div className="d-flex w-100 justify-content-start gap-2">
        <input
          placeholder="Buscar por apellido"
          className="form-control w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus mt-4"
          type="text"
          onChange={handleChange}
        />
        <input
          placeholder="Buscar por club"
          className="form-control w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus mt-4"
          type="text"
          onChange={handleClubSearch}
        />
      </div>
      <div className="row d-flex gap-2 mt-2">
        <div className="jugadores-list mt-2">
          {data &&
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
                      <div className="">
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
            ))}
        </div>
      </div>
      <CreateJugador setRefresh={setRefresh} refresh={refresh} />
    </>
  );
}
