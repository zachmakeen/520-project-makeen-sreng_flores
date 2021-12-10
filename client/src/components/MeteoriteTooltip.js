import React, { Component } from 'react';
import './MeteoriteTooltip.css';

/**
 * The tooltip component will be used to display pop-up information related to a marker on the map
 * @author Zacharie Makeen
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
    this.state = {
      name: '',
      recclass: '',
      year: '',
      mass: '',
      nametype: '',
      fall: '',
      lat: '',
      lng: '',
    };
    // bind the fetch method
    this.fetchMeteorite = this.fetchMeteorite.bind(this);
  }

  /**
   * This function is used to fetch the details pertaining to the meteorite selected by the user.
   * Then, it will set the state and re-invoke the render method with the new values.
   * It is invoked immediately after this component is mounted.
   */
  async componentDidMount() {
    try {
      const content = await this.fetchMeteorite(this.props.meteoriteCoords._id);
      this.setState({
        name: content.name,
        recclass: content.recclass,
        year: content.year,
        mass: content.mass,
        nametype: content.nametype,
        fall: content.fall,
        lat: content.geo.coordinates[0],
        lng: content.geo.coordinates[1],
      });
    } catch (e) {
      console.error(e);
    }
  }

  /**
   * This function is used to fetch data from the server using the id of a meteorite.
   * @param {*} id The id of a meteorite
   * @returns The details associated with the id of the meteorite
   */
  async fetchMeteorite(id) {
    // url for fetching information about a meteorite using its id
    const url = `/api/meteorite_landing/${id}`;
    // fetch from the server
    let response = await fetch(url);
    let content;
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    } else {
      content = await response.json();
    }
    return content;
  }

  /**
   * This function is used to render the information pertaining to the selected meteorite.
   * @returns The meteorite's information
   */
  render() {
    return (
      <div>
        <h3>{this.state.name} {this.state.recclass} ({this.state.year})</h3>
        <p>{'>'} {this.state.mass} g</p>
        {
          this.state.nametype === 'Valid'
            // if block
            ? <p>{'>'} a typical meteorite</p>
            // else block
            : <p>{'>'} a meteorite that has been highly degraded by weather on Earth</p>
        }
        {
          this.state.fall === 'Fell'
            // if block
            ? <p>{'>'} the meteorite{"'"}s fall was observed</p>
            // else block
            : <p>{'>'} the meteorite{"'"}sfall was not observed </p>
        }
        <p>{'>'} {this.state.lat}, {this.state.lng}</p>
      </div>
    );
  }
}

export default MeteoriteTooltip;
