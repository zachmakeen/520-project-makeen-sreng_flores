import React, { Component } from "react";
import {
  MapContainer,
  TileLayer,
  CircleMarker,
  Popup
} from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-markercluster";
import "leaflet/dist/leaflet.css";
import "react-leaflet-markercluster/dist/styles.min.css";

/**
 * The main meteorite map
 */
class MeteoriteMap extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    // super call to initialize component
    super(props);
    this.state = {
      meteoritesCoords: [],
      selectedMeteoritePoint: null
    };
  }
  /**
   * 
   */
  render() {
    return (
      <React.Fragment>
        <MapContainer >
          <TileLayer />
          <MarkerClusterGroup>
            {/*iterate through array using map function*/}
            <CircleMarker />
          </MarkerClusterGroup>
        </MapContainer>
      </React.Fragment>);
  }
}

export default MeteoriteMap;