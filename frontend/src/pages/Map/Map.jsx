import { useEffect, useState, useCallback, useRef } from "react";
import { useLoaderData } from "react-router-dom";
import "./Map.scss";
import "leaflet/dist/leaflet.css";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import { Icon } from "leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import { PlaceKit } from "@placekit/autocomplete-react";
import plugGreen from "../../assets/plug-icon-green.png";
import "@placekit/autocomplete-js/dist/placekit-autocomplete.css";
import Navbar from "../../components/Navbar/Navbar";
import useStore from "../../store/AuthProvider";

function Map() {
  const {
    setHandleModal,
    setOpenBooking,
    setSelectedStation,
    open,
    setOpen,
    auth,
    setCarAvailableList,
    carAvailableList,
  } = useStore();
  const chargepoint = useLoaderData();

  const groupedData = {};

  chargepoint.forEach((e) => {
    if (!groupedData[e.charge_point_id_fr]) {
      groupedData[e.charge_point_id_fr] = { ...e };
    } else if (
      !groupedData[e.charge_point_id_fr].plug_type.includes(e.plug_type)
    ) {
      groupedData[e.charge_point_id_fr].plug_type += `,${e.plug_type}`;
    }
  });

  const chargepointCleaned = Object.values(groupedData);

  const groupedChargedpoints = {};

  chargepointCleaned.forEach((e) => {
    if (!groupedChargedpoints[e.station_id]) {
      groupedChargedpoints[e.station_id] = { ...e };
    }
  });

  const stations = Object.values(groupedChargedpoints);

  const markers = stations.map((e) => ({
    coord: [e.y_latitude, e.x_longitude],
    stationName: `${e.station_name}`,
    stationAdress: `${e.adress}`,
    id: `${e.station_id}`,
    stationPlugType: `${e.plug_type}`,
  }));

  const customIcon = new Icon({
    iconUrl: plugGreen,
    iconSize: [38, 38],
  });
  const map = useRef(null);
  const [coords, setCoords] = useState({
    lat: 50.633333,
    long: 3.066667,
  });

  useEffect(() => {
    if (coords && map.current) {
      map.current.setView([coords.lat, coords.long], 13);
    }
  }, [coords, map]);

  const handlePick = useCallback((_, item) => {
    setCoords({
      lat: item.lat,
      long: item.lng,
    });
  });

  const handleGeolocation = useCallback((_, pos) => {
    setCoords({
      lat: pos.coords.latitude,
      long: pos.coords.longitude,
    });
  }, []);

  useEffect(() => {
    const getPosition = (position) => {
      setCoords({
        lat: position.coords.latitude,
        long: position.coords.longitude,
        accuracy: position.coords.accuracy,
      });
    };
    navigator.geolocation.getCurrentPosition(getPosition);
  }, []);

  const hasValidPosition = coords.lat !== 0 && coords.long !== 0;

  useEffect(() => {
    const fetchCarAvailable = async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_URL}/api/users/${auth.user.id}/car`,
          {
            method: "GET",
            headers: {
              "Content-Type": "application/json",
            },
            credentials: "include",
          }
        );

        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }

        const data = await response.json();
        setCarAvailableList(data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };

    fetchCarAvailable();
  }, [auth, carAvailableList]);

  return (
    <>
      <form role="search" className="searchBar">
        <label htmlFor="searchLabel" className="searchLabel">
          Adresse
        </label>
        <PlaceKit
          apiKey={import.meta.env.VITE_API_KEY}
          onPick={handlePick}
          onGeolocation={handleGeolocation}
          placeholder="Rechercher une adresse..."
          id="searchLabel"
        />
      </form>
      {hasValidPosition && (
        <MapContainer ref={map} center={[coords.lat, coords.long]} zoom={13}>
          <TileLayer
            attribution='&copy; <a href="https://www.stadiamaps.com/" target="_blank">Stadia Maps</a> &copy; <a href="https://openmaptiles.org/" target="_blank">OpenMapTiles</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://tiles.stadiamaps.com/tiles/osm_bright/{z}/{x}/{y}{r}.png"
          />
          <MarkerClusterGroup>
            {markers.map((marker) => (
              <Marker key={marker.id} position={marker.coord} icon={customIcon}>
                <Popup>
                  <article className="popUpContainer">
                    <h2>{marker.stationName}</h2>
                    <ul>
                      <li className="popUpText">
                        <span>Adresse</span> : {marker.stationAdress}
                      </li>
                      <li className="popUpText">
                        <span>Prise</span> : {marker.stationPlugType}
                      </li>
                    </ul>
                    <button
                      type="button"
                      className="markerButton"
                      onClick={() => {
                        setOpen(true);
                        setHandleModal(false);
                        setSelectedStation(marker.id);
                        setOpenBooking({
                          page1: true,
                          page2: false,
                          page3: false,
                        });
                      }}
                    >
                      Réserver
                    </button>
                  </article>
                </Popup>
              </Marker>
            ))}
          </MarkerClusterGroup>
          {coords && (
            <Marker position={[coords.lat, coords.long]}>
              <Popup>
                <strong>Vous êtes ici</strong>
              </Popup>
            </Marker>
          )}
          <Navbar
            stations={stations}
            position={[coords.lat, coords.long]}
            open={open}
            setOpen={setOpen}
          />
        </MapContainer>
      )}
    </>
  );
}

export default Map;
