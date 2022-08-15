const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const readline = require('readline-sync')
const http = require('http');

async function getNextBusArrivals(BusStopCode){
        
    //Fetching Bus Arrivals using Bus StopCode
    try{
      const NextBusArrivalsResponse = await fetch('https://api.tfl.gov.uk/StopPoint/'+BusStopCode+'/Arrivals');
      if(NextBusArrivalsResponse.ok){
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

      }else throw ('Please enter a valid PostCode:');
        
      }catch(error){
        console.log('Your PostCode is Invalid. Please try again');
      }
 }

//Find Two Stop Points within Radius and Print Next Bus Arrivals for them

async function getStopPointsWithinRadius() {

  console.log('Please enter the PostCode: '); 
  const PostCode = readline.prompt();
  
  //Fetching the coordinates for the given postcode
  const  PostCodeResponse= await fetch('http://api.postcodes.io/postcodes/'+PostCode);
  const PostCodeData = await PostCodeResponse.json(); 
  const {longitude, latitude}= PostCodeData.result;
  
  //Passing the coordinates to get Stops within the Radius
  const StopRadiusResponse = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${latitude}&lon=${longitude}&stopTypes=NaptanPublicBusCoachTram`) 
  const StopRadiusData = await StopRadiusResponse.json();    
  //console.log(StopRadiusData);

  //Print Next Bus Arrival Info for Two Stop Points Within Radius

  for(let i=0; i<2; i++){

    const BusStopCode = StopRadiusData.stopPoints[i].naptanId; //Getting Bus Stop Code from Stops Within Radius Data
    
    //Printing Bus Arrival Info by calling getNextBusArrivals Function
    console.log('Next Bus Arrival Info for Bus Stop Code ' + StopRadiusData.stopPoints[i].naptanId + ' near ' + PostCode)
    await getNextBusArrivals(BusStopCode);
  }
   
}

// //getStopPointsWithinRadius();

async function getDirection() {

    console.log('Please enter the PostCode of your location: ');
    const PostCode = readline.prompt();
    
    console.log('Please enter the PostCode of destination: ');
    const endPostCode = readline.prompt();
   
    const response = await fetch(`https://api.tfl.gov.uk/Journey/JourneyResults/${PostCode}/to/${endPostCode}`);
    const data = await response.json();
    console.log(data);
}
//getDirection();

  
getStopPointsWithinRadius();


