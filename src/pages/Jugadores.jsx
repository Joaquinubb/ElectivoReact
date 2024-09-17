import React, { useEffect } from "react";
import { CardJugador, Header, Sidebar } from "../components/index";

export function Jugadores() {
  const [data, setData] = React.useState([]);
  const [searchTerm, setSearchTerm] = React.useState("");

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/jugadores`, {
        method: "GET",
      }).then((response) => response.json());

      setData(data);
    }

    fetchData();
    console.log(data);
  }, []);

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(
        `${apiUrl}/jugadores?apellido=${event.target.value}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());

      setData(data);
    }

    fetchData();
    console.log(data);
  };

  return (
    <div className="container-fluid d-flex flex-column vh-100">
      <Header></Header>
      <div className="row flex-grow-1">
        <div className="col-2 blue d-flex flex-column sidebar-container">
          <Sidebar></Sidebar>
        </div>
        <div className="col mt-5 pt-4 content-container">
          <div className="bg-white p-3">
            <div className="red-text w-100 d-flex justify-content-between ">
              <h1 className="bold text-20">
                Jugadores de la Chilean Premier League
              </h1>
              <input
                placeholder="Buscar por apellido"
                className="form-control  w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus"
                type="text"
                onChange={handleChange}
              />
            </div>

            <div className="row mt-4">
              {/* card jugador*/}
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
