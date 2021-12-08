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
      const json = await this.fetchMeteoritesInRectangle();
      this.setState({
        meteoritesCoords: json
      })
      console.log(json);
    } catch (e) {
      console.error(e)
    }
  }

  async componentDidUpdate(prevProps) {
    if (prevProps.bounds.equals(this.props.bounds)) {
      try {
        const json = await this.fetchMeteoritesInRectangle();
        this.setState({
          meteoritesCoords: json
        })
        console.log(json);
      } catch (e) {
        console.error(e)
      }
    }
  }

  async fetchMeteoritesInRectangle() {
    // let url = new URL("/api/meteorite_landings")
    // url.params.set();
    
    let bounds = this.props.bounds.toBBoxString().split(",");
    console.log(bounds);
    console.log(this.props.bounds.toBBoxString());
    let resp = await fetch(`/api/meteorite_landings?neLat=${bounds[3]}&neLon=${bounds[2]}&swLat=${bounds[1]}&swLon=${bounds[0]}`);
    if (!resp.ok) {
      throw new Error("Could not fetch");
    }
    let json = await resp.json();
    json.forEach(met => {
      met.geo.coordinates = met.geo.coordinates.reverse();
    })
    console.log(json);
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
    json.forEach(met => {
      met.geo.coordinates = met.geo.coordinates.reverse();
    })
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
        >

          <TileLayer
            url={this.props.params.tileUrl}
            attribution={this.props.params.attribution} />

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
                console.log(item.geo.coordinates);
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
              ? <Popup position={this.state.selectedMeteorite.geo.coordinates} onClose={this.closePopup}><MeteoriteTooltip coordinates={this.state.selectedMeteorite.geo.coordinates}/></Popup>
              : <></>
          }
          <MeteoriteMapMove action={this.props.action}/>
        </MapContainer>
      </React.Fragment >);
  }
}

export default MeteoriteMap;