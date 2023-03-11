function init() {
var w = 600;
var h = 150;
var barPadding = 2;

var svg = d3.select("div")
            .append("svg")
            .attr("width", w)   //total length
            .attr("height", h); //total height

d3.csv("Task_2.4_data.csv").then(function(data) {
    
    console.log(data);
    wombatSightings = data;

    barChart(wombatSightings);
});

function barChart(data) {
    
    svg.selectAll("rect")
        .data(wombatSightings)
        .enter()            
        .append("rect")
        .attr("x", function(d, i) {                
            return i * (w / wombatSightings.length);
        })
        .attr("y", function(d) {
            return h - (d.wombats * 4);
        })
        .attr("width", w / wombatSightings.length - barPadding)
        .attr("height", function(d) {
            return d.wombats * 4;
        })
        .attr("fill", function(d) {
            return "rgb(8, 190, " + (d.wombats * 15) +")";
        });

    svg.selectAll("text")
        .data(wombatSightings)
        .enter()
        .append("text")
        .text(function(d) {
            return d.wombats;
        })
        .attr("x", function(d, i) {
            return i * (w / wombatSightings.length) + 20;
        })
        .attr("y", function(d) {
            return h - (d.wombats * 4) + 15;
        })
        .attr("text-anchor", "middle")
        .attr("fill", "white");
}
}

window.onload = init;