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
   * This function to be called only when the component is mounted to the 
   * screen for the first time, it will fetch the data set using the props' bounds
   * information and set the state for re-rendering of the view.
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

  /**
   * The function to be called upon every time this component is updated.
   * It will look if the current bounding box contains the new bounding box, if so
   * it will not perform any fetch actions, otherwise it will fetch for new data set 
   * from the server.
   * @param {*} oldProps 
   */
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

  /**
   * The function fetches to the server the data set within the bounds of a rectangle.
   * It returns the values of the data set and reverses the coordinates since the server uses
   * the coordinates in terms of long, lat format.
   * @param {LatLngBounds} boundingBox 
   * @returns {Array}
   */
  async fetchMeteoritesInRectangle(boundingBox) {

    // console.log(boundingBox);
    // Get the coordinates for the query.
    const neLat = boundingBox.getNorth();
    const neLon = boundingBox.getEast();
    const swLon = boundingBox.getSouth();
    const swLat = boundingBox.getWest();

    // eslint-disable-next-line max-len
    const url = `/api/meteorite_landings?neLat=${neLat}&neLon=${neLon}&swLat=${swLon}&swLon=${swLat}`;

    console.log(url);
    // Perform a fetch to the server
    const resp = await fetch(url);
    if (!resp.ok) {
      throw new Error("Could not fetch");
    }

    // Convert to json
    const json = await resp.json();

    // Reverse the coordinates of the result. 
    json.forEach(met => {
      met.geo.coordinates = met.geo.coordinates.reverse();
    });

    console.log(json.length);
    // console.log("Json" + json);
    return json;
  }

  /**
   * Array of Json objects
   * It returns the values of the data set and reverses the coordinates since the server uses
   * the coordinates in terms of long, lat format.
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

  /**
   * This function renders the component to the user's screen by returning 
   * the elements to be displayed.
   * @returns {React.Fragment}
   */
  render() {
    return (
      <React.Fragment>
        <MapContainer
          center={this.props.center}
          zoom={this.props.zoom}
          minZoom={this.props.minZoom}
          maxZoom={this.props.maxZoom}
          zoomControl={false}
          updateWhenZooming={false}
          updateWhenIdle={true}
          preferCanvas={true}
          style={{ width: "100%", position: "absolute", top: 0, bottom: 0, zIndex: -1, }}
          maxBounds={this.props.maxBounds}
        >

          <TileLayer
            url={this.props.tileUrl}
            attribution={this.props.attribution}
            noWrap={true} />

          <MarkerClusterGroup
            spiderfyOnMaxZoom={false}
            zoomToBoundsOnClick={true}
            showCoverageOnHover={true}
            removeOutsideVisibleBounds={false}
            disableClusteringAtZoom={this.props.maxZoom}
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
            // Display the selected meteorite if it is not null. Otherwise display nothing.
            this.state.selectedMeteorite !== null
              ?
              <Popup
                position={this.state.selectedMeteorite.geo.coordinates}
                onClose={this.closePopup}>
                <MeteoriteTooltip coordinates={this.state.selectedMeteorite.geo.coordinates} />
              </Popup>
              :
              <></>
          }
          <MeteoriteMapMove action={this.props.action} />
        </MapContainer>
      </React.Fragment >);
  }
}

export default MeteoriteMap;