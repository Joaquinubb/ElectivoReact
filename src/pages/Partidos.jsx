import html2canvas from "html2canvas";
import jsPDF from "jspdf";
import React, { Fragment, useState, useEffect, useCallback } from "react";
import { Header, Sidebar } from "../components/index";
import { CardPartido } from "../components/CardPartido";
import { CardPartidoAnterior } from "../components/CardPartidoAnterior";

export function Partidos() {
  const [allData, setAllData] = useState([]);
  const [upcomingMatches, setUpcomingMatches] = useState([]);
  const [pastMatches, setPastMatches] = useState([]);
  const [showPastMatches, setShowPastMatches] = useState(false);
  const upcomingMatchesRef = React.createRef();

  const filterMatches = useCallback(
    (data, showPastMatches) => {
      const today = new Date();
      const upcoming = data.filter((partido) => {
        const partidoDate = parseDate(partido.fecha_partido);
        return partidoDate >= today;
      });

      const past = data.filter((partido) => {
        const partidoDate = parseDate(partido.fecha_partido);
        return partidoDate < today;
      });

      setUpcomingMatches(upcoming);
      setPastMatches(showPastMatches ? past : []);
    },
    [] // No es necesario incluir dependencias
  );

  const handleDownloadPDF = async () => {
    const element = upcomingMatchesRef.current;
    if (!element) return;

    // Esperar a que todas las imágenes se carguen
    const images = element.getElementsByTagName("img");
    const loadPromises = Array.from(images).map((img) => {
      return new Promise((resolve, reject) => {
        if (img.complete) {
          resolve();
        } else {
          img.onload = resolve;
          img.onerror = reject;
        }
      });
    });

    try {
      await Promise.all(loadPromises);

      const canvas = await html2canvas(element, {
        scale: 2,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "pt",
        format: [canvas.width, canvas.height],
      });
      const imgProps = pdf.getImageProperties(imgData);
      const pdfWidth = pdf.internal.pageSize.getWidth();
      const pdfHeight = (imgProps.height * pdfWidth) / imgProps.width;

      pdf.addImage(
        imgData,
        "PNG",
        0,
        0,
        pdfWidth,
        pdfHeight,
        undefined,
        "FAST"
      );
      pdf.save("Próximos partidos.pdf");
    } catch (error) {
      console.error("Error loading images:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const apiUrl = process.env.REACT_APP_API;
      let data = await fetch(`${apiUrl}/partidos`, {
        method: "GET",
      }).then((response) => response.json());
      setAllData(data);
      filterMatches(data, showPastMatches);
    }
    fetchData();
  }, [filterMatches, showPastMatches]);

  const parseDate = (fecha) => {
    const [, day, month, year, time] = fecha
      .replace(/,/g, "")
      .replace(/ de /g, " ")
      .replace(" a las", "")
      .split(" ");
    const months = {
      enero: "January",
      febrero: "February",
      marzo: "March",
      abril: "April",
      mayo: "May",
      junio: "June",
      julio: "July",
      agosto: "August",
      septiembre: "September",
      octubre: "October",
      noviembre: "November",
      diciembre: "December",
    };
    return new Date(`${months[month]} ${day}, ${year} ${time}`);
  };

  const handleShowPastMatches = () => {
    setShowPastMatches(!showPastMatches);
    filterMatches(allData, !showPastMatches);
  };

  return (
    <Fragment>
      <div className="container-fluid d-flex flex-column vh-100">
        <Header></Header>
        <div className="row flex-grow-1">
          <div className="col-sidebar blue d-flex flex-column sidebar-container">
            <Sidebar></Sidebar>
          </div>
          <div className="col mt-5 pt-4 content-container">
            <div className="bg-white p-3">
              <div className="d-flex justify-content-between">
                <h2 className="red-text bold text-20">
                  Partidos de la Chilean Premier League
                </h2>
                <button
                  onClick={handleShowPastMatches}
                  className="btn btn-danger bg-red text-white bold"
                >
                  {showPastMatches
                    ? "Ocultar Partidos Anteriores"
                    : "Mostrar Partidos Anteriores"}
                </button>
              </div>

              <div className="row mt-4" ref={upcomingMatchesRef}>
                {upcomingMatches &&
                  upcomingMatches.map((partido) => (
                    <CardPartido
                      key={partido.id_partido}
                      id_partido={partido.id_partido}
                      fecha_partido={partido.fecha_partido}
                      club_local={partido.club_local}
                      club_visitante={partido.club_visitante}
                      arbitro={partido.arbitro}
                      estadio={partido.estadio}
                    />
                  ))}
              </div>
              <div className="d-flex justify-content-end">
                <button
                  className="btn custom-border-btn bg-red text-blanco fixed-right-bottom"
                  onClick={handleDownloadPDF}
                >
                  <svg
                    width="20"
                    height="20"
                    className="me-3"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M12 0H4C3.46957 0 2.96086 0.210714 2.58579 0.585786C2.21071 0.960859 2 1.46957 2 2V18C2 18.5304 2.21071 19.0391 2.58579 19.4142C2.96086 19.7893 3.46957 20 4 20H16C16.5304 20 17.0391 19.7893 17.4142 19.4142C17.7893 19.0391 18 18.5304 18 18V6L12 0ZM7.498 14.19C7.189 14.48 6.733 14.61 6.202 14.61C6.09902 14.6119 5.99605 14.6059 5.894 14.592V16.018H5V12.082C5.40347 12.022 5.81112 11.9946 6.219 12C6.776 12 7.172 12.106 7.439 12.319C7.693 12.521 7.865 12.852 7.865 13.242C7.864 13.634 7.734 13.965 7.498 14.19ZM11.305 15.545C10.885 15.894 10.246 16.06 9.465 16.06C8.997 16.06 8.666 16.03 8.441 16V12.083C8.84462 12.0243 9.25214 11.9966 9.66 12C10.417 12 10.909 12.136 11.293 12.426C11.708 12.734 11.968 13.225 11.968 13.93C11.968 14.693 11.689 15.22 11.305 15.545ZM15 12.77H13.468V13.681H14.9V14.415H13.468V16.019H12.562V12.03H15V12.77ZM12 7H11V2L16 7H12Z"
                      fill="#EAE8E0"
                    />
                  </svg>
                  Descargar PDF
                </button>
              </div>
              {showPastMatches && pastMatches.length > 0 && (
                <div className="mt-5">
                  <h2 className="red-text bold text-16">Partidos Anteriores</h2>
                  <div className="row mt-4">
                    {pastMatches.map((partido) => (
                      <CardPartidoAnterior
                        key={partido.id_partido}
                        id_partido={partido.id_partido}
                        fecha_partido={partido.fecha_partido}
                        club_local={partido.club_local}
                        club_visitante={partido.club_visitante}
                        arbitro={partido.arbitro}
                        estadio={partido.estadio}
                      />
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </Fragment>
  );
}
