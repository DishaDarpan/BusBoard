
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const readline = require('readline-sync')


async function getNextBusArrivals(){

    //Asking user to input Stop code
    console.log('Please enter the Bus Stop Code: '); 
    const BusStopCode = readline.prompt();
        
    //Fetching Bus Arrivals using Bus StopCode
    const NextBusArrivalsResponse = await fetch('https://api.tfl.gov.uk/StopPoint/'+BusStopCode+'/Arrivals');
    const NextBusArrivalsData = await NextBusArrivalsResponse.json(); 

    // Prints only Key information about upcoming buses instead of whole json response

   const UpcomingBuses = [];

   for(let i=0 ; i<5 ; i++){

     let BusInfo = {'Bus Number': NextBusArrivalsData[i].lineName,
                    'Destination Name': NextBusArrivalsData[i].destinationName,
                    'Going Towards': NextBusArrivalsData[i].towards,
                    'Expected Arrival Time': NextBusArrivalsData[i].expectedArrival};
    
     UpcomingBuses.push(BusInfo);
   }

   
console.log(UpcomingBuses); 
  
                          
}

getNextBusArrivals();
  

// async function getStopPointsWithinRadius(){

//     console.log('Please enter the startingPostCode: '); 
//     const PostCode1 = readline.prompt();
    
//     //Fetching the coordinates for the given postcode
//     const response = await fetch('http://api.postcodes.io/postcodes/'+PostCode);
//     const data = await response.json(); 
//     const {longitude, latitude}= data.result;
//     console.log({longitude,latitude});
    
//     //Passing the coordinates to get Stop within the Radius
//     const response1 = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${latitude}&lon=${longitude}&stopTypes=NaptanPublicBusCoachTram`) 
//     const data1 = await response1.json();    
//     console.log(data1); 
// }

// getStopPointsWithinRadius();

