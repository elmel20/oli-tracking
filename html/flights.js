function TailNumberToLocation(tail_number) {
if (tail_number == "a835af") {
  return "Oakland";}
  else {
  return "lost at sea";
  }
  }

$(document).ready(function() {
    console.log("started");
    getLatestLocation('a835af', function (departure_airport) {
        var location = departure_airport
        console.log('Finally got the location:' +location);
            $("#oligarchs").append("<table id=\"my_table1\" class=\"flight_table\"></table>");
            $("#my_table1").append("<tr><th>Oligarch</th><th>Tail Number</th><th>Location</th></tr>");
            $("#my_table1").append("<tr><td>Elon Musk</td><td>a835af</td><td>" + location + "</td></tr>");

        }
    );
    }
);

function getPlaneInfo(tail_number, callback) {
    var begin=1673312452
    var end=1673807597
    $.get('https://opensky-network.org/api/flights/aircraft?begin='+begin+'&end='+end+'&icao24='+tail_number,
        function(data, status){
            console.log('Status:' + status);
            callback(data[0]);
        }
    );
    return undefined;
}

//#TODO add basic auth credentials to GET call
function getLatestLocation(tail_number, callback) {
    getPlaneInfo(tail_number,
        function (incomingData) {
            console.log(incomingData);
            var DeptAirport = incomingData['estDepartureAirport'];
            console.log('Location:'+ DeptAirport);
            callback(DeptAirport);
        }
    );
    return undefined;
}

