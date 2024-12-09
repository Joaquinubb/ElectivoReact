import React, { useEffect, useState } from "react";
import { GoogleMap, LoadScript, Marker } from "@react-google-maps/api";

// Función para parsear la fecha en español
function parseSpanishDate(dateString) {
  // Mapear los meses en español a números
  const meses = {
    enero: 0,
    febrero: 1,
    marzo: 2,
    abril: 3,
    mayo: 4,
    junio: 5,
    julio: 6,
    agosto: 7,
    septiembre: 8,
    octubre: 9,
    noviembre: 10,
    diciembre: 11,
  };

  // Expresión regular para extraer los componentes de la fecha
  const regex = /(\d{1,2}) de (\w+) de (\d{4}) a las (\d{2}):(\d{2}):(\d{2})/;
  const matches = dateString.match(regex);

  if (matches) {
    const day = parseInt(matches[1], 10);
    const month = meses[matches[2].toLowerCase()];
    const year = parseInt(matches[3], 10);
    const hour = parseInt(matches[4], 10);
    const minute = parseInt(matches[5], 10);
    const second = parseInt(matches[6], 10);

    return new Date(year, month, day, hour, minute, second);
  }

  return null;
}

export function CardPartido({
  id_partido,
  fecha_partido,
  club_local,
  club_visitante,
  arbitro,
  estadio,
}) {
  const [escudoLocal, setEscudoLocal] = useState("");
  const [escudoVisitante, setEscudoVisitante] = useState("");
  const [center, setCenter] = useState(null);
  const [weather, setWeather] = useState(null);
  const googleMapsApiKey = process.env.REACT_APP_GOOGLE_MAPS_API_KEY;
  const weatherApiKey = process.env.REACT_APP_OPEN_WEATHER_API_KEY;

  useEffect(() => {
    const fetchClubDetails = async (clubName, setEscudo) => {
      const apiUrl = process.env.REACT_APP_API;
      try {
        const response = await fetch(
          `${apiUrl}/clubes/club?nombre=${clubName}`
        );
        const data = await response.json();
        setEscudo(data.escudo_club);
      } catch (error) {
        console.error("Error fetching club details:", error);
      }
    };

    const fetchCoordinates = async () => {
      try {
        const response = await fetch(
          `https://maps.googleapis.com/maps/api/geocode/json?address=Estadio ${encodeURIComponent(
            estadio
          )}&key=${googleMapsApiKey}`
        );
        const data = await response.json();
        if (data.results.length > 0) {
          const location = data.results[0].geometry.location;
          setCenter({ lat: location.lat, lng: location.lng });
          fetchWeather(location.lat, location.lng);
        }
      } catch (error) {
        console.error("Error fetching coordinates:", error);
      }
    };

    const fetchWeather = async (lat, lng) => {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lng}&appid=${weatherApiKey}&units=metric`
        );
        const data = await response.json();

        // Parsear la fecha del partido
        const partidoFecha = parseSpanishDate(fecha_partido);

        if (partidoFecha) {
          // Ajustar la fecha del partido al huso horario UTC
          const partidoFechaUTC = new Date(
            partidoFecha.getTime() + partidoFecha.getTimezoneOffset() * 60000
          );

          // Filtrar los pronósticos que coinciden con la fecha del partido
          const forecastsDelDia = data.list.filter((forecast) => {
            const forecastDate = new Date(forecast.dt_txt);

            return (
              forecastDate.getUTCFullYear() ===
                partidoFechaUTC.getUTCFullYear() &&
              forecastDate.getUTCMonth() === partidoFechaUTC.getUTCMonth() &&
              forecastDate.getUTCDate() === partidoFechaUTC.getUTCDate()
            );
          });

          if (forecastsDelDia.length > 0) {
            // Puedes elegir mostrar el primer pronóstico del día
            setWeather(forecastsDelDia[0]);
          } else {
            console.error(
              "No hay pronóstico disponible para la fecha del partido."
            );
          }
        } else {
          console.error("No se pudo parsear la fecha del partido.");
        }
      } catch (error) {
        console.error("Error al obtener el clima:", error);
      }
    };

    fetchClubDetails(club_local, setEscudoLocal);
    fetchClubDetails(club_visitante, setEscudoVisitante);
    fetchCoordinates();
  }, [club_local, club_visitante, estadio]);

  const mapContainerStyle = {
    width: "90%",
    height: "400px",
  };

  return (
    <>
      <button
        className="col-md-4 w-fit border-red-2 red-text text-16 rounded-3 mx-1 my-2 shadow-card hover-bg-gray card-fixed-size"
        type="button"
        data-bs-toggle="modal"
        data-bs-target={`#partido${id_partido}`}
      >
        <div className="row mt-2 mb-2">
          <div className="col">
            <img
              width={50}
              height={50}
              src={escudoLocal}
              alt={`${club_local} escudo`}
            />
          </div>
          <div className="col">
            <p className="mt-3 bold">vs</p>
          </div>
          <div className="col">
            <img
              width={50}
              height={50}
              src={escudoVisitante}
              alt={`${club_visitante} escudo`}
            />
          </div>
        </div>
        <div className="row">
          <p className="text-12 my-2 medium">{`${fecha_partido}`}</p>
        </div>
      </button>

      <div
        className="modal fade"
        id={`partido${id_partido}`}
        tabIndex="-1"
        aria-hidden="true"
      >
        <div className="modal-dialog">
          <div className="modal-content ps-5 red-text border-red-2">
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
            <div className="text-center mb-3 me-5">
              <p className="bold text-16">{`${club_local}   VS   ${club_visitante}`}</p>
            </div>
            <div className="row text-center me-1">
              <div className="col-5 text-end">
                <img
                  src={escudoLocal}
                  width={60}
                  height={60}
                  alt={`${club_local}`}
                />
              </div>

              <div className="col-4">
                <img
                  src={escudoVisitante}
                  width={60}
                  height={60}
                  alt={`${club_visitante}`}
                />
              </div>
            </div>
            <div className="row mt-3">
              <p className=" text-16 m-0 medium">{`${fecha_partido}`}</p>
              <p className="text-16 m-0 medium">
                {weather ? (
                  <>
                    {`Clima: ${weather.main.temp}°C`}
                    <img
                      src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}.png`}
                      alt="Weather icon"
                    />
                  </>
                ) : (
                  "Clima no disponible"
                )}
              </p>
              <p className=" text-16 m-0 medium">Árbitro: {`${arbitro}`}</p>
              <p className=" text-16 m-0 medium">Estadio {`${estadio}`}</p>
            </div>
            <div className="row mb-3 mt-1">
              <LoadScript googleMapsApiKey={googleMapsApiKey}>
                <GoogleMap
                  mapContainerStyle={mapContainerStyle}
                  center={center}
                  zoom={15}
                >
                  <Marker position={center} />
                </GoogleMap>
              </LoadScript>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
