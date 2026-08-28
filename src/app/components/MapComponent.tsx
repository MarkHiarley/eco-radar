"use client";
import { memo, useEffect, useMemo, useState } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import PinAmarelo from "@/app/assets/pin-amarelo.png";
import PinLaranja from "@/app/assets/pin-laranja.png";
import PinVermelho from "@/app/assets/pin-vermelho.png";
import PinRoxo from "@/app/assets/pin-roxo.png";
import ButtonMobile from "./ButtonMobile";
import LateralBar from "./LateralBar";

interface MarkerData {
  latitude: number;
  longitude: number;
  frp: number;
}

const BRASIL_BOUNDS: [[number, number], [number, number]] = [
  [-35, -75],
  [7, -31],
];

const MAX_PONTOS = 5000;
const ZOOM_PINS = 8; // a partir deste zoom todos viram pin

const corPorFrp = (frp: number) => {
  if (frp < 5) return "#fbbf24";
  if (frp < 20) return "#fb923c";
  if (frp < 50) return "#dc2626";
  return "#a855f7";
};

const pinPorFrp = (frp: number) => {
  let src;
  if (frp < 5) src = PinAmarelo;
  else if (frp < 20) src = PinLaranja;
  else if (frp < 50) src = PinVermelho;
  else src = PinRoxo;
  return new L.Icon({
    iconUrl: src.src,
    iconSize: [44, 44],
    iconAnchor: [20, 40],
    popupAnchor: [2, -36],
  });
};

const nivelPorFrp = (frp: number) => {
  if (frp < 5) return "Baixo";
  if (frp < 20) return "Média";
  if (frp < 50) return "Grande ⚠️";
  return "Extrema ⚠️";
};

function ZoomTracker({ onZoom }: { onZoom: (zoom: number) => void }) {
  const map = useMap();
  useEffect(() => {
    const report = () => onZoom(map.getZoom());
    report();
    map.on("zoomend", report);
    return () => {
      map.off("zoomend", report);
    };
  }, [map, onZoom]);
  return null;
}

const Foco = memo(function Foco({
  lat,
  lng,
  frp,
  pin,
}: {
  lat: number;
  lng: number;
  frp: number;
  pin: boolean;
}) {
  const icon = useMemo(() => pinPorFrp(frp), [frp]);

  const popup = (
    <Popup>
      <p className="m-0 text-sm">
        <b>Queimada de nível:</b> {nivelPorFrp(frp)}
        <br />
        <span className="text-xs text-gray-600">
          frp {frp} · {lat.toFixed(3)}, {lng.toFixed(3)}
        </span>
      </p>
    </Popup>
  );

  if (pin) {
    return (
      <Marker position={[lat, lng]} icon={icon}>
        {popup}
      </Marker>
    );
  }
  return (
    <CircleMarker
      center={[lat, lng]}
      radius={4.5}
      pathOptions={{
        color: "#1c1917",
        weight: 0.4,
        fillColor: corPorFrp(frp),
        fillOpacity: 0.85,
      }}
    >
      {popup}
    </CircleMarker>
  );
})


export default function MapComponent({ markerList = [] }: { markerList?: MarkerData[] }) {
  const [isOpen, setIsOpen] = useState(false);
  const [zoom, setZoom] = useState(4);
  const pins = zoom >= ZOOM_PINS;

  const sampled =
    markerList.length > MAX_PONTOS
      ? markerList.filter((_, i) => i % Math.ceil(markerList.length / MAX_PONTOS) === 0)
      : markerList;

  return (
    <div className="flex h-screen w-screen flex-row">
      <LateralBar isOpen={isOpen} setIsOpen={setIsOpen} />
      <MapContainer
        center={[-14.5, -53]}
        zoom={4}
        minZoom={3}
        maxZoom={11}
        scrollWheelZoom={true}
        maxBounds={BRASIL_BOUNDS}
        maxBoundsViscosity={1}
        className="h-full w-full"
      >
        <ZoomTracker onZoom={setZoom} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          subdomains="abc"
          noWrap={true}
        />
        {sampled.map((marker, index) => (
          <Foco
            key={index}
            lat={marker.latitude}
            lng={marker.longitude}
            frp={marker.frp}
            pin={pins}
          />
        ))}
        <ButtonMobile toggleSidebar={() => setIsOpen(!isOpen)} />
      </MapContainer>
    </div>
  );
}