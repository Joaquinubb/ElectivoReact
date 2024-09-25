import React, { useEffect, useState } from "react";
import { CardPartido } from "./CardPartido";
import { CreateArbitro } from "./CreateArbitro";

export const ArbitrosCrud = () => {
  const [arbitros, setArbitros] = useState(null);

  useEffect(() => {
    async function fetchArbitros() {
      const apiUrl = process.env.REACT_APP_API;

      let arbitros = await fetch(`${apiUrl}/arbitros`, {
        method: "GET",
      }).then((response) => response.json());

      setArbitros(arbitros);
    }

    fetchArbitros();
  }, []);

  return (
    <>
      <div className="row d-flex  gap-2 mt-2">
        <div className="arbitros-list mt-4">
          {arbitros &&
            arbitros.map((arbitro) => (
              <div
                className="red-text text-12 decoration-none medium text-center"
                key={arbitro.id_arbitro}
              >
                <div className="custom-border-type-arbitro">
                  <div className="arbitro">
                    <div className="foto-arbitro">
                      <img src="images/Group.png" alt="Foto del arbitro" />
                    </div>
                    <div className="info-arbitro">
                      <div className="">
                        {arbitro.nombre_arbitro} {arbitro.apellido_arbitro}
                      </div>
                      <div className="semibold">{arbitro.edad} años</div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
        </div>
      </div>
      <CreateArbitro />
    </>
  );
};
