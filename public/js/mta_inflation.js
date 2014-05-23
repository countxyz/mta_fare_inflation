var margin = {top: 30, right: 20, bottom: 30, left: 50},
  width = 1100 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var parseYear = d3.time.format("%Y").parse;

var x = d3.time.scale().range([0, width]);
var y = d3.scale.linear().range([height, 0]);

var xAxis = d3.svg.axis().scale(x)
  .orient("bottom").ticks(10);

var yAxis = d3.svg.axis().scale(y)
  .orient("left").ticks(10);

var valueline1 = d3.svg.line()
  .interpolate("basis")
  .x(function(d) { return x(d.Year); })
  .y(function(d) { return y(d.Fare); });

var valueline2 = d3.svg.line()
  .interpolate("basis")
  .x(function(d) { return x(d.Year); })
  .y(function(d) { return y(d.Fare2012)})
    
var svg = d3.select("body")
  .append("svg")
    .attr("width", width + margin.left + margin.right)
    .attr("height", height + margin.top + margin.bottom)
  .append("g")
    .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

d3.csv("data/mta_fare_inflation.csv", function(error, data) {
  data.forEach(function(d) {
    d.Year = parseYear(d.Year);
    d.Fare = +d.Fare;
    d.Fare2012 = +d.Fare2012;
  });

  x.domain(d3.extent(data, function(d) { return d.Year; }));
  y.domain([0, d3.max(data, function(d) { return Math.max(d.Fare, d.Fare2012); })]);

  svg.append("path")
    .attr("class", "line")
    .attr("d", valueline1(data));

  svg.append("path")
    .attr("class", "line")
    .style("stroke", "green")
    .attr("d", valueline2(data));

  svg.append("g")
    .attr("class", "x axis")
    .attr("transform", "translate(0," + height + ")")
    .call(xAxis);

  svg.append("text")
    .attr("x", width / 2)
    .attr("y", height + margin.bottom)
    .style("text-anchor", "middle")
    .text("Year");

  svg.append("g")
    .attr("class", "y axis")
    .call(yAxis);

  svg.append("text")
    .attr("transform", "rotate(-90)")
    .attr("y", 0 - margin.left)
    .attr("x", 0 - (height / 2))
    .attr("dy", "1em")
    .style("text-anchor", "middle")
    .text("Price");

  svg.append("text")
    .attr("x", (width / 2))
    .attr("y", 0 - (margin.top / 2))
    .attr("text-anchor", "middle")
    .style("font-size", "16px")
    .style("text-decoration", "underline")
    .text("MTA Fare Price vs Price Adjusted for Inflation (2012)");
});
