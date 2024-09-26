import React, { useState } from "react";

export const DeletePartido = ({ partido, setRefresh, refresh }) => {
  const id = partido.id_partido;
  const [error, setError] = useState(null);

  const deletePartido = async () => {
    const apiUrl = process.env.REACT_APP_API;
    try {
      const response = await fetch(`${apiUrl}/partidos?id_partido=${id}`, {
        method: "DELETE",
      });
      if (response.ok) {
        setRefresh(!refresh);
        document
          .querySelector(`#delete${id} .btn[data-bs-dismiss="modal"]`)
          .click();
      } else {
        setError("Error al borrar el partido");
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <>
      <button
        className="btn rounded-full p-0"
        data-bs-toggle="modal"
        data-bs-target={`#delete${id}`}
      >
        <img src="/assets/delete.svg" alt="" />
      </button>
      <div
        className="modal fade"
        id={`delete${id}`}
        tabIndex={-1}
        aria-hidden="true"
      >
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content red-text border-red-2">
            <div className=" d-flex justify-content-end">
              <button className="btn px-3" data-bs-dismiss="modal">
                <svg
                  width="17"
                  height="17"
                  viewBox="0 0 17 17"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M1.6189 0C1.20482 0 0.789893 0.158211 0.474179 0.47433C-0.15806 1.10657 -0.15806 2.13153 0.474179 2.76376L6.21041 8.5L0.474179 14.2362C-0.15806 14.8685 -0.15806 15.8934 0.474179 16.5257C0.789893 16.8414 1.20482 17 1.6189 17C2.03297 17 2.4479 16.8418 2.76361 16.5257L8.49985 10.7894L14.2361 16.5257C14.8675 17.1579 15.8937 17.1579 16.5255 16.5257C17.1582 15.893 17.1582 14.8689 16.5255 14.2362L10.7893 8.5L16.5255 2.76376C17.1578 2.13153 17.1578 1.10657 16.5255 0.47433C15.8941 -0.157503 14.8675 -0.157908 14.2361 0.47433L8.49985 6.21057L2.76361 0.47433C2.4479 0.158616 2.03297 0 1.6189 0Z"
                    fill="#DB1A33"
                  />
                </svg>
              </button>
            </div>
            <div className="d-flex flex-column w-100 px-3">
              <p className="text-center bold text-20">
                ¿Está seguro que desea borrar el partido?
              </p>
              <div className="w-100 d-md-flex justify-content-between mb-3">
                <button
                  data-bs-dismiss="modal"
                  className="btn
                border-red-2 rounded-3 semibold red-text"
                >
                  Cancelar
                </button>
                <button
                  onClick={deletePartido}
                  data-bs-dismiss="modal"
                  className="btn
                border-red-2 bg-red rounded-3 semibold text-blanco"
                >
                  Confirmar y Eliminar
                </button>
              </div>
              {error && <p className="text-center regular red-text">{error}</p>}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
