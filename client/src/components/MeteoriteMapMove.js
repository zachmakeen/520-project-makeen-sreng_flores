/**
 * The following snippet of code was taken from the author below, 
 * it performs a notification system where the parent component may be notified 
 * if the user changes the bounds of the map.
 * @author Jaya Nikalantan
 */
import {
  useMapEvents,
} from "react-leaflet";

/**
 * This function uses the useMapsEvents in order to receive notification once the user has changes
 * bounds in the map. Upon changing the bounds, the callback function will be called to notify 
 * a parent component for rerendering the app.
 * Attribution to Professor at Dawson College Jaya Nilakantan for the component!
 * @param {*} props 
 * @returns {null} 
 */
function MeteoriteMapMove(props) {
  const mapEvents = useMapEvents({
    "moveend": () => {
      props.action(mapEvents.getBounds());
    },
    "zoom": () => {
      props.action(mapEvents.getBounds());
    },
  });
  return null;
}

export default MeteoriteMapMove;