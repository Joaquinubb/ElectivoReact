import React, { Fragment } from "react";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import "./Home.css";
import { Link } from "react-router-dom";

export function Home() {
  return (
    <Fragment>
      <div className="container-fluid d-flex flex-column vh-100">
        <Header />
        <div className="row flex-grow-1">
          <div className="col-2 blue d-flex flex-column sidebar-container">
            <Sidebar />
          </div>
          <div className="col mt-5 pt-4 content-container">
            <div className="bg-white p-3">
              <h2 className="red-text bold text-20">
                Bienvenidos a la Chilean Premier League
              </h2>
              <p className="red-text bold text-12">
                Tu fuente oficial para todo lo relacionado con el fútbol
                chileno.
              </p>
              <p className="red-text semibold text-12">
                Aquí encontrarás información actualizada sobre los clubes,
                jugadores, entrenadores y árbitros que forman parte de la
                primera división de Chile. Nuestro objetivo es brindarte acceso
                a estadísticas, noticias y contenido exclusivo que te conecte
                con la pasión y la emoción de nuestra liga. Explora, descubre y
                comparte la pasión por el fútbol que une a todo un país.
              </p>
              <div className="row ">
                <div className="col">
                  <Link className="btn custom-border-btn bg-red text-blanco">
                    <svg
                      className="me-3"
                      width="38"
                      height="30"
                      viewBox="0 0 38 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M11.0215 4.41215C13.5379 2.92557 16.1753 2.1727 18.8774 2.17137C22.577 2.17137 25.5522 3.5912 26.9462 4.40092V12.9205H29.1176V3.21773C29.1176 3.21773 24.8819 0 18.8761 0C15.8738 0.00132199 12.4287 0.805094 8.8501 3.21773V12.9205H11.0215V4.41215Z"
                        fill="#EAE8E0"
                      />
                      <path
                        d="M18.9839 26.8166L13.957 21.4308H10.9865L18.9839 29.9999L26.9806 21.4308H24.0107L18.9839 26.8166Z"
                        fill="#EAE8E0"
                      />
                      <path
                        d="M37.967 21.7244L36.0851 19.046L37.963 16.3505H30.4766V13.7441H7.60873V16.3505H0.00396598L1.88186 19.046L0 21.7244H8.52025V20.8069H29.4474V21.7244H37.967ZM7.69665 20.9014H1.58507L2.88723 19.05L1.5811 17.1754H7.60873V20.8069H7.69665V20.9014ZM30.2703 20.8076H30.4772V17.176H36.3852L35.0804 19.0519L36.3813 20.9027H30.2697L30.2703 20.8076Z"
                        fill="#EAE8E0"
                      />
                    </svg>
                    Clubes
                  </Link>
                </div>
                <div className="col">
                  <Link className="btn custom-border-btn bg-red text-blanco">
                    <svg
                      className="me-3"
                      width="34"
                      height="30"
                      viewBox="0 0 34 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M33.4562 22.18V28.8617C33.4562 29.4904 32.8305 30 32.0583 30H1.39789C0.625883 30 0 29.4904 0 28.8617V22.18C0 19.6987 2.05378 17.5111 4.99439 16.8605L11.6918 15.3784C12.3042 15.2428 12.9518 15.4602 13.269 15.9077L16.7281 20.7862L20.1872 15.9077C20.5045 15.4602 21.1527 15.2432 21.7644 15.3784L28.4618 16.8605C31.4024 17.5111 33.4562 19.6986 33.4562 22.18ZM16.7281 0C12.7933 0 9.59215 3.10811 9.59215 6.92862C9.59215 10.749 12.7933 13.8572 16.7283 13.8572C20.6633 13.8572 23.8643 10.7491 23.8643 6.92862C23.8643 3.10811 20.6631 0 16.7281 0Z"
                        fill="#EAE8E0"
                      />
                    </svg>
                    Entrenadores
                  </Link>
                </div>
                <div className="col">
                  <Link className="btn custom-border-btn bg-red text-blanco">
                    <svg
                      className="me-3"
                      width="20"
                      height="30"
                      viewBox="0 0 20 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.9054 2.97816C15.9054 4.6229 14.572 5.95632 12.9272 5.95632C11.2825 5.95632 9.94907 4.6229 9.94907 2.97816C9.94907 1.33342 11.2825 0 12.9272 0C14.572 0 15.9054 1.33342 15.9054 2.97816ZM15.9054 21.8399C14.8088 21.8399 13.9199 22.7287 13.9199 23.8253C13.9199 24.9219 14.8088 25.8107 15.9054 25.8107C17.002 25.8107 17.8908 24.9219 17.8908 23.8253C17.8908 22.7287 17.002 21.8399 15.9054 21.8399ZM19.5586 12.0913L15.7664 8.29914C15.5875 8.07578 15.3179 7.94454 15.0318 7.94177H1.01458C0.466402 7.94177 0.0218613 8.38631 0.0218613 8.93449C0.0218613 9.48267 0.466402 9.92721 1.01458 9.92721H6.37527L0.0218613 22.4355C-0.00553778 22.5665 -0.00553778 22.7015 0.0218613 22.8326C-0.0932943 23.3808 0.25793 23.9186 0.806111 24.0338C1.35429 24.1489 1.89215 23.7977 2.0073 23.2495L3.99274 19.8544H7.96363L4.13173 28.2727C4.03801 28.4283 3.98996 28.6072 3.99274 28.7889C3.88315 29.3371 4.23874 29.8706 4.78692 29.9802C5.3351 30.0898 5.86859 29.7342 5.97819 29.186L15.3098 10.5625L18.1688 13.501C18.5877 13.8548 19.2139 13.802 19.5677 13.3833C19.8836 13.0092 19.8798 12.4608 19.5586 12.0913Z"
                        fill="#EAE8E0"
                      />
                    </svg>
                    Jugadores
                  </Link>
                </div>
                <div className="col">
                  <Link className="btn custom-border-btn bg-red text-blanco">
                    <svg
                      className="me-3"
                      width="38"
                      height="30"
                      viewBox="0 0 38 30"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M4.57223 0C4.10992 0 3.50943 0.21397 2.65097 0.770551C2.99177 1.17288 3.35277 1.60297 4.06626 2.42525C4.56312 2.99782 5.06462 3.56729 5.44341 3.97959C5.44667 3.9832 5.44813 3.98431 5.45131 3.98784L8.10609 2.44691L6.84702 1.23114C5.87668 0.423042 5.2449 0.0396143 4.6628 0.00292139C4.63316 0.00103089 4.60308 0 4.57223 0ZM14.8909 1.29602C14.8149 1.29516 14.7391 1.29551 14.6638 1.29688C13.765 1.31347 12.928 1.48851 12.3658 1.76298L6.58587 5.11758C6.7964 5.16433 7.00565 5.22036 7.21206 5.29117C8.69653 5.80014 10.0558 6.8571 11.4715 8.273L30.0706 26.6194L37.0292 22.8012L18.7329 2.57254C17.9891 1.89883 16.8003 1.46333 15.5798 1.33564C15.3498 1.31158 15.119 1.29869 14.8908 1.29611L14.8909 1.29602ZM1.51667 1.83009C0.00916507 3.61085 -0.250951 5.02555 0.199676 6.72855C0.259141 6.95352 0.462369 7.27482 0.747319 7.62825C0.935939 7.35808 1.13831 7.08654 1.35623 6.81379C1.6991 6.38456 2.07677 6.02468 2.48065 5.73466L2.47154 5.71747L2.7094 5.57912C2.82575 5.50505 2.94399 5.43648 3.0643 5.37349L4.08414 4.78142C3.72537 4.38459 3.31591 3.92064 2.89802 3.43899C2.38621 2.84915 1.88978 2.2686 1.51667 1.83009ZM17.3361 2.98484L22.3558 8.28426C18.3956 7.85142 17.4758 9.41856 16.4242 11.2231L11.4974 6.12702L17.3361 2.98484ZM5.42742 6.51251C5.36607 6.51114 5.30454 6.51114 5.24267 6.51269C4.64321 6.52815 4.02184 6.68953 3.33052 7.0184C3.06971 7.21518 2.81578 7.4649 2.56486 7.77906C0.3504 10.5516 -0.0517609 12.8606 0.374977 14.9524C0.801628 17.0442 2.13967 18.9616 3.63317 20.663C4.77726 21.9664 6.11316 22.7247 7.79846 23.0631C9.48392 23.4016 11.5312 23.2958 13.9838 22.7645C16.8407 22.1457 19.6562 23.488 22.217 25.1418C24.4613 26.5913 26.5716 28.329 28.3164 29.4341L29.0717 27.8069L10.3798 9.36854L10.378 9.36665C9.04395 8.03265 7.83738 7.14059 6.71021 6.75416C6.27884 6.60618 5.85734 6.52265 5.42742 6.51251ZM36.9713 24.5974L30.6596 28.0608L29.759 30L35.8458 26.6994L36.9712 24.5975L36.9713 24.5974Z"
                        fill="#EAE8E0"
                      />
                    </svg>
                    Árbitros
                  </Link>
                </div>
              </div>
              <div className="row imagenes">
                <div className="carousel slide">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img
                        src="https://sifup.cl/wp-content/uploads/2019/08/n%CC%83ublense-2022-baja-06-1.jpg"
                        className="d-block w-100 imagen"
                        alt="..."
                      />
                    </div>
                    <div className="carousel-item">
                      <img
                        src="https://sifup.cl/wp-content/uploads/2019/08/colo-colo-2022-baja-08-1.jpg"
                        className="d-block w-100 imagen"
                        alt="..."
                      />
                    </div>
                  </div>
                  <button
                    className="carousel-control-prev"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="prev"
                  >
                    <span
                      className="carousel-control-prev-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button
                    className="carousel-control-next"
                    type="button"
                    data-bs-target="#carouselExample"
                    data-bs-slide="next"
                  >
                    <span
                      className="carousel-control-next-icon"
                      aria-hidden="true"
                    ></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
              <div className="d-flex justify-content-end">
                <Link className="btn custom-border-btn bg-red text-blanco">
                  <svg
                    className="me-3"
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M2.22222 17.7778H3.80556L14.6667 6.91667L13.0833 5.33333L2.22222 16.1944V17.7778ZM0 20V15.2778L14.6667 0.638889C14.8889 0.435185 15.1343 0.277778 15.4028 0.166667C15.6713 0.0555556 15.9537 0 16.25 0C16.5463 0 16.8333 0.0555556 17.1111 0.166667C17.3889 0.277778 17.6296 0.444444 17.8333 0.666667L19.3611 2.22222C19.5833 2.42593 19.7454 2.66667 19.8472 2.94444C19.9491 3.22222 20 3.5 20 3.77778C20 4.07407 19.9491 4.35648 19.8472 4.625C19.7454 4.89352 19.5833 5.13889 19.3611 5.36111L4.72222 20H0ZM13.8611 6.13889L13.0833 5.33333L14.6667 6.91667L13.8611 6.13889Z"
                      fill="#E8EAED"
                    />
                  </svg>
                  Editar Información
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
