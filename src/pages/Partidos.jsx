import React, { Fragment, useState, useEffect } from "react";
import { Header, Sidebar } from "../components/index";
import { CardPartido } from "../components/CardPartido";
export function Partidos() {
  //Obtenemos los datos
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/partidos`, {
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
                Partidos de la Chilean Premier League
              </h2>
              <div className="row mt-4">
                {/* card jugador*/}
                {data &&
                  data.map(
                    (partido) =>
                      partido.id_partido && (
                        <CardPartido
                          key={partido.id_partido}
                          id_partido={partido.id_partido}
                          fecha_partido={partido.fecha_partido}
                          club_local={partido.club_local}
                          club_visitante={partido.club_visitante}
                          arbitro={partido.arbitro}
                          estadio={partido.estadio}
                        />
                      )
                  )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
