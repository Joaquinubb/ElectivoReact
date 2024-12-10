import React, { useEffect, useState } from "react";

export const CarouselNoticias = () => {
  const [articles, setArticles] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = "https://news-clp-scrapper.vercel.app/api/noticias";

      let data = await fetch(apiUrl, {
        method: "GET",
      }).then((response) => response.json());

      setArticles(
        data.filter(
          (article) => article.title && article.imgSrc && article.link
        )
      );
    }

    fetchData();
  }, []);

  return (
    <>
      <div id="carouselExampleCaptions" className="carousel slide">
        {articles.length !== 0 && (
          <>
            <div className="carousel-indicators">
              {articles.map((_, index) => (
                <button
                  key={index}
                  type="button"
                  data-bs-target="#carouselExampleCaptions"
                  data-bs-slide-to={index}
                  className={index === 0 ? "active" : ""}
                  aria-current={index === 0 ? "true" : undefined}
                  aria-label={`Slide ${index + 1}`}
                ></button>
              ))}
            </div>
            <div className="carousel-inner">
              {articles.map((article, index) => (
                <div
                  key={index}
                  className={` carousel-item ${index === 0 ? "active" : ""}`}
                >
                  {article.imgSrc === "" ? (
                    <div className="bg-black carousel-caption d-none d-md-block rounded-3">
                      <h5 className="m-0">{article.title}</h5>
                    </div>
                  ) : (
                    <img
                      src={article.imgSrc}
                      className="rounded-5 carousel-image d-block w-100"
                      alt={article.title}
                    />
                  )}
                  <div className="bg-black-trans carousel-caption d-none d-md-block rounded-3">
                    <a
                      href={article.link}
                      className="decoration-none text-white"
                      target="_blank"
                    >
                      <h5 className="m-0">{article.title}</h5>
                    </a>
                  </div>
                </div>
              ))}
            </div>
            <button
              className="carousel-control-prev"
              type="button"
              data-bs-target="#carouselExampleCaptions"
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
              data-bs-target="#carouselExampleCaptions"
              data-bs-slide="next"
            >
              <span
                className="carousel-control-next-icon"
                aria-hidden="true"
              ></span>
              <span className="visually-hidden">Next</span>
            </button>
          </>
        )}
      </div>

      {articles.length !== 0 && (
        <div className="red-text">
          Fuente:{" "}
          <a
            target="_blank"
            rel="noreferrer"
            href="https://chile.as.com/noticias/futbol/"
            className="decoration-none red-text"
          >
            Diario As
          </a>
        </div>
      )}
      {articles.length === 0 && (
        <div className="text-center">
          <span className="red-text medium">Cargando noticias...</span>
        </div>
      )}
    </>
  );
};
