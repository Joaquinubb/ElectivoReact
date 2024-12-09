import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Header, Sidebar } from "../components/index";
import { CardPartido } from "../components/CardPartido";
import { CardPartidoAnterior } from "../components/CardPartidoAnterior";

export function Partidos() {
  const [allData, setAllData] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [showPastMatches, setShowPastMatches] = useState(false);

  const filterMatches = useCallback(
    (data, showPastMatches) => {
      const today = new Date();
      const upcoming = data.filter((partido) => {
        const partidoDate = parseDate(partido.fecha_partido);
        return partidoDate >= today;
      });

      const past = data.filter((partido) => {
        const partidoDate = parseDate(partido.fecha_partido);
        return partidoDate < today;
      });

      setUpcomingMatches(upcoming);
      setPastMatches(showPastMatches ? past : []);
    },
    [] // No es necesario incluir dependencias
  );

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
  }, [filterMatches, showPastMatches]);

  const parseDate = (fecha) => {
    const [, day, month, year, time] = fecha
      .replace(/,/g, "")
      .replace(/ de /g, " ")
      .replace(" a las", "")
      .split(" ");
    const months = {
      enero: "January",
      febrero: "February",
      marzo: "March",
      abril: "April",
      mayo: "May",
      junio: "June",
      julio: "July",
      agosto: "August",
      septiembre: "September",
      octubre: "October",
      noviembre: "November",
      diciembre: "December",
    };
    return new Date(`${months[month]} ${day}, ${year} ${time}`);
  };

  const handleShowPastMatches = () => {
    setShowPastMatches(!showPastMatches);
    filterMatches(allData, !showPastMatches);
  };

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
                {upcomingMatches &&
                  upcomingMatches.map((partido) => (
                    <CardPartido
                      key={partido.id_partido}
                      id_partido={partido.id_partido}
                      fecha_partido={partido.fecha_partido}
                      club_local={partido.club_local}
                      club_visitante={partido.club_visitante}
                      arbitro={partido.arbitro}
                      estadio={partido.estadio}
                    />
                  ))}
              </div>
              {showPastMatches && pastMatches.length > 0 && (
                <div className="mt-5">
                  <h2 className="red-text bold text-16">Partidos Anteriores</h2>
                  <div className="row mt-4">
                    {pastMatches.map((partido) => (
                      <CardPartidoAnterior
                        key={partido.id_partido}
                        id_partido={partido.id_partido}
                        fecha_partido={partido.fecha_partido}
                        club_local={partido.club_local}
                        club_visitante={partido.club_visitante}
                        arbitro={partido.arbitro}
                        estadio={partido.estadio}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
