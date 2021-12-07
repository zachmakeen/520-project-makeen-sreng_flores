
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
  }
  /**
   * 
   * @returns 
   */
  render() {
    // Just for testing
    return <MeteoriteMap
      params={config} />
  }
}
export default MeteoriteMapApp;