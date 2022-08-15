const fetch = (...args) => import('node-fetch').then(({ default: fetch }) => fetch(...args));
const readline = require('readline-sync')
const http = require('http');

async function getNextBusArrivals(BusStopCode) {

  //Fetching Bus Arrivals using Bus StopCode
  try {
    const NextBusArrivalsResponse = await fetch('https://api.tfl.gov.uk/StopPoint/' + BusStopCode + '/Arrivals');
    if (NextBusArrivalsResponse.ok) {
      const NextBusArrivalsData = await NextBusArrivalsResponse.json();

      // Prints only Key information about upcoming buses instead of whole json response

      const UpcomingBuses = [];

      for (let i = 0; i < 5; i++) {

        let BusInfo = {
          'Bus Number': NextBusArrivalsData[i].lineName,
          'Destination Name': NextBusArrivalsData[i].destinationName,
          'Going Towards': NextBusArrivalsData[i].towards,
          'Expected Arrival Time': NextBusArrivalsData[i].expectedArrival
        };

        UpcomingBuses.push(BusInfo);
      }
      console.log(UpcomingBuses);

    } else throw ('Please enter a valid PostCode:');

  } catch (error) {
    console.log('Your PostCode is Invalid. Please try again');
  }
}

//Find Two Stop Points within Radius and Print Next Bus Arrivals for them

async function getStopPointsWithinRadius() {

  //Fetching the coordinates for the given postcode


  do {
    try {
      console.log('Please enter the PostCode: ');
      PostCode = readline.prompt();
      PostCodeResponse = await fetch('http://api.postcodes.io/postcodes/' + PostCode);
      PostCodeData = await PostCodeResponse.json();
      const { longitude, latitude } = PostCodeData.result;
      StopRadiusResponse = await fetch(`https://api.tfl.gov.uk/StopPoint/?lat=${latitude}&lon=${longitude}&stopTypes=NaptanPublicBusCoachTram`)
      StopRadiusData = await StopRadiusResponse.json();
      if (PostCodeData.status === 404) throw "Invalid post code";
      for (let i = 0; i < 2; i++) {

        const BusStopCode = StopRadiusData.stopPoints[i].naptanId; //Getting Bus Stop Code from Stops Within Radius Data

        //Printing Bus Arrival Info by calling getNextBusArrivals Function
        console.log('Next Bus Arrival Info for Bus Stop Code ' + StopRadiusData.stopPoints[i].naptanId + ' near ' + PostCode)
        await getNextBusArrivals(BusStopCode);
      }

      
    }
    catch (err) {
      console.log(err);
    }
  } while (PostCodeData.status === 404);

  //Passing the coordinates to get Stops within the Radius


  //console.log(StopRadiusData);

  //Print Next Bus Arrival Info for Two Stop Points Within Radius


}

getStopPointsWithinRadius();

async function getDirection() {

  console.log('Please enter the PostCode of your location: ');
  const PostCode = readline.prompt();

  console.log('Please enter the PostCode of destination: ');
  const endPostCode = readline.prompt();
  try {
    const response = await fetch(`https://api.tfl.gov.uk/Journey/JourneyResults/${PostCode}/to/${endPostCode}`);
    if (response.ok) {
      const data = await response.json();

      // for (let i = 0; i < data.journeys[0].legs[0].instruction.steps.length; i++) {
      //   console.log(data.journeys[0].legs[0].instruction.steps[i].descriptionHeading + data.journeys[0].legs[0].instruction.steps[i].description);
      // }
      data.journeys[0].legs[0].instruction.steps.forEach(step => console.log(step.descriptionHeading + step.description));
    }
    else throw ("Enter correct postcode");
  }

  catch (error) {
    console.log("Your Postcode is invalid! Please try again.");

  }
}
//getDirection();


//getStopPointsWithinRadius();
