function init() {

    var w = 500;
    var h = 300;

    var projection = d3.geoMercator()
                    .center([145, -36.5])
                    .translate([w / 2, h / 2])
                    .scale(2450);

    var path = d3.geoPath()
                .projection(projection);

    var color = d3.scaleQuantize()
                .range(["#f2f0f7", "#cbc9e2","#9e9ac8" ,"#756bb1", "#54278f"])
            
    var svg = d3.select("#chart")
			.append("svg")
			.attr("width", w)
			.attr("height", h)

    d3.csv("VIC_LGA_unemployment.csv").then(function(data){
        color.domain([
            d3.min(data, function(d){return d.unemployed}),
            d3.max(data, function(d){return d.unemployed})
        ]);

    d3.json("LGA_VIC.json").then(function(json){

        //Merge the ag. data and GeoJSON
        //Loop through once for each ag.data value
        for(var i=0; i < data.length; i++) {

            //Grab state name
            var dataState = data[i].LGA;

            //Grab data value, and convert from string to float
            var dataValue = parseFloat(data[i].unemployed);

            //Find the corresponding state inside the GeoJSON
            for (var j = 0; j < json.features.length; j++){

                var jsonState = json.features[j].properties.LGA_name;

                if (dataState == jsonState) {

                    //Copy the data value into the JSON 
                    json.features[i].properties.value = dataValue;

                    //Stop looking through the JSON
                    break;
                }
            }
        }

        svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("fill", function(d){
                var value = d.properties.value;
                    if (value){
                        return color(value);
                    } else {
                        return "#ccc";
                    }
            });

    d3.csv("VIC_city.csv").then(function(data) {				
        svg.selectAll("circle")
            .data(data)
            .enter()
            .append("circle")
            .attr("cx", function(d) {
                return projection([d.lon, d.lat])[0];
            })
            .attr("cy", function(d) {
                return projection([d.lon, d.lat])[1];
            })
            .attr("r", 3)
            .style("fill", "red")
            .style("opacity", 0.75)		
        })
    });       
});
}
window.onload = init;
