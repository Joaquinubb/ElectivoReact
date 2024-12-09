import React, { useEffect, useState } from "react";

export function CardPartidoAnterior({
  id_partido,
  fecha_partido,
  club_local,
  club_visitante,
  arbitro,
  estadio,
}) {
  const [escudoLocal, setEscudoLocal] = useState("");
  const [escudoVisitante, setEscudoVisitante] = useState("");

  useEffect(() => {
    const fetchClubDetails = async (clubName, setEscudo) => {
      const apiUrl = process.env.REACT_APP_API;
      try {
        const response = await fetch(
          `${apiUrl}/clubes/club?nombre=${clubName}`
        );
        const data = await response.json();
        setEscudo(data.escudo_club);
      } catch (error) {
        console.error("Error fetching club details:", error);
      }
    };

    fetchClubDetails(club_local, setEscudoLocal);
    fetchClubDetails(club_visitante, setEscudoVisitante);
  }, [club_local, club_visitante, estadio]);

  const mapContainerStyle = {
    width: "90%",
    height: "400px",
  };

  return (
    <>
      <div className="col-md-4 w-fit border-red-2 red-text text-16 rounded-3 mx-1 my-2 shadow-card hover-bg-gray card-fixed-size">
        <div className="row mt-2 mb-2">
          <div className="col">
            <img
              width={50}
              height={50}
              src={escudoLocal}
              alt={`${club_local} escudo`}
            />
          </div>
          <div className="col">
            <p className="mt-3 bold">vs</p>
          </div>
          <div className="col">
            <img
              width={50}
              height={50}
              src={escudoVisitante}
              alt={`${club_visitante} escudo`}
            />
          </div>
        </div>
        <div className="row">
          <p className="text-12 my-2 medium">{`${fecha_partido}`}</p>
        </div>
      </div>
    </>
  );
}
