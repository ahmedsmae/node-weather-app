const request = require("request");

const geocode = (address, callback) => {

    // https://api.mapbox.com/geocoding/v5/mapbox.places/starbucks.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=pk.eyJ1IjoiYWhtZWRzbWFlIiwiYSI6ImNqdmE0Z2RzbDBlejc0MG5xYm51cXk0bmYifQ.b-PUp64-VqEu-0EB_wYImQ

    const access_token = "pk.eyJ1IjoiYWhtZWRzbWFlIiwiYSI6ImNqdmE0Z2RzbDBlejc0MG5xYm51cXk0bmYifQ.b-PUp64-VqEu-0EB_wYImQ";
    const limit = { key: "limit", value: "1" };
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?bbox=-77.083056,38.908611,-76.997778,38.959167&access_token=${access_token}&${limit.key}=${limit.value}`;
    const requestDetails = { url, json: true };

    request(requestDetails, (error, { body }) => {
        let msg;
        if (error) {
            callback("Unable to connect to location services.", undefined);
        } else if (body.features.length === 0) {
            callback("Unable to find location. try again with different search term.", undefined);
        } else {
            const latitude = body.features[0].center[1];
            const longitude = body.features[0].center[0];
            const location = body.features[0].place_name;
            callback(undefined, { latitude, longitude, location });
        }
    });
};

module.exports = geocode;