const request = require("request");

const forecast = (long, lat, callback) => {
  const url =
    "http://api.weatherstack.com/current?access_key=63e0ca396688e0b89607baf43ead15b3&query=" +
    lat +
    "," +
    long;

  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Not able to connect to Weather Service", undefined);
    } else if (body.error) {
      callback(body.error.info, undefined);
    } else {
      const chanceOfRain = body.current.feelslike;
      const currentTemp = body.current.temperature;
      const currentWeatherDesc = body.current.weather_descriptions[0];
      callback(
        undefined,
        "currentWeatherDesc" +
          "- It is currently " +
          currentTemp +
          " degree out. it feels like " +
          chanceOfRain +
          " degrees out."
      );
    }
  });
};

module.exports = forecast;
