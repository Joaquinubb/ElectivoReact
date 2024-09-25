import React from "react";

export const CarouselNoticias = () => {
  return (
    <div id="carouselExampleCaptions" className="carousel slide">
      <div className="carousel-indicators">
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="0"
          className="active"
          aria-current="true"
          aria-label="Slide 1"
        ></button>
        <button
          type="button"
          data-bs-target="#carouselExampleCaptions"
          data-bs-slide-to="1"
          aria-label="Slide 2"
        ></button>
      </div>
      <div className="carousel-inner">
        <div className="carousel-item active">
          <img
            src="https://sifup.cl/wp-content/uploads/2019/08/n%CC%83ublense-2022-baja-06-1.jpg"
            className="rounded-5 carousel-image d-block w-100"
            alt="..."
            height={500}
          />
          <div className="bg-black-trans carousel-caption d-none d-md-block rounded-3">
            <h5 className="m-0">Noticia numero 1</h5>
          </div>
        </div>
        <div className="carousel-item">
          <img
            src="https://assets.adnradio.cl/2022/01/A_UNO_1330036-e1641934197502.jpg"
            className="rounded-5 carousel-image d-block w-100"
            alt="..."
            height={500}
          />
          <div className="bg-black-trans carousel-caption d-none d-md-block rounded-3">
            <h5 className="m-0">Noticia numero 2</h5>
          </div>
        </div>
      </div>
      <button
        className="carousel-control-prev"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="prev"
      >
        <span className="carousel-control-prev-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Previous</span>
      </button>
      <button
        className="carousel-control-next"
        type="button"
        data-bs-target="#carouselExampleCaptions"
        data-bs-slide="next"
      >
        <span className="carousel-control-next-icon" aria-hidden="true"></span>
        <span className="visually-hidden">Next</span>
      </button>
    </div>
  );
};
