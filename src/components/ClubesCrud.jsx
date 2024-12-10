// src/components/ClubesCrud.jsx
import React, { useContext, useState } from "react";
import { ClubesContext } from "../contexts/ClubesContext";
import { CreateClub } from "./CreateClub";
import { EditClub } from "./EditClub";
import { DeleteClub } from "./DeleteClub";
import { ClipLoader } from "react-spinners";

export const ClubesCrud = () => {
  const { clubes, loading, error } = useContext(ClubesContext);
  const [refresh, setRefresh] = useState(false);

  if (loading) {
    return (
      <div className="w-100 d-flex justify-content-center mt-4">
        <ClipLoader color="#db1a33" />
      </div>
    );
  }

  if (error) {
    return <div className="text-center text-danger mt-4">{error}</div>;
  }

  return (
    <>
      <div className="row d-flex gap-2 mt-2">
        {clubes.length > 0 ? (
          clubes.map((club) => (
            <div
              className="border-red-2 custom-box-crud-clubes p-2 red-text rounded-4 shadow-card hover-bg-gray"
              key={club.id_club}
            >
              <div className="d-flex flex-column align-items-center">
                <img
                  src={`${club.escudo_club}`}
                  alt="Escudo"
                  height={50}
                  className="mb-1"
                />
                <div>{club.nombre_club}</div>
              </div>
              <div className="w-100 d-flex gap-5 justify-content-between mt-2">
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
          ))
        ) : (
          <div className="text-center mt-4">No se encontraron clubes.</div>
        )}
      </div>
      <CreateClub setRefresh={setRefresh} refresh={refresh} />
    </>
  );
};
