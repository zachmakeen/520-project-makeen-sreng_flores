
import { Component } from "react";
import config from "../utils/config";
import MeteoriteMap from "./MeteoriteMap";
class MeteoriteMapApp extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    // Just for testing
    return <MeteoriteMap />
  }
}
export default MeteoriteMapApp;