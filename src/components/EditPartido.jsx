import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const EditPartido = ({ partidoFromGrid, setRefresh, refresh }) => {
  const [partido, setPartido] = useState(partidoFromGrid);
  //MANIPULACION DE LOS DATOS DEL FORMULARIO
  useEffect(() => {
    async function fetchArbitro() {
      const apiUrl = process.env.REACT_APP_API;

      let fetchedPartido = await fetch(
        `${apiUrl}/arbitros/${arbitro.id_arbitro}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());

      setPartido(fetchedPartido);
    }

    fetchArbitro();
  }, []);

  useEffect(() => {
    setFormData({
      nombre_arbitro: arbitro.nombre_arbitro,
      apellido_arbitro: arbitro.apellido_arbitro,
      fechaNac_arbitro: arbitro.fechaNac_arbitro,
    });
  }, [arbitro]);

  const [formData, setFormData] = useState({
    nombre_arbitro: "",
    apellido_arbitro: "",
    fechaNac_arbitro: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  //VALIDACIONES
  const [errors, setErrors] = useState({
    nombre_arbitro: "",
    apellido_arbitro: "",
    fechaNac_arbitro: "",
  });

  const validateForm = () => {
    const newErrors = {
      nombre_arbitro: "",
      apellido_arbitro: "",
      fechaNac_arbitro: "",
    };
    if (!formData.nombre_arbitro)
      newErrors.nombre_arbitro = "Campo obligatorio";
    if (!formData.apellido_arbitro)
      newErrors.apellido_arbitro = "Campo obligatorio";
    if (!formData.fechaNac_arbitro)
      newErrors.fechaNac_arbitro = "Campo obligatorio";
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
        `/arbitros/${arbitro.id_arbitro}?nombre_arbitro=${formData.nombre_arbitro}&apellido_arbitro=${formData.apellido_arbitro}&fechaNac_arbitro=${formData.fechaNac_arbitro}T00:00:00Z`,
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
        .querySelector(
          `#editArbitro${arbitro.id_arbitro} .btn[data-bs-dismiss="modal"]`
        )
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
        data-bs-target={`#editArbitro${arbitro.id_arbitro}`}
      >
        <img src="/assets/edit.svg" alt="" />
      </button>

      <div
        className="modal fade"
        id={`editArbitro${arbitro.id_arbitro}`}
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
              <h4 className="text-center bold">Editar Árbitro</h4>
              <label className="semibold " htmlFor="nombre_arbitro">
                Nombre*
                {isSubmitted && errors.nombre_arbitro && (
                  <span className="ms-2 regular">{errors.nombre_arbitro}</span>
                )}
              </label>
              <input
                name="nombre_arbitro"
                id="nombre_arbitro"
                value={formData.nombre_arbitro}
                type="text"
                onChange={handleChange}
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              ></input>
              <label className="semibold " htmlFor="apellido_arbitro">
                Apellido*
                {isSubmitted && errors.apellido_arbitro && (
                  <span className="ms-2 regular">
                    {errors.apellido_arbitro}
                  </span>
                )}
              </label>
              <input
                name="apellido_arbitro"
                id="apellido_arbitro"
                value={formData.apellido_arbitro}
                type="text"
                onChange={handleChange}
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              ></input>
              <label className="semibold" htmlFor="fechaNac_arbitro">
                Fecha de Nacimiento*
                {isSubmitted && errors.fechaNac_arbitro && (
                  <span className="ms-2 regular">
                    {errors.fechaNac_arbitro}
                  </span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.fechaNac_arbitro}
                id="fechaNac_arbitro"
                name="fechaNac_arbitro"
                type="date"
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              />
              <div className="w-100 d-flex justify-content-center align-items-center">
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
