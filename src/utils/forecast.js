const request = require("request");

const forecast = (location, lat, lon, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=92572f314c4f444423dbebc4120402b9" +
    "&query=" +
    lat +
    "," +
    lon +
    "&units=f";
  request({ url, json: true }, (error, response, { current }) => {
    const { weather_descriptions, temperature, feelslike } = current;
    if (error) {
      console.log("Unable to connect to weatherstack service!");
    } else {
        forecastSummary = "The weather in " + location + " is " + weather_descriptions[0] + " and the temperature is " + temperature + " though it feels like " + feelslike +"."
        callback(undefined, {forecastSummary});
    }
  });
};

module.exports = forecast;
