const request = require("request");

const geocode = (address, callback) => {
  const url =
    "https://api.mapbox.com/geocoding/v5/mapbox.places/" +
    encodeURIComponent(address) +
    ".json?access_token=pk.eyJ1Ijoic3dhcG5pbHciLCJhIjoiY2tnZHF1a2JkMTNjeDJ0czU4NmozMTcwbiJ9.nr2A9SrpRmmIQuzzzF096g&limit=1";
  request({ url, json: true }, (error, { body }) => {
    if (error) {
      callback("Not able to connect to Weather Service", undefined);
    } else if (body.features.length == 0) {
      callback("No Result Found", undefined);
    } else {
      callback(undefined, {
        long: body.features[0].geometry.coordinates[0],
        lat: body.features[0].geometry.coordinates[1],
        location: body.features[0].place_name,
      });
    }
  });
};

module.exports = geocode;
