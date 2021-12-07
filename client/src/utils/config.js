"use strict";

const attribution = "&copy; <a href=\"https://www.openstreetmap.org/copyright\">OpenStreetMap</a> contributors";

const tileUrl = "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png";
// to be changed to a const later
let minZoom;
// to be changed to a const later
let maxZoom;
// to be changed to a const later
let initialZoom;

// To be used for the initiali bounds.
let neLat;
let neLon;
let swLat;
let swLon;

navigator.geolocation.getCurrentPosition
export default {
  attribution: attribution,
  tileUrl: tileUrl,
  minZoom: minZoom,
  maxZoom: maxZoom,
  initialZoom: initialZoom
}