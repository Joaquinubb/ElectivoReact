import React, { useEffect, useState } from "react";
import { CreateClub } from "./CreateClub";
import { ClipLoader } from "react-spinners";
import { EditClub } from "./EditClub";
import { DeleteClub } from "./DeleteClub";

export const ClubesCrud = () => {
  const [clubes, setClubes] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchClubes() {
      const apiUrl = process.env.REACT_APP_API;

      let clubes = await fetch(`${apiUrl}/clubes`, {
        method: "GET",
      }).then((response) => response.json());

      setClubes(clubes);
    }

    fetchClubes();
  }, [refresh]);

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
                <div className="">
                  <img
                    src={`${club.escudo_club}`}
                    alt="Escudo"
                    height={50}
                    className="mb-1"
                  />
                </div>
                <div className="">{club.nombre_club}</div>
              </div>
              <div className="w-100 d-flex gap-5 justify-content-between">
                <EditClub
                  club={club}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  clubFromGrid={club}
                  className="cursor-pointer"
                />
                <DeleteClub
                  club={club}
                  setRefresh={setRefresh}
                  refresh={refresh}
                  className="cursor-pointer"
                />
              </div>
            </div>
          ))}
        {!clubes && (
          <>
            <div className="w-100 d-flex justify-content-center">
              <ClipLoader color="#db1a33" />
            </div>
          </>
        )}
      </div>
      <CreateClub setRefresh={setRefresh} refresh={refresh} />
    </>
  );
};
