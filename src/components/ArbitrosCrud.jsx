import React, { useEffect, useState } from "react";
import { CreateArbitro } from "./CreateArbitro";
import { EditArbitro } from "./EditArbitro";
import { DeleteArbitro } from "./DeleteArbitro";

export const ArbitrosCrud = () => {
  const [arbitros, setArbitros] = useState(null);
  const [refresh, setRefresh] = useState(false);

  useEffect(() => {
    async function fetchArbitros() {
      const apiUrl = process.env.REACT_APP_API;

      let arbitros = await fetch(`${apiUrl}/arbitros`, {
        method: "GET",
      }).then((response) => response.json());

      setArbitros(arbitros);
    }

    fetchArbitros();
  }, [refresh]);

  return (
    <>
      <div className="row d-flex  gap-2 mt-2">
        <div className="arbitros-list mt-4">
          {arbitros &&
            arbitros.map((arbitro) => (
              <div
                className="red-text text-12 decoration-none medium text-center hover-bg-gray"
                key={arbitro.id_arbitro}
              >
                <div className="custom-border-type-crud">
                  <div className="row arbitro">
                    <div className="col-3 foto-arbitro">
                      <img src="images/Group.png" alt="Foto del arbitro" />
                    </div>
                    <div className="col-8 info-arbitro">
                      <div className="">
                        {arbitro.nombre_arbitro} {arbitro.apellido_arbitro}
                      </div>
                      <div className="semibold">{arbitro.edad} años</div>
                    </div>
                    <div className="col text-center">
                      <EditArbitro
                        arbitro={arbitro}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        arbitroFromGrid={arbitro}
                        className="cursor-pointer"
                      />
                      <DeleteArbitro
                        arbitro={arbitro}
                        setRefresh={setRefresh}
                        refresh={refresh}
                        className="cursor-pointer"
                      />
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <CreateArbitro setRefresh={setRefresh} refresh={refresh} />
    </>
  );
};
