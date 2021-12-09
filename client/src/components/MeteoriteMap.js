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
import MeteoriteTooltip from "./MeteoriteTooltip";
import MeteoriteMapMove from "./MeteoriteMapMove";

/**
 * The main meteorite map
 */
class MeteoriteMap extends Component {
  /**
   * The constructor sets the values of the states
   * @param {*} props 
   */
  constructor(props) {
    // super call to initialize component
    super(props);
    // set up the states
    this.state = {
      meteoritesCoords: [],
      selectedMeteorite: null
    };

    this.closePopup = this.closePopup.bind(this);
  }

  /**
   * 
   */
  async componentDidMount() {
    try {
      const json = await this.fetchMeteoritesInRectangle(this.props.bounds);
      this.setState({
        meteoritesCoords: json
      });
      console.log(json);
    } catch (e) {
      console.error(e);
    }
  }

  async componentDidUpdate(oldProps) {
    if (!oldProps.bounds.contains(this.props.bounds)) {
      console.log("Changes in bounds");
      try {
        const json = await this.fetchMeteoritesInRectangle(this.props.bounds);
        this.setState({
          meteoritesCoords: json
        });
        // console.log("other json" + json);
      } catch (e) {
        console.error(e);
      }
    }
  }

  async fetchMeteoritesInRectangle(boundingBox) {
    // let url = new URL("/api/meteorite_landings")
    // url.params.set();
    console.log(boundingBox);
    // boundingBox = maxBounds.contains(boundingBox) ? boundingBox : maxBounds;
    // console.log(boundingBox.equals(maxBounds));
    const neLat = boundingBox.getNorth();
    const neLon = boundingBox.getEast();
    const swLon = boundingBox.getSouth();
    const swLat = boundingBox.getWest();
    const url = `/api/meteorite_landings?neLat=${neLat}&neLon=${neLon}&swLat=${swLon}&swLon=${swLat}`;
    console.log(url);
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("Could not fetch");
    }
    const json = await resp.json();
    json.forEach(met => {
      met.geo.coordinates = met.geo.coordinates.reverse();
    });
    console.log(json.length);
    // console.log("Json" + json);
    return json;
  }

  /**
   * 
   * @returns 
   */
  async fetchAllMeteorites() {
    let resp = await fetch("/api/");
    if (!resp.ok) {
      throw new Error("Could not fetch");
    }
    let json = await resp.json();
    json.forEach(async (met) => {
      met.geo.coordinates = met.geo.coordinates.reverse();
    });
    return json;
  }

  closePopup() {
    this.setState({
      selectedMeteorite: null
    });
  }

  // swapCoords(item) {
  //   return item.reverse();
  // }

  /**
   * 
   * @returns 
   */
  render() {
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
          maxBounds={this.props.maxBounds}
        >

          <TileLayer
            url={this.props.params.tileUrl}
            attribution={this.props.params.attribution}
            noWrap={true} />

          <MarkerClusterGroup
            spiderfyOnMaxZoom={false}
            zoomToBoundsOnClick={true}
            showCoverageOnHover={true}
            removeOutsideVisibleBounds={false}
            disableClusteringAtZoom={this.props.params.maxZoom}
          >
            {
              // Loop over the array of geolocations And create markers for each of them.
              this.state.meteoritesCoords.map((item, index) => {
                // console.log(item.geo.coordinates);
                return (
                  < CircleMarker
                    key={index}
                    color={"red"}
                    radius={5}
                    opacity={1}
                    weight={1}
                    center={item.geo.coordinates}
                    eventHandlers={{
                      click: () => {
                        this.setState({ selectedMeteorite: item });
                      },
                    }}
                  />);
              })
            }
          </MarkerClusterGroup>
          {
            this.state.selectedMeteorite !== null
              ? <Popup position={this.state.selectedMeteorite.geo.coordinates} onClose={this.closePopup}><MeteoriteTooltip coordinates={this.state.selectedMeteorite.geo.coordinates} /></Popup>
              : <></>
          }
          <MeteoriteMapMove action={this.props.action} />
        </MapContainer>
      </React.Fragment >);
  }
}

export default MeteoriteMap;