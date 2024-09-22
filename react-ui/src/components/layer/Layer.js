import { useEffect } from "react";
import { useMapboxContext } from "../../context/MapboxContext";

const Layer = ({ layerId, sourceId, layerType, layerPaint }) => {
  const map = useMapboxContext();

  useEffect(() => {
    if (!map) return;

    if (!map.getLayer(layerId)) {
      map.addLayer({
        id: layerId,
        type: layerType,
        source: sourceId,
        paint: layerPaint,
      });
    }

    return () => {
      if (map && map.getLayer(layerId)) {
        map.removeLayer(layerId);
      }
    };
  }, [map, layerId, sourceId, layerType, layerPaint]);

  return null;
};

export default Layer;