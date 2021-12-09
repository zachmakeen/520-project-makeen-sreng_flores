
import { Component } from "react";
import config from "../utils/config";
import MeteoriteMap from "./MeteoriteMap";

/**
 * 
 */
class MeteoriteMapApp extends Component {
  /**
   * Constructor of the meteorite map application
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      bounds: config.bounds
    };

    this.setBounds = this.setBounds.bind(this);
  }

  /**
   * The function will server as a callback for the child components and rerender the 
   * components with a new props upon a change in the user's movement in the map.
   * @param {LatLngBounds} bounds 
   */
  setBounds(bounds) {
    this.setState({
      bounds: bounds
    });
  }

  /**
   * Render method to be rendered to the user. It sets the props of the child 
   * components using the config import information
   * @returns 
   */
  render() {
    // Just for testing
    return (
      <MeteoriteMap
        action={this.setBounds}
        attribution={config.attribution}
        tileUrl={config.tileUrl}
        minZoom={config.minZoom}
        maxZoom={config.maxZoom}
        zoom={config.zoom}
        center={config.center}
        bounds={this.state.bounds}
        maxBounds={config.maxBounds}
      />
    );
  }
}
export default MeteoriteMapApp;