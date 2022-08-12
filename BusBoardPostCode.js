
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


async function getStopPointsWithinRadius(){

    console.log('Please enter the PostCode: '); 
    const PostCode = readline.prompt();
    
    //Fetching the coordinates for the given postcode
    const response = await fetch('http://api.postcodes.io/postcodes/'+PostCode);
    const data = await response.json(); 
    const {longitude, latitude}= data.result;
    console.log({longitude,latitude});
    
    //Passing the coordinates to get Stop within the Radius
    const response1 = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${latitude}&lon=${longitude}&stopTypes=NaptanPublicBusCoachTram`) 
    const data1 = await response1.json();    
    console.log(data1); 
}

getStopPointsWithinRadius();


