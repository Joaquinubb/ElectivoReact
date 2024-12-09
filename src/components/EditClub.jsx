import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const EditClub = ({ clubFromGrid, setRefresh, refresh }) => {
  const [club, setClub] = useState(clubFromGrid);

  useEffect(() => {
    async function fetchClubByName() {
      const apiUrl = process.env.REACT_APP_API;

      let fetchedClub = await fetch(
        `${apiUrl}/clubes/club?nombre=${club.nombre_club}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());

      setClub(fetchedClub);
    }

    fetchClubByName();
  }, [club.nombre_club]);
  useEffect(() => {
    setFormData({
      nombre_club: club.nombre_club,
      ciudad_club: club.ciudad_club,
      estadio_club: club.estadio_club,
      fechaFund_club: club.fechaFund_club,
      titulosPrimera_club: club.titulosPrimera_club,
      escudo_club: club.escudo_club,
    });
  }, [club]);

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

  const today = new Date().toISOString().split("T")[0];

  //VALIDACIONES
  const [, setImgIsCharged] = useState(false);
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
    // if (!imgIsCharged) newErrors.escudo_club = "La imagen no existe";

    if (!formData.fechaFund_club)
      newErrors.fechaFund_club = "Campo obligatorio";
    if (!formData.titulosPrimera_club && formData.titulosPrimera_club !== 0)
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
    event.preventDefault();
    setButtonIsClicked(true);
    setIsSubmitted(true);

    if (!validateForm()) {
      setButtonIsClicked(false);
      return;
    }

    const response = await fetch(
      process.env.REACT_APP_API +
        `/clubes/update?id=${club.id_club}&nombre_club=${formData.nombre_club}&ciudad_club=${formData.ciudad_club}&estadio_club=${formData.estadio_club}&fechaFund_club=${formData.fechaFund_club}T00:00:00Z&titulosPrimera_club=${formData.titulosPrimera_club}&escudo_club=${formData.escudo_club}`,
      {
        method: "PUT",
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      setButtonIsClicked(false);
      setRefresh(!refresh);
      document
        .querySelector(`#editClub${club.id_club} .btn[data-bs-dismiss="modal"]`)
        .click();
    } else {
      setErrorResponse(data.error);

      setButtonIsClicked(false);
    }
    setButtonIsClicked(false);
  };
  return (
    <>
      <button
        className="btn rounded-full p-0"
        data-bs-toggle="modal"
        data-bs-target={`#editClub${club.id_club}`}
      >
        <img src="/assets/edit.svg" alt="" />
      </button>

      <div
        className="modal fade"
        id={`editClub${club.id_club}`}
        tabIndex={-1}
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
              <h4 className="text-center bold">
                Editar club {club.nombre_club}
              </h4>
              <label className="semibold" htmlFor="nombre_club">
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
                max={today}
              />

              <div className="w-100 d-flex justify-content-center flex-column align-items-center">
                {!formData.escudo_club && (
                  <img
                    src="/assets/clubunknown.png"
                    alt="Imagen club"
                    width={85}
                    height={85}
                    className="bg-red carousel-image rounded-2 p-2"
                  />
                )}
                {formData.escudo_club && (
                  <img
                    src={formData.escudo_club}
                    alt="Imagen club"
                    width={85}
                    height={85}
                    className="bg-red carousel-image rounded-2 p-2"
                    onError={(e) => {
                      setImgIsCharged(false);
                      e.target.src = "/assets/imagenotfound.png";
                    }}
                    onLoad={(e) => {
                      setImgIsCharged(true);
                    }}
                  />
                )}
                <button
                  onClick={onSubmit}
                  className="bg-red text-blanco border-0 my-3 py-2 px-3 rounded-2"
                  disabled={buttonIsClicked}
                >
                  {buttonIsClicked && <ClipLoader color="#ffffff" />}
                  {!buttonIsClicked && "Confirmar"}
                </button>
                {errorResponse && (
                  <p className="red-text regular">{errorResponse}</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
