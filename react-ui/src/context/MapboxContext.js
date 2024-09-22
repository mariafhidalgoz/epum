import React, { createContext, useContext, useEffect, useState } from "react";
import mapboxgl from "mapbox-gl";

const MAPBOX_TOKEN = "pk.eyJ1IjoibWFmZWhpemEiLCJhIjoiY20xYmg4OWUzMjVqdTJxczhkdTV1dzRmMCJ9.qQuUvR28FhoBr63vS4GOAA";

mapboxgl.accessToken = MAPBOX_TOKEN;

const MapboxContext = createContext(null);

export const MapboxProvider = ({ children }) => {
  const [map, setMap] = useState(null);

  useEffect(() => {

    const mapInstance = new mapboxgl.Map({
      container: "map", // HTML container id
      style: "mapbox://styles/mapbox/streets-v11", // Map style
      attributionControl: false,
      bounds: [
        [-95.3745, 29.7566],
        [-95.3645, 29.7666]
      ], // bounding box (southwest corner, northeast corner)
    });

    setMap(mapInstance);

    return () => mapInstance.remove();
  }, []);

  return (
    <MapboxContext.Provider value={map}>
      {children}
    </MapboxContext.Provider>
  );
};

export const useMapboxContext = () => useContext(MapboxContext);