
import { Component } from "react";
import config from "../utils/config";
import MeteoriteMap from "./MeteoriteMap";

/**
 * 
 */
class MeteoriteMapApp extends Component {
  /**
   * 
   * @param {*} props 
   */
  constructor(props) {
    super(props);

    this.state = {
      bounds: config.bounds
    }

    this.setBounds = this.setBounds.bind(this);
  }

  setBounds(bounds) {
    this.setState({
      bounds: bounds
    });
  }

  /**
   * 
   * @returns 
   */
  render() {
    // Just for testing
    return <MeteoriteMap
      params={config} action={this.setBounds} bounds={this.state.bounds} maxBounds={config.maxBounds} />
  }
}
export default MeteoriteMapApp;