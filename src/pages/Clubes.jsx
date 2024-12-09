import React, { Fragment, useState, useEffect } from "react";
import { Header, Sidebar } from "../components/index";
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

  const handleChange = (event) => {
    const searchTerm = event.target.value.toLowerCase();
    if (searchTerm === "") {
      fetch(`${process.env.REACT_APP_API}/clubes`, {
        method: "GET",
      })
        .then((response) => response.json())
        .then((data) => {
          setData(data);
        });
    } else {
      const filteredData = data.filter((club) =>
        club.nombre_club.toLowerCase().includes(searchTerm)
      );
      setData(filteredData);
    }
  };
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
              <div className="d-flex justify-content-between">
                <h2 className="red-text bold text-20">
                  Clubes dentro de la Chilean Premier League
                </h2>
                <input
                  placeholder="Buscar por nombre"
                  className="form-control w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus"
                  type="text"
                  onChange={handleChange}
                />
              </div>
              <div className="club-list mt-3">
                {data &&
                  data.map((club) => (
                    <Link
                      className="red-text text-12 bold decoration-none medium text-center pt-2"
                      to={`/clubes/${club.nombre_club}`}
                      key={club.id_club}
                    >
                      <div className="custom-border-type hover-bg-gray">
                        <div className="d-flex flex-column align-items-center">
                          <div>
                            <img
                              src={`${club.escudo_club}`}
                              alt="Escudo"
                              height={80}
                              className="mb-1"
                            />
                          </div>
                          <div>{club.nombre_club}</div>
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
