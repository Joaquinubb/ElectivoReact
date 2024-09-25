import React, { Fragment, useState, useEffect } from "react";
import { CardEntrenador, Header, Sidebar } from "../components/index";

export function Entrenadores() {
  //Obtenemos los datos
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/entrenadores`, {
        method: "GET",
      }).then((response) => response.json());

      setData(data);
    }

    fetchData();
  }, []);
  //Retorno del componente
  return (
    <Fragment>
      <div className="container-fluid d-flex flex-column vh-100">
        <Header></Header>
        <div className="row flex-grow-1">
          <div className="col-sidebar blue d-flex flex-column sidebar-container">
            <Sidebar></Sidebar>
          </div>
          <div className="col mt-5 pt-4 content-container">
            <div className="bg-white p-3">
              <h2 className="red-text bold text-20">
                Entrenadores de la Chilean Premier League
              </h2>
              <div className="entrenadores-list">
                <div className="row mt-4">
                  {/* card entrenador*/}
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
