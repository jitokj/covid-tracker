import React from 'react';
import { Map as LeafletMap,TileLayer,} from "react-leaflet";
import "./Map.css";

const Map = ({center,zoom}) => {

 
    return (
        <div className="map">
          <LeafletMap center={center} zoom={zoom} scrollWheelZoom={false}>
          
          <TileLayer
      attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
          </LeafletMap>
        </div>
    );
};

export default Map;