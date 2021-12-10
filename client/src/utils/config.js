// Import leaflet in order to create Latlng objects
import L from "leaflet";

// Attribution to open street map.org
// eslint-disable-next-line max-len
const attribution = "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors";

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// to be changed to a const later
const minZoom = 5;
// Maximum zoom into the map
const maxZoom = 18;
// Initial zoom of the map
const initialZoom = 7;

// Create initiali bounds for the map taken from an instance
const corner1 = L.latLng(41.705728515237524, -84.11132812500001);
const corner2 = L.latLng(49.059469847170526, -63.01757812500001);
const bounds = L.latLngBounds(corner1, corner2);

// Create max bounds for the map.
const maxBounsCorner1 = L.latLng(-90, -180);
const maxBounsCorner2 = L.latLng(90, 180);
const maxBounds = L.latLngBounds(maxBounsCorner1, maxBounsCorner2);

// Define the initial center upon loading. In this case we use Montreal's coordinates
const center = [45.5017, -73.5673];

// Export as an object
export default {
  attribution: attribution,
  tileUrl: tileUrl,
  minZoom: minZoom,
  maxZoom: maxZoom,
  zoom: initialZoom,
  center: center,
  bounds: bounds,
  maxBounds: maxBounds
};