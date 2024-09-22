import "./App.css";
import React, { Suspense, useEffect, useState } from "react";
import Service from "./components/layer/Service";
import { data_services } from "./data/data_services"
import { useMapboxContext } from "./context/MapboxContext";


// Lazy load the Mapbox component
const Mapbox = React.lazy(() => import("./components/mapbox/Mapbox"));

const App = () => {
  const map = useMapboxContext();
  const [services, setServices] = useState([]);
  const [mapVisible, setMapVisible] = useState(false);

  useEffect(() => {

    const fetchLayers = async () => {
      // This can be change it to fetch the data from a REST API with the links of all sources
      const data = data_services;
      setServices(data);
    };

    fetchLayers();

    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setMapVisible(true);
          observer.disconnect(); // Stop observing once map is visible
        }
      });
    });

    if (map) {
      observer.observe(map);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="App">
      <Suspense fallback={<div style={{ height: "100%", width: "100%" }}>Loading Map...</div>}>
        <Mapbox>
          <div className="Layers">
            {services.map((service) => (
              <Service
                key={service.id}
                name={service.name}
                layers={service.layers}
              />
            ))}
          </div>
        </Mapbox>
      </Suspense>
    </div>
  );
};

export default App;