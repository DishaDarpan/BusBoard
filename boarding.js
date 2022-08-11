//const fetch = require('node-fetch')
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const readline = require('readline-sync')

function getNextBusArrivals(){

    console.log('Please enter the Bus Stop Code: '); 
    const BusStopCode = readline.prompt();
        
    const NextBusArrivals = fetch('https://api.tfl.gov.uk/StopPoint/'+BusStopCode+'/Arrivals') 
                            .then(response => response.json())
                          .then(body => console.log(body));

}

getNextBusArrivals();