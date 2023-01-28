$(document).ready(function() {
    var oligarchs = [{'name': 'Alan Sugar', 'tail': 'a62433'},
    {'name':'Elon Musk', 'tail': 'a835af'},
    {'name':'Mohammad bin Fahd bin Abdul Aziz Al Saud', 'tail': '4241bb'}]
//    TODO add bill gates - a17907
//    var oligarchUpdated = await GetTableData(oligarchs);
    GetTableData(oligarchs).then(
            function(oligarchsUpdated) {
             $("#oligarchs").append("<table id=\"my_table1\" class=\"flight_table\"></table>");
             $("#my_table1").append("<tr><th>Oligarch</th><th>Tail Number</th><th>Location</th></tr>");
            for (index in oligarchsUpdated) {
                var oligarch = oligarchsUpdated[index]
                    $("#my_table1").append("<tr><td>"
                        + oligarch.name + "</td><td>"
                        + oligarch.tail + "</td><td>"
                        + oligarch.location + "</td></tr>");
                    console.log(oligarchsUpdated[index])
                    }
                console.log('Success')
            },
            function(error) { console.log('Promise error on get table data') }
    );

})

async function GetTableData(oligarchsArg) {
    var oligarchResults = []
    for (index in oligarchsArg) {
        var obj = oligarchsArg[index]
        console.log('hello')
        var infoPromise = getPlaneInfoPromise(obj['tail']);
        var resultInfo = await infoPromise;
        console.log('Await result' + resultInfo);
        var DeptAirport = resultInfo['estDepartureAirport'];
        obj.location = DeptAirport
        oligarchResults.push(obj)
    }
    return oligarchResults
}

function getPlaneInfoPromise(tail_number) {
    let myPromise = new Promise(function(myResolve, myReject) {
        var begin=1673381781 //#TODO get system time
        var end=1674932066
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
                myResolve(data[0]);
            },
            error: function (xhr,ajaxOptions,throwError){
                console.log('Error:' + throwError)
                myReject({'estDepartureAirport':"Failed"})
            },
        });

    });
    return myPromise;
}