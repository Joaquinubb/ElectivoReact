import React, { Fragment, useState, useEffect } from "react";
import { CardEntrenador, Header, Sidebar } from "../components/index";

export function Entrenadores() {
  // Estados para los datos
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTermApellido, setSearchTermApellido] = useState("");
  const [searchTermClub, setSearchTermClub] = useState("");

  // Estado para los clubes
  const [clubes, setClubes] = useState([]);

  // Fetch entrenadores
  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      try {
        let response = await fetch(`${apiUrl}/entrenadores`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let entrenadores = await response.json();
        setData(entrenadores);
        setAllData(entrenadores);
      } catch (error) {
        console.error("Fetch error:", error);
        setData([]);
        setAllData([]);
      }
    }

    fetchData();
  }, []);

  // Fetch clubes
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

  // Manejar cambio de apellido
  const handleChangeApellido = (event) => {
    const value = event.target.value;
    setSearchTermApellido(value);
    filtrarDatos(value, searchTermClub);
  };

  // Manejar cambio de club
  const handleChangeClub = (event) => {
    const value = event.target.value;
    setSearchTermClub(value);
    filtrarDatos(searchTermApellido, value);
  };

  // Filtrar datos
  const filtrarDatos = (apellido, club) => {
    let filtrado = allData;

    if (apellido) {
      filtrado = filtrado.filter((entrenador) =>
        entrenador.apellido_entrenador
          .toLowerCase()
          .includes(apellido.toLowerCase())
      );
    }

    if (club) {
      filtrado = filtrado.filter((entrenador) =>
        entrenador.club_entrenador.toLowerCase().includes(club.toLowerCase())
      );
    }

    setData(filtrado);
  };

  return (
    <Fragment>
      <div className="container-fluid d-flex flex-column vh-100">
        <Header />
        <div className="row flex-grow-1">
          <div className="col-sidebar blue d-flex flex-column sidebar-container">
            <Sidebar />
          </div>
          <div className="col mt-5 pt-4 content-container">
            <div className="bg-white p-3">
              <div className="d-flex justify-content-between">
                <h2 className="red-text bold text-20">
                  Entrenadores de la Chilean Premier League
                </h2>
                <div className="d-flex gap-2">
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
              <div className="entrenadores-list">
                <div className="row mt-4">
                  {/* card entrenador */}
                  {data &&
                    data.map(
                      (entrenador) =>
                        entrenador.nombre_entrenador && (
                          <CardEntrenador
                            key={entrenador.id_entrenador}
                            nombre_entrenador={entrenador.nombre_entrenador}
                            apellido_entrenador={entrenador.apellido_entrenador}
                            club_entrenador={entrenador.club_entrenador}
                            edad={entrenador.edad}
                            fechaNac_entrenador={entrenador.fechaNac_entrenador}
                            id_entrenador={entrenador.id_entrenador}
                            nacionalidad_entrenador={
                              entrenador.nacionalidad_entrenador
                            }
                            escudo_club={
                              clubes.find(
                                (club) =>
                                  club.nombre_club ===
                                  entrenador.club_entrenador
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
      </div>
    </Fragment>
  );
}
