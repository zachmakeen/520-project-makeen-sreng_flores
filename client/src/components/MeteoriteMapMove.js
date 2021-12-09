import { 
  useMapEvents,
} from "react-leaflet";
  
//react-leaflet hook
function MeteoriteMapMove(props) {    
  const mapEvents = useMapEvents({
    "moveend": () => {
      props.action(mapEvents.getBounds());
    },
    "zoom": () => {
      props.action(mapEvents.getBounds());
    },
  }); 
  return null 
} 
  
export default MeteoriteMapMove;
  