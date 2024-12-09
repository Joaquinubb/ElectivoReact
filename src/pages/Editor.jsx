import React from "react";
import { Header, Sidebar } from "../components";
import { ClubesCrud } from "../components/ClubesCrud";
import { PartidosCrud } from "../components/PartidosCrud";
import { ArbitrosCrud } from "../components/ArbitrosCrud";
import { JugadoresCrud } from "../components/JugadoresCrud";
import { useAuth } from "../AuthContext";

export const Editor = () => {
  const [dataType, setDataType] = React.useState("clubes");
  const { logout } = useAuth();

  return (
    <>
      <div className="container-fluid d-flex flex-column vh-100">
        <Header />
        <div className="row flex-grow-1">
          <div className="col-sidebar blue d-flex flex-column sidebar-container">
            <Sidebar />
          </div>
          <div className="col mt-5 pt-4 content-container">
            <div className="bg-white p-3">
              <h2 className="red-text bold text-20">
                Módulo de edición de datos
              </h2>
              <div className="secciones-edit d-flex justify-content-between">
                <div className="d-flex gap-2">
                  <p
                    onClick={() => setDataType("clubes")}
                    className={`m-0 text-16 red-text cursor-pointer  semibold  
                      ${dataType === "clubes" ? "switch-item-clicked" : ""}
                      `}
                  >
                    Clubes
                  </p>
                  <p
                    onClick={() => setDataType("jugadores")}
                    className={`m-0 text-16 red-text cursor-pointer semibold   
                      ${dataType === "jugadores" ? "switch-item-clicked" : ""}
                      `}
                  >
                    Jugadores
                  </p>
                  <p
                    onClick={() => setDataType("arbitros")}
                    className={`m-0 text-16 red-text cursor-pointer semibold   
                      ${dataType === "arbitros" ? "switch-item-clicked" : ""}
                      `}
                  >
                    Árbitros
                  </p>
                  <p
                    onClick={() => setDataType("partidos")}
                    className={`m-0 text-16 red-text cursor-pointer semibold   
                      ${dataType === "partidos" ? "switch-item-clicked" : ""}
                      `}
                  >
                    Partidos
                  </p>
                </div>
                <div className="logout-button">
                  <button className="btn btn-danger" onClick={logout}>Cerrar Sesión</button>
                </div>

              </div>
              

              {dataType === "clubes" && <ClubesCrud />}
              {dataType === "arbitros" && <ArbitrosCrud />}
              {dataType === "partidos" && <PartidosCrud />}
              {dataType === "jugadores" && <JugadoresCrud />}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
