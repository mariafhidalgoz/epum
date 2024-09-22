import React, { useState } from "react";
import { useMapboxContext } from "../../context/MapboxContext";

const LayerToggle = ({ layerId, label }) => {
  const [visible, setVisible] = useState(true);
  const map = useMapboxContext();

  const toggleLayer = () => {
    const visibility = visible ? "none" : "visible";
    map.setLayoutProperty(layerId, "visibility", visibility);
    setVisible(!visible);
  };

  return (
    <div>
      <label>
        <input type="checkbox" checked={visible} onChange={toggleLayer}/>
        {label}
      </label>
    </div>
  );
};

export default LayerToggle;