import { useEffect } from "react";
import { useMapboxContext } from "../../context/MapboxContext";

const LayerSource = ({ sourceId, geojson }) => {
  const map = useMapboxContext();

  useEffect(() => {
    if (!map) return;

    const fetchData = async () => {
      // This can be change it to fetch the data from a REST API with the link of the layer
      const data = geojson;

      if (map.getSource(sourceId)) return;

      map.addSource(sourceId, {
        type: "geojson",
        data,
      });
    };

    fetchData();

  }, [map, sourceId]);

  return null;
};

export default LayerSource;