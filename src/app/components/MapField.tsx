"use client";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";

interface Foco {
  latitude: number;
  longitude: number;
  frp: number;
}

// Brasil continental + faixa de segurança
const BRASIL_BOUNDS: [[number, number], [number, number]] = [
  [-35, -75],
  [7, -31],
];

export default function MapField({ spots }: { spots: Foco[] }) {
  return (
    <MapContainer
      center={[-14.5, -53]}
      zoom={4}
      minZoom={3}
      maxZoom={11}
      scrollWheelZoom={false}
      dragging
      maxBounds={BRASIL_BOUNDS}
      maxBoundsViscosity={1}
      zoomControl={false}
      className="h-full w-full"
      attributionControl={false}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        subdomains="abcd"
      />
      {spots.map((s, i) => (
        <CircleMarker
          key={i}
          center={[s.latitude, s.longitude]}
          radius={2.5 + Math.min(s.frp, 300) / 45}
          pathOptions={{
            color: "#ea580c",
            weight: 0.6,
            fillColor: "#ea580c",
            fillOpacity: 0.75,
          }}
        />
      ))}
    </MapContainer>
  );
}