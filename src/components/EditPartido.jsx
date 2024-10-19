import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const EditPartido = ({ partidoFromGrid, setRefresh, refresh }) => {
  const [partido, setPartido] = useState(partidoFromGrid);
  //MANIPULACION DE LOS DATOS DEL FORMULARIO
  useEffect(() => {
    async function fetchPartido() {
      const apiUrl = process.env.REACT_APP_API;

      let fetchedPartido = await fetch(
        `${apiUrl}/partidos/${partido.id_partido}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());

      setPartido(fetchedPartido);
    }

    fetchPartido();
  }, []);

  useEffect(() => {
    setFormData({
      id_partido: partido.id_partido,
      fecha_partido: partido.fecha_partido,
      idArbitro_partido: partido.idArbitro_partido,
    });
  }, [partido]);

  const [formData, setFormData] = useState({
    id_partido: "",
    fecha_partido: "",
    idArbitro_partido: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  //VALIDACIONES
  const [errors, setErrors] = useState({
    id_partido: "",
    fecha_partido: "",
    idArbitro_partido: "",
  });

  const validateForm = () => {
    const newErrors = {
      id_partido: "",
      fecha_partido: "",
      idArbitro_partido: "",
    };
    if (!formData.id_partido) newErrors.id_partido = "Campo obligatorio";
    if (!formData.fecha_partido) newErrors.fecha_partido = "Campo obligatorio";
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

  const isDateValid = (fecha) => {
    const today = new Date();
    const selectedDate = new Date(fecha);
    return selectedDate >= today;
  };

  const onSubmit = async (event) => {
    console.log("submit", formData);

    if (!isDateValid(formData.fecha_partido)) {
      setErrorResponse(
        "La fecha y hora del partido no puede ser anterior a hoy."
      );
      return;
    }

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
        `/partidos?id_partido=${formData.id_partido}&fecha_partido=${formData.fecha_partido}:00Z&idArbitro_partido=${formData.idArbitro_partido}`,
      {
        method: "PUT",
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();
    console.log("data", data);

    if (response.ok) {
      setButtonIsClicked(false);
      setRefresh(!refresh);
      document
        .querySelector(
          `#editarPartido${partido.id_partido} .btn[data-bs-dismiss="modal"]`
        )
        .click();
    } else {
      setErrorResponse(data.error);

      console.error("Error editing user:", errorResponse);
      setButtonIsClicked(false);
    }
    setButtonIsClicked(false);
  };

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
        className="btn rounded-full p-0"
        data-bs-toggle="modal"
        data-bs-target={`#editarPartido${partidoFromGrid.id_partido}`}
      >
        <img src="/assets/edit.svg" alt="" />
      </button>

      <div
        className="modal fade"
        id={`editarPartido${partidoFromGrid.id_partido}`}
        tabindex={-1}
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
              <h4 className="text-center bold">Editar Partido</h4>
              <input
                onChange={handleChange}
                value={formData.id_partido}
                id="id_partido"
                name="id_partido"
                type="text"
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
                hidden
              />
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
