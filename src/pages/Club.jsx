import React, { Fragment, useState, useEffect } from "react";
import { Header, Sidebar } from "../components/index";
import { useParams } from "react-router-dom";
import { JugadoresByClub } from "../components/JugadoresByClub";
export function Club() {
  //Obtenemos los datos
  const [data, setData] = useState({
    id_club: 0,
    nombre_club: "",
    ciudad_club: "",
    estadio_club: "",
    escudo_club: "",
    fechaFund_club: "",
    titulosPrimera_club: 0,
    entrenador_club: "",
  });

  const clubName = useParams()["*"];

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/clubes/club?nombre=${clubName}`, {
        method: "GET",
      }).then((response) => response.json());

      setData(data);
    }

    fetchData();
  }, []);

  return (
    <Fragment>
      <div className="container-fluid d-flex flex-column vh-100">
        <Header></Header>
        <div className="row flex-grow-1">
          <div className="col-2 blue d-flex flex-column sidebar-container">
            <Sidebar></Sidebar>
          </div>
          <div className="col mt-5 pt-4 content-container">
            <div className="bg-white p-3">
              <div className="border-red-2  pb-4 shadow-card px-5 rounded-4">
                <h1 className="text-40 red-text bold text-center d-flex align-items-center flex-column">
                <img
                    src={data.escudo_club}
                    height={75}
                    width={75}
                    alt="Escudo"
                    className="my-2"
                  />
                  {data.nombre_club}
                </h1>
                <div className="row m-0">
                  <div className="col-md-4 d-flex justify-content-start">
                    <div className="w-fit mb-4 bg-red text-blanco rounded-3 shadow-card px-4 py-3 d-flex">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M37.5 2.5H33.125V1.875C33.125 0.839375 32.2856 0 31.25 0C30.2144 0 29.375 0.839375 29.375 1.875V2.5H10.625V1.875C10.625 0.839375 9.78562 0 8.75 0C7.71438 0 6.875 0.839375 6.875 1.875V2.5H2.5C1.11812 2.5 0 3.61812 0 5V37.5C0 38.8819 1.11812 40 2.5 40H37.5C38.8819 40 40 38.8819 40 37.5V5C40 3.61812 38.8819 2.5 37.5 2.5ZM11.25 33.125C11.25 33.4706 10.9706 33.75 10.625 33.75H6.875C6.52938 33.75 6.25 33.4706 6.25 33.125V30C6.25 29.6544 6.52938 29.375 6.875 29.375H10.625C10.9706 29.375 11.25 29.6544 11.25 30V33.125ZM11.25 26.25C11.25 26.5956 10.9706 26.875 10.625 26.875H6.875C6.52938 26.875 6.25 26.5956 6.25 26.25V23.125C6.25 22.7794 6.52938 22.5 6.875 22.5H10.625C10.9706 22.5 11.25 22.7794 11.25 23.125V26.25ZM11.25 19.375C11.25 19.7206 10.9706 20 10.625 20H6.875C6.52938 20 6.25 19.7206 6.25 19.375V16.25C6.25 15.9044 6.52938 15.625 6.875 15.625H10.625C10.9706 15.625 11.25 15.9044 11.25 16.25V19.375ZM18.75 33.125C18.75 33.4706 18.4706 33.75 18.125 33.75H14.375C14.0294 33.75 13.75 33.4706 13.75 33.125V30C13.75 29.6544 14.0294 29.375 14.375 29.375H18.125C18.4706 29.375 18.75 29.6544 18.75 30V33.125ZM18.75 26.25C18.75 26.5956 18.4706 26.875 18.125 26.875H14.375C14.0294 26.875 13.75 26.5956 13.75 26.25V23.125C13.75 22.7794 14.0294 22.5 14.375 22.5H18.125C18.4706 22.5 18.75 22.7794 18.75 23.125V26.25ZM18.75 19.375C18.75 19.7206 18.4706 20 18.125 20H14.375C14.0294 20 13.75 19.7206 13.75 19.375V16.25C13.75 15.9044 14.0294 15.625 14.375 15.625H18.125C18.4706 15.625 18.75 15.9044 18.75 16.25V19.375ZM26.25 33.125C26.25 33.4706 25.9706 33.75 25.625 33.75H21.875C21.5294 33.75 21.25 33.4706 21.25 33.125V30C21.25 29.6544 21.5294 29.375 21.875 29.375H25.625C25.9706 29.375 26.25 29.6544 26.25 30V33.125ZM26.25 26.25C26.25 26.5956 25.9706 26.875 25.625 26.875H21.875C21.5294 26.875 21.25 26.5956 21.25 26.25V23.125C21.25 22.7794 21.5294 22.5 21.875 22.5H25.625C25.9706 22.5 26.25 22.7794 26.25 23.125V26.25ZM26.25 19.375C26.25 19.7206 25.9706 20 25.625 20H21.875C21.5294 20 21.25 19.7206 21.25 19.375V16.25C21.25 15.9044 21.5294 15.625 21.875 15.625H25.625C25.9706 15.625 26.25 15.9044 26.25 16.25V19.375ZM33.75 26.25C33.75 26.5956 33.4706 26.875 33.125 26.875H29.375C29.0294 26.875 28.75 26.5956 28.75 26.25V23.125C28.75 22.7794 29.0294 22.5 29.375 22.5H33.125C33.4706 22.5 33.75 22.7794 33.75 23.125V26.25ZM33.75 19.375C33.75 19.7206 33.4706 20 33.125 20H29.375C29.0294 20 28.75 19.7206 28.75 19.375V16.25C28.75 15.9044 29.0294 15.625 29.375 15.625H33.125C33.4706 15.625 33.75 15.9044 33.75 16.25V19.375ZM38.75 9.375H1.25V5C1.25 4.31 1.81 3.75 2.5 3.75H6.875V6.25C6.875 7.28562 7.71438 8.125 8.75 8.125C9.78562 8.125 10.625 7.28562 10.625 6.25V3.75H29.375V6.25C29.375 7.28562 30.2144 8.125 31.25 8.125C32.2856 8.125 33.125 7.28562 33.125 6.25V3.75H37.5C38.19 3.75 38.75 4.31 38.75 5V9.375Z"
                          fill="#EAE8E0"
                        />
                      </svg>
                      <div className="ms-3">
                        <p className="m-0 ">Fecha de fundación</p>
                        <p className="m-0 bold">{data.fechaFund_club}</p>
                      </div>
                    </div>

                  </div>
                  <div className="col-md-4 d-flex justify-content-center">
                    <div className="w-fit mb-4 bg-red text-blanco rounded-3 shadow-card px-4 py-3 d-flex">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          d="M28.5714 0H0V40H5.71429V28.5714H11.4286V40H40V22.8571H28.5714V0ZM11.4286 5.71429H5.71429V11.4286H11.4286V5.71429ZM22.8571 5.71429H17.1429V11.4286H22.8571V5.71429ZM17.1429 17.1429H22.8571V22.8571H17.1429V17.1429ZM28.5714 28.5714H34.2857V34.2857H28.5714V28.5714Z"
                          fill="#EAE8E0"
                        />
                      </svg>

                      <div className="ms-3">
                        <p className="m-0 ">Ciudad</p>
                        <p className="m-0 bold">{data.ciudad_club}</p>
                      </div>
                    </div>
                  </div>
                  <div className="col-md-4 d-flex justify-content-end">
                    <div className="w-fit mb-4 bg-red text-blanco rounded-3 shadow-card px-4 py-3 d-flex">
                      <svg
                        width="40"
                        height="40"
                        viewBox="0 0 40 40"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M37.5 2.5H33.125V1.875C33.125 0.839375 32.2856 0 31.25 0C30.2144 0 29.375 0.839375 29.375 1.875V2.5H10.625V1.875C10.625 0.839375 9.78562 0 8.75 0C7.71438 0 6.875 0.839375 6.875 1.875V2.5H2.5C1.11812 2.5 0 3.61812 0 5V37.5C0 38.8819 1.11812 40 2.5 40H37.5C38.8819 40 40 38.8819 40 37.5V5C40 3.61812 38.8819 2.5 37.5 2.5ZM11.25 33.125C11.25 33.4706 10.9706 33.75 10.625 33.75H6.875C6.52938 33.75 6.25 33.4706 6.25 33.125V30C6.25 29.6544 6.52938 29.375 6.875 29.375H10.625C10.9706 29.375 11.25 29.6544 11.25 30V33.125ZM11.25 26.25C11.25 26.5956 10.9706 26.875 10.625 26.875H6.875C6.52938 26.875 6.25 26.5956 6.25 26.25V23.125C6.25 22.7794 6.52938 22.5 6.875 22.5H10.625C10.9706 22.5 11.25 22.7794 11.25 23.125V26.25ZM11.25 19.375C11.25 19.7206 10.9706 20 10.625 20H6.875C6.52938 20 6.25 19.7206 6.25 19.375V16.25C6.25 15.9044 6.52938 15.625 6.875 15.625H10.625C10.9706 15.625 11.25 15.9044 11.25 16.25V19.375ZM18.75 33.125C18.75 33.4706 18.4706 33.75 18.125 33.75H14.375C14.0294 33.75 13.75 33.4706 13.75 33.125V30C13.75 29.6544 14.0294 29.375 14.375 29.375H18.125C18.4706 29.375 18.75 29.6544 18.75 30V33.125ZM18.75 26.25C18.75 26.5956 18.4706 26.875 18.125 26.875H14.375C14.0294 26.875 13.75 26.5956 13.75 26.25V23.125C13.75 22.7794 14.0294 22.5 14.375 22.5H18.125C18.4706 22.5 18.75 22.7794 18.75 23.125V26.25ZM18.75 19.375C18.75 19.7206 18.4706 20 18.125 20H14.375C14.0294 20 13.75 19.7206 13.75 19.375V16.25C13.75 15.9044 14.0294 15.625 14.375 15.625H18.125C18.4706 15.625 18.75 15.9044 18.75 16.25V19.375ZM26.25 33.125C26.25 33.4706 25.9706 33.75 25.625 33.75H21.875C21.5294 33.75 21.25 33.4706 21.25 33.125V30C21.25 29.6544 21.5294 29.375 21.875 29.375H25.625C25.9706 29.375 26.25 29.6544 26.25 30V33.125ZM26.25 26.25C26.25 26.5956 25.9706 26.875 25.625 26.875H21.875C21.5294 26.875 21.25 26.5956 21.25 26.25V23.125C21.25 22.7794 21.5294 22.5 21.875 22.5H25.625C25.9706 22.5 26.25 22.7794 26.25 23.125V26.25ZM26.25 19.375C26.25 19.7206 25.9706 20 25.625 20H21.875C21.5294 20 21.25 19.7206 21.25 19.375V16.25C21.25 15.9044 21.5294 15.625 21.875 15.625H25.625C25.9706 15.625 26.25 15.9044 26.25 16.25V19.375ZM33.75 26.25C33.75 26.5956 33.4706 26.875 33.125 26.875H29.375C29.0294 26.875 28.75 26.5956 28.75 26.25V23.125C28.75 22.7794 29.0294 22.5 29.375 22.5H33.125C33.4706 22.5 33.75 22.7794 33.75 23.125V26.25ZM33.75 19.375C33.75 19.7206 33.4706 20 33.125 20H29.375C29.0294 20 28.75 19.7206 28.75 19.375V16.25C28.75 15.9044 29.0294 15.625 29.375 15.625H33.125C33.4706 15.625 33.75 15.9044 33.75 16.25V19.375ZM38.75 9.375H1.25V5C1.25 4.31 1.81 3.75 2.5 3.75H6.875V6.25C6.875 7.28562 7.71438 8.125 8.75 8.125C9.78562 8.125 10.625 7.28562 10.625 6.25V3.75H29.375V6.25C29.375 7.28562 30.2144 8.125 31.25 8.125C32.2856 8.125 33.125 7.28562 33.125 6.25V3.75H37.5C38.19 3.75 38.75 4.31 38.75 5V9.375Z"
                          fill="#EAE8E0"
                        />
                      </svg>
                      <div className="ms-3">
                        <p className="m-0">Estadio</p>
                        <p className="m-0 bold">{data.estadio_club}</p>
                      </div>
                    </div>

                  </div>
                </div>
                <div className="row justify-content-center m-0 px-2">
                  <div className=" bg-red text-blanco w-fit rounded-3 shadow-card px-4 py-3 d-flex">
                    <div className=" d-flex flex-column align-items-center">
                      <p className="m-0 text-center">
                        Títulos de primera división
                      </p>
                      <img
                        src="/images/torneo.png"
                        height={100}
                        width={53}
                        className="my-3"
                        alt="Imagen de La gloriosa Chilean Premier League"
                      />
                      <p className="m-0 bold text-center text-24">
                        {data.titulosPrimera_club}
                      </p>
                    </div>
                  </div>
                </div>
                <p className="text-16 m-0 bold red-text">ENTRENADOR</p>
                <div className="w-fit border-red-2 rounded-3 shadow-card d-flex align-items-center px-4 py-1 mb-2">
                  <img
                    src="/images/Group.png"
                    height={40}
                    width={40}
                    alt=""
                    className="me-3"
                  />
                    <p className="red-text medium m-0">
                      {data.entrenador_club}
                    </p>
                </div>
                <div className="separation-bar"></div>
                <JugadoresByClub club={clubName} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
