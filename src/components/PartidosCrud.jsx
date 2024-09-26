import React, { useEffect, useState } from "react";
import { CreatePartido } from "./CreatePartido";
import { CardPartidoCrud } from "./CardPartidoCrud";
import { DeletePartido } from "./DeletePartido";

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
                  <div className="col-2-5">
                    <CardPartidoCrud
                      key={partido.id_partido}
                      id_partido={partido.id_partido}
                      fecha_partido={partido.fecha_partido}
                      club_local={partido.club_local}
                      club_visitante={partido.club_visitante}
                      arbitro={partido.arbitro}
                      estadio={partido.estadio}
                    />

                    <div className="col text-center me-5">
                      {/*           <EditArbitro
                      club={arbitro}
                      setRefresh={setRefresh}
                      refresh={refresh}
                      clubFromGrid={arbitro}
                      className="cursor-pointer"
                    /> */}
                      <button className="cursor-pointer">
                        <img src="/assets/edit.svg" alt="" />
                      </button>
                      <DeletePartido
                        partido={partido}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                )
            )}
        </div>
      </div>
      <CreatePartido />
    </>
  );
};
