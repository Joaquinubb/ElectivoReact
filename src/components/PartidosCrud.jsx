import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";
import { CreatePartido } from "./CreatePartido";
import { CardPartidoCrud } from "./CardPartidoCrud";
import { DeletePartido } from "./DeletePartido";
import { EditPartido } from "./EditPartido";

export const PartidosCrud = () => {
  const [partidos, setPartidos] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchPartidos() {
      const apiUrl = process.env.REACT_APP_API;

      let partidos = await fetch(`${apiUrl}/partidos`, {
        method: "GET",
      }).then((response) => response.json());

      setPartidos(partidos);
      console.log(partidos);
    }

    fetchPartidos();
  }, [refresh]);

  return (
    <>
      <div className="row d-flex  gap-2 mt-2">
        <div className="row">
          {partidos &&
            partidos.map(
              (partido) =>
                partido.id_partido && (
                  <div className="w-fit border-red-2 red-text text-16 align-items-center text-start rounded-3 mx-1 my-2 shadow-card hover-bg-gray">
                    <div className="row">
                      <div className="col-12">
                        <CardPartidoCrud
                          key={partido.id_partido}
                          id_partido={partido.id_partido}
                          fecha_partido={partido.fecha_partido}
                          club_local={partido.club_local}
                          club_visitante={partido.club_visitante}
                          arbitro={partido.arbitro}
                          estadio={partido.estadio}
                        />
                        <hr />
                      </div>
                    </div>
                    <div className="row">
                      <div className="text-center mb-1">
                        <EditPartido
                          partido={partido}
                          setRefresh={setRefresh}
                          refresh={refresh}
                          partidoFromGrid={partido}
                          className="cursor-pointer"
                        />
                        <DeletePartido
                          partido={partido}
                          setRefresh={setRefresh}
                          refresh={refresh}
                          className="cursor-pointer"
                        />
                      </div>
                    </div>
                  </div>
                )
            )}
          {!partidos && (
            <>
              <div className="w-100 d-flex justify-content-center">
                <ClipLoader color="#db1a33" />
              </div>
            </>
          )}
        </div>
      </div>
      <CreatePartido setRefresh={setRefresh} refresh={refresh} />
    </>
  );
};
