
// eslint-disable-next-line max-len
const attribution = "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors";

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// to be changed to a const later
const minZoom = 1;
// Maximum zoom into the map
const maxZoom = 18;
// Initial zoom of the map
const initialZoom = 8;

// To be used for the initial bounds.
let neLat;
let neLon;
let swLat;
let swLon;

const center = [45.5017, -73.5673];

export default {
  attribution: attribution,
  tileUrl: tileUrl,
  minZoom: minZoom,
  maxZoom: maxZoom,
  zoom: initialZoom,
  center: center
}