"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import PinAmarelo from "@/app/assets/pin-amarelo.png";
import PinLaranja from "@/app/assets/pin-laranja.png";
import PinVermelho from "@/app/assets/pin-vermelho.png";
import PinRoxo from "@/app/assets/pin-roxo.png";

interface MarkerData {
  latitude: number;
  longitude: number;
  frp: number;
}

export default function MapComponent({ markerList = [] }) {
  const customIcon = (frp: number) => {
    let PinImage;
    if (frp < 5) {
      PinImage = PinAmarelo;
    } else if (frp < 20 && frp >= 5) {
      PinImage = PinLaranja;
    } else if (frp < 50 && frp >= 20) {
      PinImage = PinVermelho;
    } else {
      PinImage = PinRoxo;
    }

    return new L.Icon({
      iconUrl: PinImage.src,
      iconSize: [48, 48],
      iconAnchor: [22, 38],
      popupAnchor: [2, -36],
    });
  };

  const customPopUp = (frp: number) => {
    let nivelQueimada;
    if (frp < 5) {
      nivelQueimada = "Baixo";
    } else if (frp < 20 && frp >= 5) {
      nivelQueimada = "Média";
    } else if (frp < 50 && frp >= 20) {
      nivelQueimada = "Grande ⚠️";
    } else {
      nivelQueimada = "Extrema ⚠️";
    }

    return <p><b>Essa queimada é considerada uma queimada de nível:</b> {nivelQueimada}</p>;
  }

  return (
    <MapContainer
      center={[-3.718, -38.543]}
      zoom={13}
      minZoom={4}
      maxZoom={18}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        noWrap={true}
      />
      {markerList.length > 0 ? (
        markerList.map((marker: MarkerData, index) => (
          <Marker
            key={index}
            position={[marker.latitude, marker.longitude]}
            icon={customIcon(marker.frp)}
          >
            <Popup>
              {customPopUp(marker.frp)}
            </Popup>
          </Marker>
        ))
      ) : (
        <Marker position={[-3.718, -38.543]} icon={customIcon(1)}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
