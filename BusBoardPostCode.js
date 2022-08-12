
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const readline = require('readline-sync')

//Find out next live bus arrivals
// function getNextBusArrivals(){

//     console.log('Please enter the Bus Stop Code: '); 
//     const BusStopCode = readline.prompt();
        
//     const NextBusArrivals = fetch('https://api.tfl.gov.uk/StopPoint/'+BusStopCode+'/Arrivals') 
//                             .then(response => response.json())
//                           .then(body => console.log(body));
// }
// getNextBusArrivals();

function getLongitudeLatitude(){

    console.log('Please enter the PostCode: '); 
    const PostCode = readline.prompt();
        
    fetch('http://api.postcodes.io/postcodes/'+PostCode) 
      .then(response => response.json())
      .then(body => {
               const {longitude, latitude}= body.result;
               
               console.log({longitude,latitude})});
        
}

getLongitudeLatitude();

// fetch('https://api.tfl.gov.uk/StopPoint/?lat={lat}&lon={lon}&stopTypes={stopTypes}[&radius][&useStopPointHierarchy][&modes][&categories][&returnLines]') 
    //     .then(response => response.json())
    //     .then(body => console.log(body));

