import { Component } from "react";
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
 * The main meteorite map component.
 * @author Juan-Carlos Sreng-Flores
 * @author Zacharie Makeen
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
    // Define maximum bounds for the fetch api, i.e the greatest
    // rectangle that the fetch api can have is from 90 to -90 in latitude
    // and -180 to 180 in longitude
    this.MAX_LAT = 90;
    this.MIN_LAT = -90;
    this.MAX_LON = 180;
    this.MIN_LON = -180;
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
      // console.log(json);
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
      // console.log("Changes in bounds");
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
    let neLat = boundingBox.getNorthEast().lat;
    let neLon = boundingBox.getNorthEast().lng;
    let swLat = boundingBox.getSouthWest().lat;
    let swLon = boundingBox.getSouthWest().lng;

    // Check if the bounds are not out of the bounds specified in the constructor.
    // We know for a fact that the bounds for neLat will not be lower than the minimum is
    // because the TileLayer was setup to not wrap the map, and therefore the only way it can go 
    // out of bounds is from its respective edge side.

    // If the current coord is smaller than the max coord we keep the value
    neLat = neLat <= this.MAX_LAT ? neLat : this.MAX_LAT;
    neLon = neLon <= this.MAX_LON ? neLon : this.MAX_LON;

    // If the current coord is greater than the min coord we keep the value.
    swLon = this.MIN_LON <= swLon ? swLon : this.MIN_LON;
    swLat = this.MIN_LAT <= swLat ? swLat : this.MIN_LAT;

    // eslint-disable-next-line max-len
    const url = `/api/meteorite_landings?neLat=${neLat}&neLon=${neLon}&swLat=${swLat}&swLon=${swLon}`;

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
            // if statement
            ?
            <Popup
              position={this.state.selectedMeteorite.geo.coordinates}
              onClose={this.closePopup}>
              <MeteoriteTooltip meteoriteCoords={this.state.selectedMeteorite} />
            </Popup>
            // else statement
            :
            <></>
        }
        <MeteoriteMapMove action={this.props.action} />
      </MapContainer>
    );
  }
}

export default MeteoriteMap;