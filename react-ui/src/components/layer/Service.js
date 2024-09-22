import React from "react";
import LayerGroup from "./LayerGroup";

const Service = ({ name, layers }) => {
  return (
    <>
      <label>
        {name}
      </label>
      {layers.map((layer) => (
        <LayerGroup layer={layer}/>
      ))}
    </>
  );
};

export default Service;