import React, { Component } from "react";
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';

/**
 * The tooltip component will be used to display pop-up information related to a marker on the map
 */
class MeteoriteTooltip extends Component {

  /**
   * The constructor sets the values of the states
   * @param {*} props 
   */
  constructor(props) {
    // super call to initialize props
    super(props);
    // initialize state
    this.state = {};
  }

  /**
   * 
   */
  async componentDidMount() {
    //
  }

  render() {
    const HtmlTooltip = styled(({ className, ...props }) => (
      <Tooltip {...props} classes={{ popper: className }} />
    ))(({ theme }) => ({
      [`& .${tooltipClasses.tooltip}`]: {
        backgroundColor: '#f5f5f9',
        color: 'rgba(0, 0, 0, 0.87)',
        maxWidth: 220,
        fontSize: theme.typography.pxToRem(12),
        border: '1px solid #dadde9',
      },
    }));
    
    return (
      <Tooltip title="Add" arrow>
        <Button>Arrow</Button>
      </Tooltip>
    );
  }
}

export default MeteoriteTooltip;
