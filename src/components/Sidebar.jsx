import React, { useState, useEffect } from "react";

export function Sidebar() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        const apiUrl = process.env.REACT_APP_API;

        const response = await fetch(`${apiUrl}/clubes`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Network response was not ok");
        }

        const data = await response.json();
        setData(data);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) {
    return (
      <div className="p-3 blue flex-grow-1 overflow-auto mt-5 pt-4 sidebar-content">
        <p className="text-blanco text-12 decoration-none medium">
          Cargando...
        </p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-3 blue flex-grow-1 overflow-auto mt-5 pt-4 sidebar-content">
        <p className="text-blanco text-12 decoration-none medium">
          No hay clubes
        </p>
      </div>
    );
  }

  if (!data || data.length === 0) {
    return (
      <div className="p-3 blue flex-grow-1 overflow-auto mt-5 pt-4 sidebar-content">
        <p className="text-blanco text-12 decoration-none medium">
          No hay clubes
        </p>
      </div>
    );
  }

  return (
    <div className="p-3 blue flex-grow-1 overflow-auto mt-5 pt-4 sidebar-content">
      {data &&
        data.map((club) => (
          <div key={club.id_club} className="mb-2">
            <a
              href={`/clubes/${club.nombre_club}`}
              className="text-blanco text-12 decoration-none medium"
            >
              <img
                src={club.escudo_club}
                alt="Escudo"
                height={30}
                width={30}
                className="me-2"
              />
              {club.nombre_club}
            </a>
          </div>
        ))}
    </div>
  );
}
