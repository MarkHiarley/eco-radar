"use client";
import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const BRASIL_BOUNDS: [[number, number], [number, number]] = [
  [-35, -75],
  [7, -31],
];

export default function StepMap() {
  return (
    <MapContainer
      center={[-14.5, -53]}
      zoom={4}
      minZoom={4}
      maxZoom={4}
      zoomControl={false}
      dragging={false}
      scrollWheelZoom={false}
      touchZoom={false}
      doubleClickZoom={false}
      boxZoom={false}
      keyboard={false}
      attributionControl={false}
      className="h-full w-full"
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />
    </MapContainer>
  );
}