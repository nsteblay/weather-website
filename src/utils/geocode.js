const request = require("request");

const geocode = (address, callback) => {
  // Setup variables for call to mapbox to get lattitude and longitude
  const mapboxUrlBase = "https://api.mapbox.com/geocoding/v5/mapbox.places/";
  const mapboxAccessToken =
    "?access_token=pk.eyJ1IjoibnN0ZWJsYXkiLCJhIjoiY2tpMmJodTFnMWwzYjJ5bm0zdDM5OHV1ciJ9.ZY-z5AwYR51lVmef2C2ttg";
  const url = mapboxUrlBase + address + ".json" + mapboxAccessToken;

  // Async call to to mapbox with callback to weatherstack passing latitude and longitude

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Unable to connect to the mapbox service!", undefined);
    } else if (body.features.length === 0) {
      callback("Search of location found nothing! Try again.", undefined);
    } else {
      callback(undefined, {
        longitude: body.features[0].center[1],
        latitude: body.features[0].center[0],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
