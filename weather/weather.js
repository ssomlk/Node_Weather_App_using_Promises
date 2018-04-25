/**
 * Created by shank on 23/04/2018.
 */
const request = require("request");

const FORECAST_API_KEY = "xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx";

var weatherDetails = (locationData) => {

    return new Promise((resolve, reject) => {
            request({
                url:`https://api.darksky.net/forecast/${FORECAST_API_KEY}/${locationData.Latitude},${locationData.Longitude}`,
                json:true
            },(error,response,body) => {
                if(error){
                    reject('Unable to connect to Forcast Weather services');
                }
                else if(response.statusCode === 400){
                    reject('The given location is invalid.');
                }
                else if(response.statusCode === 200 && !error){
                    resolve({
                        Address:locationData.Address,
                        Longitude:locationData.Longitude,
                        Latitude:locationData.Latitude,
                        Temperature:body.currently.temperature
                    });
                }
            });
        }
    );
};

module.exports = {
    weatherDetails
};
