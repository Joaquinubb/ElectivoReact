// src/contexts/ClubesContext.jsx
import React, { createContext, useState, useEffect } from "react";

export const ClubesContext = createContext();

export const ClubesProvider = ({ children }) => {
  const [clubes, setClubes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchClubes = async () => {
      const apiUrl = process.env.REACT_APP_API;

      try {
        const response = await fetch(`${apiUrl}/clubes`, {
          method: "GET",
        });

        if (!response.ok) {
          throw new Error("Respuesta de red no fue satisfactoria");
        }

        const clubesData = await response.json();
        setClubes(clubesData);
        setLoading(false);
      } catch (err) {
        console.error("Error al obtener los clubes:", err);
        setError("No se pudo cargar los clubes. Inténtalo de nuevo más tarde.");
        setLoading(false);
      }
    };

    fetchClubes();
  }, []);

  return (
    <ClubesContext.Provider value={{ clubes, loading, error }}>
      {children}
    </ClubesContext.Provider>
  );
};
