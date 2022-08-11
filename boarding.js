const fetch = require('node-fetch')
fetch(<https://api.tfl.gov.uk/StopPoint/Mode/bus/Disruption HTTP/1.1
>)
    .then(response => response.json())
    .then(body => console.log(body));