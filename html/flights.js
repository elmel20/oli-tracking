function TailNumberToLocation(tail_number) {
if (tail_number == "a835af") {
  return "Oakland";}
  else {
  return "lost at sea";
  }
  }

$(document).ready(function() {
    console.log("started");
    $("#oligarchs").append("<table id=\"my_table1\" class=\"flight_table\"></table>");
    $("#my_table1").append("<tr><th>Oligarch</th><th>Tail Number</th><th>Location</th></tr>");
    $("#my_table1").append("<tr><td>Elon Musk</td><td>a835af</td><td>" + TailNumberToLocation("a835af") + "</td></tr>");
    }
    );