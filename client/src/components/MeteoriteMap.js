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
   * @returns 
   */
  render() {
    console.log(this.props.params);
    return (
      <React.Fragment>
        <MapContainer
          center={this.props.params.center}
          zoom={this.props.params.zoom}
          minZoom={this.props.params.minZoom}
          maxZoom={this.props.params.maxZoom}
          zoomControl={false}
          updateWhenZooming={false}
          updateWhenIdle={true}
          preferCanvas={true}
          style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: -1, }}
        >

          <TileLayer
            url={this.props.params.tileUrl}
            attribution={this.props.params.attribution} />

          <MarkerClusterGroup>
            {
              // Loop over the array of geolocations And create markers for each of them.
              this.state.meteoritesCoords.map((coord, index) => {
                <CircleMarker
                  key={index}
                  color={"blue"}
                  radius={5}
                  opacity={1}
                  weight={1}
                  center={coord.geo.type.coordinates}
                  eventHandlers={{
                    click: () => {
                      this.setState({ activeTree: item });
                    },
                  }}
                />
              })
            }
          </MarkerClusterGroup>
        </MapContainer>
      </React.Fragment >);
  }
}

export default MeteoriteMap;