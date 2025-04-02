"use client";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import L from "leaflet";
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerIcon2x from "leaflet/dist/images/marker-icon-2x.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

interface MarkerData {
  latitude: number;
  longitude: number;
  frp: number;
}

export default function MapComponent({ markerList = [] }) {
  // if (typeof window !== "undefined") {
  //   const customMarkerIcon = L.icon({
  //     iconUrl: markerIcon.src,
  //     iconRetinaUrl: markerIcon2x.src || markerIcon2x,
  //     shadowUrl: markerShadow.src || markerShadow,
  //     iconSize: [25, 41],
  //     iconAnchor: [12, 41],
  //     popupAnchor: [1, -34],
  //     tooltipAnchor: [16, -28],
  //     shadowSize: [41, 41],
  //   });

  //   L.Marker.prototype.options.icon = customMarkerIcon;
  // }

  const createColoredIcon = () => {
    return L.divIcon({
      html: `
        <div class="marker bg-blue-500"></div>
      `,
      iconSize: [24, 24],
      iconAnchor: [12, 12],
      popupAnchor: [0, -12]
    });
  };

  return (
    <MapContainer
      center={[-3.718, -38.543]}
      zoom={13}
      scrollWheelZoom={true}
      className="h-full w-full"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {markerList.length > 0 ? (
        markerList.map((marker: MarkerData, index) => (
          <Marker key={index} position={[marker.latitude, marker.longitude] } icon={createColoredIcon()}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        ))
      ) : (
        <Marker position={[-3.718, -38.543]} icon={createColoredIcon()}>
          <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup>
        </Marker>
      )}
    </MapContainer>
  );
}
