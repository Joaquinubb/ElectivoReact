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
    return <div className="p-3">Cargando...</div>;
  }

  if (error) {
    return <div className="p-3">Error: {error.message}</div>;
  }

  return (
    <div className="p-3 blue flex-grow-1 overflow-auto mt-5 pt-5 sidebar-content">
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
                className="me-2"
              />
              {club.nombre_club}
            </a>
          </div>
        ))}
    </div>
  );
}
