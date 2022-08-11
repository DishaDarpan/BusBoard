
//const fetch = require('node-fetch')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const readline = require('readline-sync')

// fetch(<https://api.tfl.gov.uk/StopPoint/490008660N/Arrivals>) //490008660N have to replace this with user input StopCode
//     .then(response => response.json())
//     .then(body => console.log(body));


function getBusStop(){

    console.log('Please enter Bus Stop code: '); 
    BusStopCode = readline.prompt();
    const NextBusStops = fetch('https://api.tfl.gov.uk/StopPoint/'+BusStopCode+'/Arrivals') 
    .then(response => response.json())
    .then(body => console.log(body));

}

getBusStop()