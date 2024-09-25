import React from "react";
import { Header, Sidebar } from "../components";
import { ClubesCrud } from "../components/ClubesCrud";

export const Editor = () => {
  const [dataType, setDataType] = React.useState("clubes");
  console.log(dataType);

  return (
    <>
      <div className="container-fluid d-flex flex-column vh-100">
        <Header />
        <div className="row flex-grow-1">
          <div className="col-2 blue d-flex flex-column sidebar-container">
            <Sidebar />
          </div>
          <div className="col mt-5 pt-4 content-container">
            <div className="bg-white p-3">
              <h2 className="red-text bold text-20">
                Módulo de edición de datos
              </h2>
              <div className="d-flex  gap-2">
                <p
                  onClick={() => setDataType("clubes")}
                  className={`m-0 text-16 red-text semibold  
                    ${dataType === "clubes" ? "switch-item-clicked" : ""}
                    `}
                >
                  Clubes
                </p>
                <p
                  onClick={() => setDataType("jugadores")}
                  className={`m-0 text-16 red-text semibold   
                    ${dataType === "jugadores" ? "switch-item-clicked" : ""}
                    `}
                >
                  Jugadores
                </p>
                <p
                  onClick={() => setDataType("arbitros")}
                  className={`m-0 text-16 red-text semibold   
                    ${dataType === "arbitros" ? "switch-item-clicked" : ""}
                    `}
                >
                  Arbitros
                </p>
              </div>

              {dataType === "clubes" && <ClubesCrud />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
