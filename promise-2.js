/**
 * Created by shank on 25/04/2018.
 */
const request = require("request");

const GOOGLE_API_KEY = "AIzaSyA_csLeGRR901Nu3JxX2vDLHfFHesz7FxI";

var geocodeAddress = (address) => {
    return new Promise((resolve, reject) => {
        const encoded_address = encodeURIComponent(address);
        request({
            url:`https://maps.googleapis.com/maps/api/geocode/json?address=${encoded_address}&key=${GOOGLE_API_KEY}`,
            json:true
        },(error, response, body) => {
            if(error){
                reject(`Unable to connect to the Google Servers ${error.toString()}`);
            }else if(body.status === "ZERO_RESULTS"){
                reject("Unable to find the address provided");
            }else if(body.status === "INVALID_REQUEST"){
                reject("Invalid request. Missing the 'address', 'components', 'latlng' or 'place_id' parameter.");
            }else if(body.status === "OK") {
                resolve({
                    Address : `${body.results[0].formatted_address}`,
                    Longitude : `${body.results[0].geometry.location.lng}`,
                    Latitude : `${body.results[0].geometry.location.lat}`
                });
            }
        });
    });
};

geocodeAddress("74 Alexander Crescent Otara 2023 Auckland")
    .then((locationData) => {
        console.log(JSON.stringify(locationData,undefined,2));
    }, (errorMessage) => {
        console.log(errorMessage);
    });
