const request = require('request');

forecast = (latitude, longitude, callback) => {

    //  https://api.darksky.net/forecast/[key]/[latitude],[longitude]?key=value&key2=value2
    const key = "2350930a58d8d69563691b9347b8f1d8";
    const units = { key: "units", value: "si" };
    const exclude = { key: "exclude", value: "minutely,hourly,flags,alerts" };
    const lang = { key: "lang", value: "en" };
    const url = `https://api.darksky.net/forecast/${key}/${latitude},${longitude}?${units.key}=${units.value}&${exclude.key}=${exclude.value}&${lang.key}=${lang.value}`;
    const requestDetails = { url, json: true };

    request(requestDetails, (error, { body }) => {
        if (error) {
            callback("Unable to connect to the weather server", undefined);
        } else if (body.error) {
            callback("Unable to find location", undefined);
        } else {
            const summary = body.daily.data[0].summary;
            const temperature = body.currently.temperature;
            const precipProbability = body.currently.precipProbability;
            callback(undefined, `${summary} It is currently ${temperature} degrees out. There is a ${precipProbability}% chance of rain.`)
            // callback(undefined, {summary, temperature, precipProbability});
        }
    });
}

module.exports = forecast;
