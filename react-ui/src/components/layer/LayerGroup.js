import React from "react";
import LayerSource from "./LayerSource";
import Layer from "./Layer";
import LayerToggle from "./LayerToggle";

const LayerGroup = ({ layer }) => {

  const sourceId = layer.id + "_source";
  console.log("layer")
  console.log(layer)

  return (
    <div key={layer.id}>
      <LayerSource sourceId={sourceId} geojson={layer.geojson}/>
      <LayerToggle layerId={layer.id} label={layer.name}/>
      <Layer
        layerId={layer.id}
        sourceId={sourceId}
        layerType={layer.type}
        layerPaint={layer.paint}
      />
    </div>
  )
};

export default LayerGroup;