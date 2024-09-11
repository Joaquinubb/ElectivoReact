import React, { useState, useEffect } from "react";
import "./Sidebar.css";

export function Sidebar() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;

      let data = await fetch(`${apiUrl}/clubes`, {
        method: "GET",
      }).then((response) => response.json());

      setData(data);
    }

    fetchData();
  }, []);

  return (
    <div className="p-3 blue-size">
      {data &&
        data.map((club) => (
          <div className="mb-2">
            <a
              href={`/clubes/${club.id_club}`}
              className="text-blanco text-12 decoration-none medium"
            >
              <img
                src={`${club.escudo_club}`}
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
