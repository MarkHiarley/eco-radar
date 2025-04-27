"use client";
import { useEffect, useState } from "react";
import "leaflet/dist/leaflet.css";
import dynamic from "next/dynamic";

const MapComponentWithNoSSR = dynamic(() => import("./MapComponent"), {
  ssr: false,
});

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
    return(
    <div className="flex justify-center items-center w-full h-full text-center">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold text-red-500">Erro ao carregar o mapa</h1>
        <h2 className="text-2xl">Tente novamente mais tarde</h2>
        <p className="text-gray-700 text-sm">{error}</p>
      </div>
    </div>
    )
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 rounded-full bg-gray-500 animate-bounce"></div>
          <div className="w-4 h-4 rounded-full bg-gray-500 animate-bounce [animation-delay:-.3s]"></div>
          <div className="w-4 h-4 rounded-full bg-gray-500 animate-bounce [animation-delay:-.5s]"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="w-full h-full object-cover">
      <MapComponentWithNoSSR markerList={markerList} />
    </div>
  );
}
