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
    var begin=1673312908 //#TODO get system time
    var end=1674169708
    var uName = 'Elmel'
    var password = 'fujcoz-9hicfa-zygSin' //#TODO hide password
    var target_url = 'https://opensky-network.org/api/flights/aircraft?begin='+begin+'&end='+end+'&icao24='+tail_number
    $.ajax({
    type: 'GET',
    url: target_url,
    headers: {
        "Authorization": "Basic " + btoa(uName+":"+password)
    },
    success : function(data) {
      console.log('Success:' + data);
      callback(data[0]);
    },
   error: function (xhr,ajaxOptions,throwError){
    console.log('Error:' + throwError)
    callback({'estDepartureAirport':"Failed"})
  },
});

}


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

