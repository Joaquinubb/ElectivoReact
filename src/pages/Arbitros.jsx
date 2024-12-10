import React, { Fragment, useState, useEffect } from "react";
import { Header, Sidebar } from "../components/index";

export function Arbitros() {
  // Estados para los datos
  const [data, setData] = useState([]);
  const [allData, setAllData] = useState([]);
  const [searchTermApellido, setSearchTermApellido] = useState("");

  // Fetch árbitros
  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      try {
        let response = await fetch(`${apiUrl}/arbitros`, {
          method: "GET",
        });
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        let arbitros = await response.json();
        setData(arbitros);
        setAllData(arbitros);
      } catch (error) {
        console.error("Fetch error:", error);
        setData([]);
        setAllData([]);
      }
    }

    fetchData();
  }, []);

  // Manejar cambio de apellido
  const handleChangeApellido = (event) => {
    const value = event.target.value;
    setSearchTermApellido(value);
    filtrarDatos(value);
  };

  // Filtrar datos
  const filtrarDatos = (apellido) => {
    let filtrado = allData;

    if (apellido) {
      filtrado = filtrado.filter((arbitro) =>
        arbitro.apellido_arbitro.toLowerCase().includes(apellido.toLowerCase())
      );
    }

    setData(filtrado);
  };

  // Retorno del componente
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
                  Árbitros de la Chilean Premier League
                </h2>
                <input
                  placeholder="Buscar por apellido"
                  className="form-control w-fit border-red-2 rounded-4 red-text px-3 py-1 text-15 focus"
                  type="text"
                  value={searchTermApellido}
                  onChange={handleChangeApellido}
                />
              </div>
              <div className="arbitros-list mt-4">
                {data &&
                  data.map((arbitro) => (
                    <div
                      className="red-text text-12 decoration-none medium text-center"
                      key={arbitro.id_arbitro}
                    >
                      <div className="custom-border-type-arbitro hover-bg-gray">
                        <div className="arbitro">
                          <div className="foto-arbitro">
                            <img
                              src="images/Group.png"
                              alt="Foto del arbitro"
                            />
                          </div>
                          <div className="info-arbitro">
                            <div className="">
                              {arbitro.nombre_arbitro}{" "}
                              {arbitro.apellido_arbitro}
                            </div>
                            <div className="semibold">{arbitro.edad} años</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
