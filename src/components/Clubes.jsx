import React, { Fragment, useState, useEffect } from "react";
import { Header, Sidebar } from "./index";
import "./Clubes.css";
import { Link } from "react-router-dom";
export function Clubes() {
  //Obtenemos los datos
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/clubes`, {
        method: "GET",
      }).then((response) => response.json());

      setData(data);
    }

    fetchData();
  }, []);
  //Retorno del componente
  return (
    <Fragment>
    <div className="container-fluid">
      <div className="row">
        <Header></Header>
      </div>
      <div className="row">
        <div className="col-2 blue">
          <Sidebar></Sidebar>
        </div>
        <div className="col">
          <div className="bg-white p-3">
            <h2 className="red-text bold text-24">Clubes dentro de la Chilean Premier League</h2>
            <div className="club-list d-inline-flex flex-wrap">
              {data &&
                data.map((club) => (
                  <Link
                      className="red-text text-12 bold decoration-none medium text-center pt-2"
                      to={`/clubes/${club.id_club}`}
                    >
                  <div className="mb-2 mx-2 d-flex flex-column align-items-center custom-border-type p-5">
                      <div className="d-flex flex-column align-items-center">
                        <div>
                          <img
                            src={`${club.escudo_club}`}
                            alt="Escudo"
                            height={30}
                            className="mb-1"
                          />
                        </div>
                        <div>
                          {club.nombre_club}
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