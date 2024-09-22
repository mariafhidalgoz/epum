import React from "react";
import { MapboxProvider } from "../../context/MapboxContext";

const Mapbox = ({ children }) => {
  return (
    <MapboxProvider>
      <div id="map" style={{ width: "100vw", height: "100vh" }}/>
      {children}
    </MapboxProvider>
  );
};

export default Mapbox;