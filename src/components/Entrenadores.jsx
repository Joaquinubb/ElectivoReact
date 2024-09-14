import React, { Fragment, useState, useEffect } from "react";
import { Header, Sidebar } from "./index";
import { Link } from "react-router-dom";
import "./Entrenadores.css";
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
          <div className="col-2 blue d-flex flex-column sidebar-container">
            <Sidebar></Sidebar>
          </div>
          <div className="col mt-5 pt-4 content-container">
            <div className="bg-white p-3">
              <h2 className="red-text bold text-24">
                Entrenadores de la Chilean Premier League
              </h2>
              <div className="entrenadores-list">
                {data &&
                  data.map((entrenador) => (
                    <Link
                      className="red-text text-12 bold decoration-none medium text-center pt-2"
                      to={`/entrenadores/${entrenador.nombre_entrenador}`}
                      key={entrenador.id_entrenador}
                    >
                      <div className="custom-border-type-entrenador">
                        <div className="entrenador">
                          <div className="foto-entrenador">
                            <img
                              src="images/Group.png"
                              alt="Foto del entrenador"
                            />
                          </div>
                          <div className="info-entrenador">
                            <div>
                              {entrenador.nombre_entrenador}{" "}
                              {entrenador.apellido_entrenador}
                            </div>
                            <div className="bold">
                              {entrenador.club_entrenador}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
