import React, { useEffect, useState } from "react";
import { CreatePartido } from "./CreatePartido";
import { CardPartido } from "./CardPartido";

export const PartidosCrud = () => {
  const [partidos, setPartidos] = useState(null);

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
  }, []);

  return (
    <>
      <div className="row d-flex  gap-2 mt-2">
        <div className="row">
          {partidos &&
            partidos.map(
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
      <CreatePartido />
    </>
  );
};
