import React, { useEffect, useState } from "react";
import { ClipLoader } from "react-spinners";

export const EditJugador = ({ jugadorFromGrid, setRefresh, refresh }) => {
  const [jugador, setJugador] = useState(jugadorFromGrid);
  //MANIPULACION DE LOS DATOS DEL FORMULARIO
  useEffect(() => {
    async function fetchJugador() {
      const apiUrl = process.env.REACT_APP_API;

      let fetchedJugador = await fetch(
        `${apiUrl}/jugadores/${jugador.id_jugador}`,
        {
          method: "GET",
        }
      ).then((response) => response.json());

      setJugador(fetchedJugador);
    }

    fetchJugador();
  }, []);

  useEffect(() => {
    setFormData({
      nombre_jugador: jugador.nombre_jugador,
      apellido_jugador: jugador.apellido_jugador,
      nacionalidad_jugador: jugador.nacionalidad_jugador,
      posicion_jugador: jugador.posicion_jugador,
      estatura_jugador: jugador.estatura_jugador,
      precio_jugador: jugador.precio_jugador,
      club_jugador: jugador.club_jugador,
    });
  }, [jugador]);

  const [formData, setFormData] = useState({
    nombre_jugador: "",
    apellido_jugador: "",
    nacionalidad_jugador: "",
    posicion_jugador: "",
    estatura_jugador: "",
    precio_jugador: "",
    club_jugador: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;

    setFormData({ ...formData, [name]: value });
  };

  //VALIDACIONES
  const [errors, setErrors] = useState({
    nombre_jugador: "",
    apellido_jugador: "",
    nacionalidad_jugador: "",
    posicion_jugador: "",
    estatura_jugador: "",
    precio_jugador: "",
    club_jugador: "",
  });

  const validateForm = () => {
    const newErrors = {
      nombre_jugador: "",
      apellido_jugador: "",
      nacionalidad_jugador: "",
      posicion_jugador: "",
      estatura_jugador: "",
      precio_jugador: "",
      club_jugador: "",
    };
    if (!formData.nombre_jugador)
      newErrors.nombre_jugador = "Campo obligatorio";
    if (!formData.apellido_jugador)
      newErrors.apellido_jugador = "Campo obligatorio";
    if (!formData.nacionalidad_jugador)
      newErrors.nacionalidad_jugador = "Campo obligatorio";
    if (!formData.posicion_jugador)
      newErrors.posicion_jugador = "Campo obligatorio";
    if (!formData.estatura_jugador)
      newErrors.estatura_jugador = "Campo obligatorio";
    if (!formData.precio_jugador)
      newErrors.precio_jugador = "Campo obligatorio";
    if (!formData.club_jugador) newErrors.club_jugador = "Campo obligatorio";
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
        `/jugadores/update/?id=${jugador.id_jugador}&nombre_jugador=${formData.nombre_jugador}&apellido_jugador=${formData.apellido_jugador}&nacionalidad_jugador=${formData.nacionalidad_jugador}&posicion_jugador=${formData.posicion_jugador}&estatura_jugador=${formData.estatura_jugador}&precio_jugador=${formData.precio_jugador}&club_jugador=${formData.club_jugador}`,
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
          `#editJugador${jugador.id_jugador} .btn[data-bs-dismiss="modal"]`
        )
        .click();
    } else {
      setErrorResponse(data.error);

      setButtonIsClicked(false);
    }
    setButtonIsClicked(false);
  };

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

  return (
    <>
      <button
        className="btn rounded-full p-0"
        data-bs-toggle="modal"
        data-bs-target={`#editJugador${jugador.id_jugador}`}
      >
        <img src="/assets/edit.svg" alt="" />
      </button>

      <div
        className="modal fade"
        id={`editJugador${jugador.id_jugador}`}
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
              <h4 className="text-center bold">Editar Jugador</h4>
              <label className="semibold " htmlFor="nombre_jugador">
                Nombre*
                {isSubmitted && errors.nombre_jugador && (
                  <span className="ms-2 regular">{errors.nombre_jugador}</span>
                )}
              </label>
              <input
                name="nombre_jugador"
                id="nombre_jugador"
                value={formData.nombre_jugador}
                type="text"
                onChange={handleChange}
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              ></input>
              <label className="semibold " htmlFor="apellido_jugador">
                Apellido*
                {isSubmitted && errors.apellido_jugador && (
                  <span className="ms-2 regular">
                    {errors.apellido_jugador}
                  </span>
                )}
              </label>
              <input
                name="apellido_jugador"
                id="apellido_jugador"
                value={formData.apellido_jugador}
                type="text"
                onChange={handleChange}
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              ></input>
              <label className="semibold " htmlFor="nacionalidad_jugador">
                Nacionalidad*
                {isSubmitted && errors.nacionalidad_jugador && (
                  <span className="ms-2 regular">
                    {errors.nacionalidad_jugador}
                  </span>
                )}
              </label>
              <input
                name="nacionalidad_jugador"
                id="nacionalidad_jugador"
                value={formData.nacionalidad_jugador}
                type="text"
                onChange={handleChange}
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              ></input>
              <label className="semibold " htmlFor="posicion_jugador">
                Posición*
                {isSubmitted && errors.posicion_jugador && (
                  <span className="ms-2 regular">
                    {errors.posicion_jugador}
                  </span>
                )}
              </label>
              <select
                onChange={handleChange}
                value={formData.posicion_jugador}
                id="posicion_jugador"
                name="posicion_jugador"
                className="form-select border-red-2 rounded-2 red-text shadow-card mb-2"
              >
                <option value="">Seleccione una posición</option>
                <option value="PORTERO">Portero</option>
                <option value="DEFENSA">Defensa</option>
                <option value="MEDIOCAMPISTA">Mediocampista</option>
                <option value="DELANTERO">Delantero</option>
              </select>
              <label className="semibold " htmlFor="estatura_jugador">
                Estatura*
                {isSubmitted && errors.estatura_jugador && (
                  <span className="ms-2 regular">
                    {errors.estatura_jugador}
                  </span>
                )}
              </label>
              <input
                name="estatura_jugador"
                id="estatura_jugador"
                value={formData.estatura_jugador}
                type="text"
                onChange={handleChange}
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              ></input>
              <label className="semibold " htmlFor="precio_jugador">
                Precio*
                {isSubmitted && errors.precio_jugador && (
                  <span className="ms-2 regular">{errors.precio_jugador}</span>
                )}
              </label>
              <input
                name="precio_jugador"
                id="precio_jugador"
                value={formData.precio_jugador}
                type="text"
                onChange={handleChange}
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              ></input>
              <label className="semibold " htmlFor="club_jugador">
                Club*
                {isSubmitted && errors.club_jugador && (
                  <span className="ms-2 regular">{errors.club_jugador}</span>
                )}
              </label>
              <select
                name="club_jugador"
                value={formData.club_jugador}
                onChange={handleChange}
                className="form-select border-red-2 rounded-2 red-text shadow-card mb-2"
              >
                <option value="">Seleccione un club</option>
                {clubes.map((club) => (
                  <option key={club.id_club} value={club.nombre_club}>
                    {club.nombre_club}
                  </option>
                ))}
              </select>
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
