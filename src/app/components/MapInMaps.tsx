"use client";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const MapComponentWithNoSSR = dynamic(
  () => import("./MapComponent"),
  {
    ssr: false,
  }
);

export default function MapInMaps() {
  const [markerList, setMarkerList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch("/api/get-data");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const data = await response.json();
        console.log(data);
        setMarkerList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError(String(error));
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  if (error) {
    return <div>Erro: {error}</div>;
  }

  if(loading){
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="loader">Carregando mapa...</div>
      </div>
    );
  }

  return (
    <div className="w-full h-full object-cover">
      <MapComponentWithNoSSR markerList={markerList} />
    </div>
  );
}