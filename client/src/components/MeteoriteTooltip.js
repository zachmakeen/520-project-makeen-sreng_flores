import React, { Component } from 'react';
import './MeteoriteTooltip.css';

/**
 * The tooltip component will be used to display pop-up information related to a marker on the map
 */
class MeteoriteTooltip extends Component {

  /**
   * The constructor sets the values of the states
   * @param {*} props The props passed from the parent
   */
  constructor(props) {
    // super call to initialize props
    super(props);
    // initialize state
    this.state = {};
  }

  /**
   * This method is used to render the popup with information pertaining to the selected meteorite
   * @returns The meteorite's information
   */
  render() {

    return (
      <div>
        <h3>{this.props.meteorite.name} {this.props.meteorite.recclass} ({this.props.meteorite.year})</h3>
        <p>{'>'} {this.props.meteorite.mass} g</p>
        {
          this.props.meteorite.nametype === 'Valid'
            ? <p>{'>'} a typical meteorite</p>
            : <p>{'>'} a meteorite that has been highly degraded by weather on Earth</p>
        }
        {
          this.props.meteorite.fall === 'Fell'
            ? <p>{'>'} the meteorite{"'"}s fall was observed</p>
            : <p>{'>'} the meteorite{"'"}sfall was not observed </p>
        }
        <p>{'>'} {this.props.meteorite.geo.coordinates[1]}, {this.props.meteorite.geo.coordinates[1]}</p>
      </div>
    );
  }
}

export default MeteoriteTooltip;
