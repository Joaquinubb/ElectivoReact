import React, { useEffect, useState } from "react";
import { DeletePartido } from "./DeletePartido";

export function CardPartidoCrud({
  id_partido,
  fecha_partido,
  club_local,
  club_visitante,
  arbitro,
  estadio,
}) {
  const [escudoLocal, setEscudoLocal] = useState("");
  const [escudoVisitante, setEscudoVisitante] = useState("");
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    // Assuming you have an API endpoint to fetch the club details
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
  }, [club_local, club_visitante, refresh]);

  return (
    <>
      <button
        className="col-md-4 w-fit border-red-2 red-text text-16 d-flex align-items-center text-start rounded-3 mx-2 my-2 shadow-card hover-bg-gray"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#partido${id_partido}`}
      >
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
      </button>

      <div
        className="modal fade"
        id={`partido${id_partido}`}
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content ps-5 red-text border-red-2">
            <div className=" d-flex justify-content-end">
              <button className="btn px-3" data-bs-dismiss="modal">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.6189 0C1.20482 0 0.789893 0.158211 0.474179 0.47433C-0.15806 1.10657 -0.15806 2.13153 0.474179 2.76376L6.21041 8.5L0.474179 14.2362C-0.15806 14.8685 -0.15806 15.8934 0.474179 16.5257C0.789893 16.8414 1.20482 17 1.6189 17C2.03297 17 2.4479 16.8418 2.76361 16.5257L8.49985 10.7894L14.2361 16.5257C14.8675 17.1579 15.8937 17.1579 16.5255 16.5257C17.1582 15.893 17.1582 14.8689 16.5255 14.2362L10.7893 8.5L16.5255 2.76376C17.1578 2.13153 17.1578 1.10657 16.5255 0.47433C15.8941 -0.157503 14.8675 -0.157908 14.2361 0.47433L8.49985 6.21057L2.76361 0.47433C2.4479 0.158616 2.03297 0 1.6189 0Z"
                    fill="#DB1A33"
                  />
                </svg>
              </button>
            </div>
            <div className="text-center mb-3 me-5">
              <p className="bold text-16">{`${club_local}   VS   ${club_visitante}`}</p>
            </div>
            <div className="row text-center me-1">
              <div className="col-5 text-end">
                <img
                  src={escudoLocal}
                  width={60}
                  height={60}
                  alt={`${club_local}`}
                />
              </div>

              <div className="col-4">
                <img
                  src={escudoVisitante}
                  width={60}
                  height={60}
                  alt={`${club_visitante}`}
                />
              </div>
            </div>
            <div className="row mt-3">
              <p className=" text-16 m-0 medium">Estadio {`${estadio}`}</p>
              <p className=" text-16 m-0 medium">Árbitro: {`${arbitro}`}</p>
              <p className=" text-16 m-0 medium mb-4">{`${fecha_partido}`}</p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
