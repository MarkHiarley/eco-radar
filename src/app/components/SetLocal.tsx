'use client';
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useState, useCallback } from "react";
import L from 'leaflet';

const IconPadroa = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41]
});
L.Marker.prototype.options.icon = IconPadroa;

type Coordinates = [number, number];

const DEFAULT_CENTER: Coordinates = [-3.718, -38.543];
const DEFAULT_ZOOM = 13;

const SetLocal = () => {
  const [position, setPosition] = useState<Coordinates | null>(null);

  const EnviaCoords = useCallback((coords: Coordinates) => {
    setPosition(coords);
    console.log('New position:', coords);
  }, []);

  const handleMarkerClick = useCallback((e: L.LeafletMouseEvent) => {
    const newPosition: Coordinates = [e.latlng.lat, e.latlng.lng];
    setPosition(newPosition);
    console.log('Marker clicked at:', newPosition);
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center border-2 border-black">
      <MapContainer
        center={DEFAULT_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={4}
        maxZoom={18}
        scrollWheelZoom={true}
        className="w-10/12 h-10/12"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          noWrap
        />

        <LocationMarker onClick={EnviaCoords} />

        {position && (
          <Marker
            position={position}
            eventHandlers={{
              click: handleMarkerClick,
            }}
          />
        )}
      </MapContainer>
    </div>
  );
};


const LocationMarker = ({ onClick }: { onClick: (coords: Coordinates) => void }) => {
  useMapEvents({
    click(e) {
      onClick([e.latlng.lat, e.latlng.lng]);
    },
  });
  return null;
};

export default SetLocal;