import "./App.css";
import React, { useEffect, useState } from "react";
import Mapbox from "./components/mapbox/Mapbox";
import Service from "./components/layer/Service";
import { data_services } from "./data/data_services"


const App = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchLayers = async () => {
      // This can be change it to fetch the data from a REST API with the links of all sources
      const data = data_services;
      setServices(data);
    };

    fetchLayers();
  }, []);

  return (
    <div className="App">
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
    </div>
  );
};

export default App;