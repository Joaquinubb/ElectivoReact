import React, { Fragment, useState, useEffect } from "react";
import { Header, Sidebar } from "../components/index";
import { CardPartido } from "../components/CardPartido";
export function Partidos() {
  const [allData, setAllData] = useState([]);
  const [data, setData] = useState([]);
  const [showPastMatches, setShowPastMatches] = useState(false);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/partidos`, {
        method: "GET",
      }).then((response) => response.json());

      setAllData(data);
      filterMatches(data, showPastMatches);
    }

    fetchData();
  }, []);

  const filterMatches = (data, showPastMatches) => {
    const today = new Date();
    const filteredData = data.filter((partido) => {
      const formattedDate = partido.fecha_partido
        .replace(
          /domingo, |lunes, |martes, |miércoles, |jueves, |viernes, |sábado, /,
          ""
        )
        .replace(/ de /g, " ")
        .replace(" a las", "");
      const partidoDate = new Date(formattedDate);
      return showPastMatches ? partidoDate < today : partidoDate >= today;
    });
    setData(filteredData);
  };

  const handleShowPastMatches = () => {
    setShowPastMatches(!showPastMatches);
    filterMatches(allData, !showPastMatches);
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
                  Partidos de la Chilean Premier League
                </h2>
                <button
                  onClick={handleShowPastMatches}
                  className="btn btn-danger bg-red text-white bold"
                >
                  {showPastMatches
                    ? "Ocultar Partidos Anteriores"
                    : "Mostrar Partidos Anteriores"}
                </button>
              </div>
              <div className="row mt-4">
                {data &&
                  data
                    .filter(
                      (partido) =>
                        new Date(
                          partido.fecha_partido
                            .replace(
                              /domingo, |lunes, |martes, |miércoles, |jueves, |viernes, |sábado, /,
                              ""
                            )
                            .replace(/ de /g, " ")
                            .replace(" a las", "")
                        ) >= new Date()
                    )
                    .map(
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
                {showPastMatches &&
                  data &&
                  data
                    .filter(
                      (partido) =>
                        new Date(
                          partido.fecha_partido
                            .replace(
                              /domingo, |lunes, |martes, |miércoles, |jueves, |viernes, |sábado, /,
                              ""
                            )
                            .replace(/ de /g, " ")
                            .replace(" a las", "")
                        ) < new Date()
                    )
                    .map(
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
