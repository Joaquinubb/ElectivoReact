import React, { useState } from "react";

export const CreateClub = () => {
  //MANIPULACION DE LOS DATOS DEL FORMULARIO
  const [formData, setFormData] = useState({
    nombre_club: "",
    ciudad_club: "",
    estadio_club: "",
    fechaFund_club: "",
    titulosPrimera_club: "",
    escudo_club: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    if (name === "fechaFund_club") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  //VALIDACIONES
  const [errors, setErrors] = useState({
    nombre_club: "",
    ciudad_club: "",
    estadio_club: "",
    fechaFund_club: "",
    titulosPrimera_club: "",
    escudo_club: "",
  });

  const validateForm = () => {
    const newErrors = {
      nombre_club: "",
      ciudad_club: "",
      estadio_club: "",
      fechaFund_club: "",
      titulosPrimera_club: "",
      escudo_club: "",
    };
    if (!formData.nombre_club) newErrors.nombre_club = "Campo obligatorio";
    if (!formData.ciudad_club) newErrors.ciudad_club = "Campo obligatorio";
    if (!formData.escudo_club) newErrors.escudo_club = "Campo obligatorio";
    if (!formData.fechaFund_club)
      newErrors.fechaFund_club = "Campo obligatorio";
    if (!formData.titulosPrimera_club)
      newErrors.titulosPrimera_club = "Campo obligatorio";
    if (!formData.estadio_club) newErrors.estadio_club = "Campo obligatorio";
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error !== "");
  };

  //ESTADO DEL FORMULARIO
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [buttonIsClicked, setButtonIsClicked] = useState(false);

  //REQUEST A LA API
  const [errorResponse, setErrorResponse] = useState("");

  const onSubmit = async (event) => {
    console.log("submit", formData);

    event.preventDefault();
    setButtonIsClicked(true);
    setIsSubmitted(true);
    console.log("formData", formData);

    if (!validateForm()) {
      setButtonIsClicked(false);
      return;
    }
    console.log(formData);

    const response = await fetch(
      process.env.REACT_APP_API +
        `/clubes?nombre_club=${formData.nombre_club}&ciudad_club=${formData.ciudad_club}&estadio_club=${formData.estadio_club}&fechaFund_club=${formData.fechaFund_club}T00:00:00Z&titulosPrimera_club=${formData.titulosPrimera_club}&escudo_club=${formData.escudo_club}`,
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      setButtonIsClicked(false);
      window.location.reload();
    } else {
      setErrorResponse(data.error);

      console.error("Error editing user:", errorResponse);
      setButtonIsClicked(false);
    }
    setButtonIsClicked(false);
  };

  return (
    <>
      <button
        data-bs-toggle="modal"
        data-bs-target="#crearClub"
        className="btn custom-border-btn bg-red text-blanco fixed-right-bottom d-flex align-items-center gap-2"
      >
        <svg
          width="20"
          height="20"
          viewBox="0 0 20 20"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 15H11V11H15V9H11V5H9V9H5V11H9V15ZM10 20C8.61667 20 7.31667 19.7375 6.1 19.2125C4.88333 18.6875 3.825 17.975 2.925 17.075C2.025 16.175 1.3125 15.1167 0.7875 13.9C0.2625 12.6833 0 11.3833 0 10C0 8.61667 0.2625 7.31667 0.7875 6.1C1.3125 4.88333 2.025 3.825 2.925 2.925C3.825 2.025 4.88333 1.3125 6.1 0.7875C7.31667 0.2625 8.61667 0 10 0C11.3833 0 12.6833 0.2625 13.9 0.7875C15.1167 1.3125 16.175 2.025 17.075 2.925C17.975 3.825 18.6875 4.88333 19.2125 6.1C19.7375 7.31667 20 8.61667 20 10C20 11.3833 19.7375 12.6833 19.2125 13.9C18.6875 15.1167 17.975 16.175 17.075 17.075C16.175 17.975 15.1167 18.6875 13.9 19.2125C12.6833 19.7375 11.3833 20 10 20ZM10 18C12.2333 18 14.125 17.225 15.675 15.675C17.225 14.125 18 12.2333 18 10C18 7.76667 17.225 5.875 15.675 4.325C14.125 2.775 12.2333 2 10 2C7.76667 2 5.875 2.775 4.325 4.325C2.775 5.875 2 7.76667 2 10C2 12.2333 2.775 14.125 4.325 15.675C5.875 17.225 7.76667 18 10 18Z"
            fill="#EAE8E0"
          />
        </svg>
        Añadir Club
      </button>

      <div
        className="modal fade"
        id="crearClub"
        tabindex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
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
              <h4 className="text-center bold">Crear club</h4>
              <label className="semibold " htmlFor="nombre_club">
                Nombre del Club*
                {isSubmitted && errors.nombre_club && (
                  <span className="ms-2 regular">{errors.nombre_club}</span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.nombre_club}
                id="nombre_club"
                name="nombre_club"
                type="text"
                className="border-red-2 rounded-2 red-text shadow-card mb-2"
              />
              <label className="semibold" htmlFor="estadio_club">
                Estadio*
                {isSubmitted && errors.estadio_club && (
                  <span className="ms-2 regular">{errors.estadio_club}</span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.estadio_club}
                id="estadio_club"
                name="estadio_club"
                type="text"
                className="border-red-2 rounded-2 red-text shadow-card mb-2"
              />
              <label className="semibold" htmlFor="ciudad_club">
                Ciudad*
                {isSubmitted && errors.ciudad_club && (
                  <span className="ms-2 regular">{errors.ciudad_club}</span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.ciudad_club}
                id="ciudad_club"
                name="ciudad_club"
                type="text"
                className="border-red-2 rounded-2 red-text shadow-card mb-2"
              />
              <label className="semibold" htmlFor="titulosPrimera_club">
                Títulos en primera división*{" "}
                {isSubmitted && errors.titulosPrimera_club && (
                  <span className="ms-2 regular">
                    {errors.titulosPrimera_club}
                  </span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.titulosPrimera_club}
                id="titulosPrimera_club"
                name="titulosPrimera_club"
                type="text"
                className="border-red-2 rounded-2 red-text shadow-card mb-2"
              />
              <label className="semibold" htmlFor="escudo_club">
                Link de la imagen del escudo*{" "}
                {isSubmitted && errors.escudo_club && (
                  <span className="ms-2 regular">{errors.escudo_club}</span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.escudo_club}
                id="escudo_club"
                name="escudo_club"
                type="text"
                className="border-red-2 rounded-2 red-text shadow-card mb-2"
              />
              <label className="semibold" htmlFor="fechaFund_club">
                Fecha fundación*
                {isSubmitted && errors.fechaFund_club && (
                  <span className="ms-2 regular">{errors.fechaFund_club}</span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.fechaFund_club}
                id="fechaFund_club"
                name="fechaFund_club"
                type="date"
                className="border-red-2 rounded-2 red-text shadow-card mb-2"
              />
              <div className="w-100 d-flex justify-content-center align-items-center">
                <button
                  onClick={onSubmit}
                  className="bg-red text-blanco border-0 my-3 py-2 px-3 rounded-2"
                >
                  Confirmar
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
