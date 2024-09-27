import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const CreatePartido = ({ setRefresh, refresh }) => {
  //MANIPULACION DE LOS DATOS DEL FORMULARIO
  const [formData, setFormData] = useState({
    fecha_partido: "",
    idLocal_partido: "",
    idVisita_partido: "",
    idArbitro_partido: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  //VALIDACIONES
  const [errors, setErrors] = useState({
    fecha_partido: "",
    idLocal_partido: "",
    idVisita_partido: "",
    idArbitro_partido: "",
  });

  const validateForm = () => {
    const newErrors = {
      fecha_partido: "",
      idLocal_partido: "",
      idVisita_partido: "",
      idArbitro_partido: "",
    };
    if (!formData.fecha_partido) newErrors.fecha_partido = "Campo obligatorio";
    if (!formData.idLocal_partido)
      newErrors.idLocal_partido = "Campo obligatorio";
    if (!formData.idVisita_partido)
      newErrors.idVisita_partido = "Campo obligatorio";
    if (!formData.idArbitro_partido)
      newErrors.idArbitro_partido = "Campo obligatorio";
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
        `/partidos?fecha_partido=${formData.fecha_partido}:00Z&idLocal_partido=${formData.idLocal_partido}&idVisita_partido=${formData.idVisita_partido}&idArbitro_partido=${formData.idArbitro_partido}`,
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      setButtonIsClicked(false);
      setRefresh(!refresh);
      document
        .querySelector(`#crearPartido .btn[data-bs-dismiss="modal"]`)
        .click();
    } else {
      setErrorResponse(data.error);

      console.error("Error editing user:", errorResponse);
      setButtonIsClicked(false);
    }
    setButtonIsClicked(false);
  };
  // Obtener la lista de clubes
  const [clubes, setClubes] = useState([]);
  useEffect(() => {
    const fetchClubes = async () => {
      const apiUrl = process.env.REACT_APP_API;
      const response = await fetch(`${apiUrl}/clubes`);
      const data = await response.json();
      setClubes(data);
    };

    fetchClubes();
  }, []);
  const [arbitros, setArbitros] = useState([]);
  useEffect(() => {
    const fetchArbitros = async () => {
      const apiUrl = process.env.REACT_APP_API;
      const response = await fetch(`${apiUrl}/arbitros`);
      const data = await response.json();
      setArbitros(data);
    };

    fetchArbitros();
  }, []);

  return (
    <>
      <button
        data-bs-toggle="modal"
        data-bs-target="#crearPartido"
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
        Añadir Partido
      </button>

      <div
        className="modal fade"
        id="crearPartido"
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
              <h4 className="text-center bold">Crear Partido</h4>
              <label className="semibold " htmlFor="idLocal_partido">
                Club Local*
                {isSubmitted && errors.idLocal_partido && (
                  <span className="ms-2 regular">{errors.idLocal_partido}</span>
                )}
              </label>
              <select
                name="idLocal_partido"
                value={formData.idLocal_partido}
                onChange={handleChange}
                className="form-select border-red-2 rounded-2 red-text shadow-card mb-2"
              >
                <option value="">Seleccione un club</option>
                {clubes.map((club) => (
                  <option key={club.id_club} value={club.id_club}>
                    {club.nombre_club}
                  </option>
                ))}
              </select>
              <label className="semibold " htmlFor="idVisita_partido">
                Club Visitante*
                {isSubmitted && errors.idVisita_partido && (
                  <span className="ms-2 regular">
                    {errors.idVisita_partido}
                  </span>
                )}
              </label>
              <select
                name="idVisita_partido"
                value={formData.idVisita_partido}
                onChange={handleChange}
                className="form-select border-red-2 rounded-2 red-text shadow-card mb-2"
              >
                <option value="">Seleccione un club</option>
                {clubes.map((club) => (
                  <option key={club.id_club} value={club.id_club}>
                    {club.nombre_club}
                  </option>
                ))}
              </select>
              <label className="semibold" htmlFor="idArbitro_partido">
                Árbitro*
                {isSubmitted && errors.idArbitro_partido && (
                  <span className="ms-2 regular">
                    {errors.idArbitro_partido}
                  </span>
                )}
              </label>
              <select
                name="idArbitro_partido"
                value={formData.idArbitro_partido}
                onChange={handleChange}
                className="form-select border-red-2 rounded-2 red-text shadow-card mb-2"
              >
                <option value="">Seleccione un árbitro</option>
                {arbitros.map((arbitro) => (
                  <option key={arbitro.id_arbitro} value={arbitro.id_arbitro}>
                    {arbitro.nombre_arbitro} {arbitro.apellido_arbitro}
                  </option>
                ))}
              </select>
              <label className="semibold" htmlFor="fecha_partido">
                Fecha y Hora*
                {isSubmitted && errors.fecha_partido && (
                  <span className="ms-2 regular">{errors.fecha_partido}</span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.fecha_partido}
                id="fecha_partido"
                name="fecha_partido"
                type="datetime-local"
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
