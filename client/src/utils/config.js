import L from "leaflet";

// eslint-disable-next-line max-len
const attribution = "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors";

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// to be changed to a const later
const minZoom = 4;
// Maximum zoom into the map
const maxZoom = 18;
// Initial zoom of the map
const initialZoom = 8;

// To be used for the initial bounds.
// let bounds = {
//   _southWest: {
//     lat: 0,
//     lng: 0
//   },
//   _northEast: {
//     lat: 0,
//     lng: 0
//   }
// };

let corner1 = L.latLng(40.712, -74.227);
let corner2 = L.latLng(40.774, -74.125);
let bounds = L.latLngBounds(corner1, corner2);


// let neLat = 0;
// let neLon = 0;
// let swLat = 0;
// let swLon = 0;

const center = [45.5017, -73.5673];

export default {
  attribution: attribution,
  tileUrl: tileUrl,
  minZoom: minZoom,
  maxZoom: maxZoom,
  zoom: initialZoom,
  center: center,
  bounds: bounds
}