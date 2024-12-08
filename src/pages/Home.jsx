import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import { CarouselNoticias } from "../components/CarouselNoticias";
import { Header } from "../components/index";
import { Sidebar } from "../components/index";

export function Home() {
  const [showModal, setShowModal] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { user, login, error } = useAuth();
  const navigate = useNavigate();

  const handleEditClick = () => {
    if (user) {
      navigate("/editor");
    } else {
      setShowModal(true);
    }
  };

  const handleCloseModal = () => {
    setShowModal(false);
    if (user) {
      navigate("/editor");
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await login(email, password);
    handleCloseModal();
  };

  return (
    <Fragment>
      <div className="container-fluid d-flex flex-column vh-100">
        <Header />
        <div className="row flex-grow-1">
          <div className="col-sidebar blue d-flex flex-column sidebar-container">
            <Sidebar />
          </div>
          <div className="col mt-5 pt-2 content-container">
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
              <div className="row imagenes">
                <CarouselNoticias />
              </div>
              <div className="d-flex justify-content-end">
                <button
                  onClick={handleEditClick}
                  className="btn custom-border-btn bg-red text-blanco fixed-right-bottom"
                >
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
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className={`modal fade ${showModal ? "show" : ""}`} tabIndex={-1} style={{ display: showModal ? "block" : "none" }} aria-hidden={!showModal}>
        <div className="modal-dialog modal-dialog-centered">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title">Iniciar Sesión</h5>
              <button type="button" className="btn-close" onClick={handleCloseModal}></button>
            </div>
            <div className="modal-body">
              <form onSubmit={handleSubmit}>
                {error && <div className="alert alert-danger">{error}</div>}
                <div className="mb-3">
                  <label htmlFor="email" className="form-label">Email</label>
                  <input
                    type="email"
                    className="form-control"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="mb-3">
                  <label htmlFor="password" className="form-label">Password</label>
                  <input
                    type="password"
                    className="form-control"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                  />
                </div>
                <button type="submit" className="btn btn-primary">Login</button>
              </form>
            </div>
          </div>
        </div>
      </div>
      {showModal && <div className="modal-backdrop fade show"></div>}
    </Fragment>
  );
}