import React, { useState, useEffect } from "react";

export const CreateJugador = () => {
  //MANIPULACION DE LOS DATOS DEL FORMULARIO
  const [formData, setFormData] = useState({
    nombre_jugador: "",
    apellido_jugador: "",
    nacionalidad_jugador: "",
    fechaNac_jugador: "",
    posicion_jugador: "",
    estatura_jugador: "",
    precio_jugador: "",
    club_jugador: "",
  });

  const handleChange = (event) => {
    const { name, value } = event.target;
    const today = new Date();
    const selectedDate = new Date(value);
    const age = today.getFullYear() - selectedDate.getFullYear();
    const monthDiff = today.getMonth() - selectedDate.getMonth();
    const dayDiff = today.getDate() - selectedDate.getDate();
    if (name === "fechaNac_jugador") {
      const formattedDate = new Date(value).toISOString().split("T")[0];
      setFormData({ ...formData, [name]: formattedDate });
    } else {
      setFormData({ ...formData, [name]: value });
    }
    if (
      age > 17 ||
      (age === 17 && (monthDiff > 0 || (monthDiff === 0 && dayDiff >= 0)))
    ) {
      setFormData({
        ...formData,
        [name]: value,
      });
    }
  };

  //VALIDACIONES
  const [errors, setErrors] = useState({
    nombre_jugador: "",
    apellido_jugador: "",
    nacionalidad_jugador: "",
    fechaNac_jugador: "",
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
      fechaNac_jugador: "",
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
    if (!formData.fechaNac_jugador)
      newErrors.fechaNac_jugador = "Campo obligatorio";
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
  const [, setButtonIsClicked] = useState(false);

  const minDate = new Date();
  minDate.setFullYear(minDate.getFullYear() - 17);
  const minDateString = minDate.toISOString().split("T")[0];

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
        `/jugadores?nombre_jugador=${formData.nombre_jugador}&apellido_jugador=${formData.apellido_jugador}&nacionalidad_jugador=${formData.nacionalidad_jugador}&fechaNac_jugador=${formData.fechaNac_jugador}T00:00:00Z&posicion_jugador=${formData.posicion_jugador}&estatura_jugador=${formData.estatura_jugador}&precio_jugador=${formData.precio_jugador}&club_jugador=${formData.club_jugador}`,
      {
        method: "POST",
        body: JSON.stringify(formData),
      }
    );

    const data = await response.json();

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
        data-bs-toggle="modal"
        data-bs-target="#crearJugador"
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
        Añadir Jugador
      </button>

      <div
        className="modal fade"
        id="crearJugador"
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
              <h4 className="text-center bold">Crear Jugador</h4>
              <label className="semibold " htmlFor="nombre_jugador">
                Nombre*
                {isSubmitted && errors.nombre_jugador && (
                  <span className="ms-2 regular">{errors.nombre_jugador}</span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.nombre_jugador}
                id="nombre_jugador"
                name="nombre_jugador"
                type="text"
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              />

              <label className="semibold" htmlFor="apellido_jugador">
                Apellido*
                {isSubmitted && errors.apellido_jugador && (
                  <span className="ms-2 regular">
                    {errors.apellido_jugador}
                  </span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.apellido_jugador}
                id="apellido_jugador"
                name="apellido_jugador"
                type="text"
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              />

              <label className="semibold" htmlFor="nacionalidad_jugador">
                Nacionalidad*
                {isSubmitted && errors.nacionalidad_jugador && (
                  <span className="ms-2 regular">
                    {errors.nacionalidad_jugador}
                  </span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.nacionalidad_jugador}
                id="nacionalidad_jugador"
                name="nacionalidad_jugador"
                type="text"
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              />

              <label className="semibold" htmlFor="posicion_jugador">
                Posicion*{" "}
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
                <option value="Portero">Portero</option>
                <option value="Defensa">Defensa</option>
                <option value="Mediocampista">Mediocampista</option>
                <option value="Delantero">Delantero</option>
              </select>
              <label className="semibold" htmlFor="estatura_jugador">
                Estatura*{" "}
                {isSubmitted && errors.estatura_jugador && (
                  <span className="ms-2 regular">
                    {errors.estatura_jugador}
                  </span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.estatura_jugador}
                id="estatura_jugador"
                name="estatura_jugador"
                type="text"
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              />
              <label className="semibold" htmlFor="precio_jugador">
                Precio*{" "}
                {isSubmitted && errors.precio_jugador && (
                  <span className="ms-2 regular">{errors.precio_jugador}</span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.precio_jugador}
                id="precio_jugador"
                name="precio_jugador"
                type="text"
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
              />
              <label className="semibold" htmlFor="club_jugador">
                Club*{" "}
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

              <label className="semibold" htmlFor="fechaNac_jugador">
                Fecha Nacimiento*
                {/* CAMBIAR POR TIPO FECHA */}
                {isSubmitted && errors.fechaNac_jugador && (
                  <span className="ms-2 regular">
                    {errors.fechaNac_jugador}
                  </span>
                )}
              </label>
              <input
                onChange={handleChange}
                value={formData.fechaNac_jugador}
                id="fechaNac_jugador"
                name="fechaNac_jugador"
                type="date"
                className="form-control border-red-2 rounded-2 red-text shadow-card mb-2"
                max={minDateString}
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
