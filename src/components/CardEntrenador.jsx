import React, { useState, useEffect } from "react";

export const CardEntrenador = ({
  id_entrenador,
  nombre_entrenador,
  apellido_entrenador,
  club_entrenador,
  escudo_club,
}) => {
  const [infoAdicional, setInfoAdicional] = useState(null);

  useEffect(() => {
    const modal = document.getElementById(`entrenador${id_entrenador}`);
    const handleShow = async () => {
      const apiUrl = process.env.REACT_APP_API;
      const response = await fetch(
        `${apiUrl}/entrenadores/entrenador?apellido=${apellido_entrenador}`
      );
      const data = await response.json();
      setInfoAdicional(data);
    };

    modal.addEventListener("show.bs.modal", handleShow);

    return () => {
      modal.removeEventListener("show.bs.modal", handleShow);
    };
  }, [id_entrenador, apellido_entrenador]);

  return (
    <>
      <button
        className="custom-border-type-entrenador m-1 red-text text-12 decoration-none medium text-center shadow-card hover-bg-gray"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#entrenador${id_entrenador}`}
      >
        <div className="entrenador">
          <div className="foto-entrenador">
            <img
              src="/images/Group.png"
              alt={`Foto de ${nombre_entrenador} ${apellido_entrenador}`}
              width={40}
              height={40}
            />
          </div>
          <div className="info-entrenador">
            <div className="">
              {nombre_entrenador} {apellido_entrenador}
            </div>
            <div className="semibold">{club_entrenador}</div>
          </div>
        </div>
      </button>

      <div
        className="modal fade"
        id={`entrenador${id_entrenador}`}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content ps-5 red-text border-red-2">
            <div className="d-flex justify-content-end">
              <button className="btn px-3" data-bs-dismiss="modal">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* SVG content */}
                </svg>
              </button>
            </div>
            <div className="d-flex align-items-center flex-column">
              <img
                src={"images/unknown150150.png"}
                width={150}
                height={150}
                alt={`${nombre_entrenador} ${apellido_entrenador}`}
              />
            </div>
            {infoAdicional ? (
              <div>
                <p className="bold text-16 m-0">{`${nombre_entrenador} ${apellido_entrenador}`}</p>
                <p className=" text-16 m-0 medium">{`${club_entrenador}`}</p>
                <p className=" text-16 m-0 medium">{`${infoAdicional[0].edad} Años`}</p>
                <p className=" text-16 m-0 medium">{`${infoAdicional[0].fechaNac_entrenador}`}</p>
                <img
                  src={escudo_club}
                  alt={`Escudo ${escudo_club}`}
                  width={40}
                />
                <div className="d-flex align-items-center flex-column">
                  <img
                    className="my-4"
                    src={`images/${infoAdicional[0].nacionalidad_entrenador}.png`.toLowerCase()}
                    width={100}
                    height={100}
                    alt={`${infoAdicional[0].nacionalidad_entrenador}`}
                  />
                </div>
              </div>
            ) : (
              <p>Cargando información...</p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};
