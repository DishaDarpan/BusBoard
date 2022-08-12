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

function getLongitudeLatitude(){

  console.log('Please enter the PostCode: '); 
  const PostCode = readline.prompt();
      
  const LonLat=fetch('http://api.postcodes.io/postcodes/'+PostCode) 
      .then(response => response.json())
      .then(body => {
          const {longitude, latitude} = body.result;
          console.log({longitude,latitude})});
}

getLongitudeLatitude();

// "longitude": -0.144754 for NW5 1TL
// "latitude": 51.553935 

//WooHoo :D:D:D 



// function getStopPointsWithinRadius(){
  

//     const StopPointsWithinRadius = fetch('https://api.tfl.gov.uk/StopPoint/?lat={latitude}&lon={longitude}&stopTypes={stopTypes}[&radius][&useStopPointHierarchy][&modes][&categories][&returnLines]') 
//                                  .then(response => response.json())
//                                  .then(body => console.log(body));
// }

// getStopPointsWithinRadius();

