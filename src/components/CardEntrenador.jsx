import React, { useState, useEffect } from "react";

export const CardEntrenador = ({
  id_entrenador,
  nombre_entrenador,
  apellido_entrenador,
  club_entrenador,
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
  console.log(infoAdicional);

  return (
    <>
      <button
        className="col-md-4 w-fit border-red-2 red-text text-16 d-flex align-items-center text-start rounded-3 mx-2 my-2 shadow-card "
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#entrenador${id_entrenador}`}
      >
        <img width={40} height={40} src="images/Group.png" alt="" />{" "}
        <div className="ms-2">
          <p className="m-0">
            {nombre_entrenador} {apellido_entrenador}
          </p>
          <p className="m-0 bold">{club_entrenador}</p>
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
                <div className="d-flex align-items-center flex-column">
                  <img
                    className="my-4"
                    src={`images/${infoAdicional[0].nacionalidad_entrenador}.png`}
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
