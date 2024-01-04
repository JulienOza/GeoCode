import { useEffect, useState, useCallback, useRef } from "react";
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { PlaceKit } from "@placekit/autocomplete-react";
import plugGreen from "../../assets/plug-icon-green.png";
import "@placekit/autocomplete-js/dist/placekit-autocomplete.css";

function Map() {
  const markers = [
    { coord: [50.649981, 3.108342], popUp: "Salut" },
    { coord: [50.649981, 3.108342] },
    { coord: [50.649981, 3.108342] },
    { coord: [50.649981, 3.108342] },
    { coord: [50.61685, 3.024687] },
    { coord: [50.61685, 3.024687] },
    { coord: [50.61685, 3.024687] },
    { coord: [50.620099, 3.083623] },
    { coord: [50.617371, 3.083473] },
    { coord: [50.630735, 3.034746] },
    { coord: [50.629868, 3.032864] },
    { coord: [50.6207475, 3.075673] },
    { coord: [50.625233, 3.123037] },
    { coord: [50.6353937, 3.0385727] },
    { coord: [50.6319701, 3.0798087] },
  ];

  const customIcon = new Icon({
    iconUrl: plugGreen,
    iconSize: [38, 38],
  });
  const map = useRef(null);
  const [coords, setCoords] = useState({
    lat: 0,
    long: 0,
    accuracy: 0,
  });

  useEffect(() => {
    if (coords && map.current) {
      map.current.setView(coords.lat, coords.long, 13);
    }
  }, [coords, map]);

  const handlePick = useCallback((_, item) => {
    const [lat, lng] = item.coordinates.split(",");
    setCoords([lat, lng]);
  }, []);

  const handleGeolocation = useCallback((_, pos) => {
    setCoords([pos.coords.latitude, pos.coords.longitude]);
  }, []);

  useEffect(() => {
    const getPosition = (position) => {
      const lat = position.coords.latitude;
      const long = position.coords.longitude;
      const { accuracy } = position.coords;
      const currentPosition = { lat, long, accuracy };
      setCoords({
        lat: currentPosition.lat,
        long: currentPosition.long,
        accuracy: currentPosition.accuracy,
      });
    };

    navigator.geolocation.getCurrentPosition(getPosition);
  }, []);

  const hasValidPosition =
    coords.lat !== 0 && coords.long !== 0 && coords.accuracy < 2000;

  return (
    <>
      <form role="search" className="searchBar">
        <PlaceKit
          apiKey={import.meta.env.VITE_API_KEY}
          onPick={handlePick}
          onGeolocation={handleGeolocation}
          placeholder="Rechercher une adresse..."
        />
      </form>
      {hasValidPosition && (
        <MapContainer ref={map} center={[coords.lat, coords.long]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          <MarkerClusterGroup>
            {markers.map((marker) => (
              <Marker position={marker.coord} icon={customIcon}>
                <Popup>{marker.popUp}</Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          {coords && (
            <Marker position={[coords.lat, coords.long]}>
              <Popup>
                <h1>Vous êtes ici</h1>
              </Popup>
            </Marker>
          )}
        </MapContainer>
      )}
    </>
  );
}

export default Map;
