import React, { useEffect, useState } from "react";
import { CreateClub } from "./CreateClub";

export const ClubesCrud = () => {
  const [clubes, setClubes] = useState(null);

  useEffect(() => {
    async function fetchClubes() {
      const apiUrl = process.env.REACT_APP_API;

      let clubes = await fetch(`${apiUrl}/clubes`, {
        method: "GET",
      }).then((response) => response.json());

      setClubes(clubes);
      console.log(clubes);
    }

    fetchClubes();
  }, []);

  return (
    <>
      <div className="row d-flex  gap-2 mt-2">
        {clubes &&
          clubes.map((club) => (
            <div
              className="border-red-2 w-fit p-2 red-text rounded-4 shadow-card hover-bg-gray"
              to={`/clubes/${club.nombre_club}`}
              key={club.id_club}
            >
              <div className="d-flex flex-column align-items-center">
                <div>
                  <img
                    src={`${club.escudo_club}`}
                    alt="Escudo"
                    height={30}
                    className="mb-1"
                  />
                </div>
                <div className="">{club.nombre_club}</div>
              </div>
            </div>
          ))}
      </div>
      <CreateClub />
    </>
  );
};
