const yargs = require("yargs");
const geocode = require("./geocode/geocode");
const weather = require("./weather/weather");

const argv = yargs
    .options({
        a:{
            demand:true,
            alias:'address',
            describe:'Address to fetch weather for',
            string:true
        }
    })
    .help()
    .alias('help','h')
    .alias('version','v')
    .argv;

// geocode.geocodeAddressFunc(argv.a,(errorMessageGeocode, locationData) =>{
//     if(errorMessageGeocode){
//         console.log(errorMessageGeocode);
//     }else{
//         weather.weatherDetails(locationData, (errorMessageWeather, weatherDate) => {
//             if(errorMessageWeather){
//                 console.log(errorMessageWeather);
//             }
//             else{
//                 console.log(JSON.stringify(weatherDate, undefined,2));
//             }
//         });
//     }
// });

geocode.geocodeAddressFunc(argv.a)
    .then((locationData)=>{
        weather.weatherDetails(locationData).then((weatherDate) => {
            console.log(JSON.stringify(weatherDate, undefined,2));
        })
    }).catch((errorMessage) => {
        console.log(errorMessage);
    });

