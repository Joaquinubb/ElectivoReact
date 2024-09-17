import React, { Fragment, useState, useEffect } from "react";
import { Header, Sidebar } from "../components/index";
import { Link } from "react-router-dom";
export function Arbitros() {
  //Obtenemos los datos
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/arbitros`, {
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
              <h2 className="red-text bold text-20">
                Arbitros de la Chilean Premier League
              </h2>
              <div className="arbitros-list">
                {data &&
                  data.map((arbitros) => (
                    <Link
                      className="red-text text-12 bold decoration-none medium text-center pt-2"
                      to={`/arbitros/${arbitros.nombre_arbitro}`}
                      key={arbitros.id_arbitro}
                    >
                      <div className="custom-border-type-arbitro">
                        <div className="arbitro">
                          <div className="foto-arbitro">
                            <img
                              src="images/Group.png"
                              alt="Foto del arbitro"
                            />
                          </div>
                          <div className="info-arbitro">
                            <div className="bold">
                              {arbitros.nombre_arbitro}{" "}
                              {arbitros.apellido_arbitro}
                            </div>
                            <div className="semibold">{arbitros.edad} años</div>
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
