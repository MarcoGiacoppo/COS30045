function init() {
  var w = 1261;
  var h = 800;

  var dataset;

  var ausLon = -25.958045;
  var ausLat = 133.682542;

  var colour = d3.scaleQuantize()
                  .range(['#c6dbef','#9ecae1','#6baed6','#4292c6','#2171b5','#084594'])

  var projection = d3.geoMercator()
    .center([127, -28])
    .translate([w / 2, h / 2])
    .scale(1000);

  var path = d3.geoPath()
    .projection(projection);

  var svg = d3.select("#chart2")
    .append("svg")
    .attr("width", w)
    .attr("height", h)
    .attr("fill", "grey");

    function ausMap() {
      return (
        d3.json("state.json").then(function(json) {
          svg.selectAll("path")
            .data(json.features)
            .enter()
            .append("path")
            .attr("d", path)
            .style("cursor", "pointer")
            .on("mouseover", function() {
              d3.select(this)
                .style("fill", "rgb(3, 51, 75)");
      
              // Define the 'd' variable
              var d = d3.select(this).data()[0];
      
              // Add a label to show the name of the state
              svg.append("text")
                .attr("class", "label")
                .attr("x", path.centroid(d)[0])
                .attr("y", path.centroid(d)[1])
                .style("fill", "white")
                .style("font-size", "14px")
                .style("font-weight", "bold")
                .style("text-anchor", "middle")
                .text(d.properties.STATE_NAME);
            })
            .on("mouseout", function() {
              d3.select(this)
                .style("fill", "grey");
      
              // Remove the label
              svg.select(".label").remove();
            })
            //On click, change graph
            .on("click", function() {
              //Variable for what state was clicked
              var d = d3.select(this).data()[0];
              var selectedState = d.properties.STATE_NAME;

              //Import csv
              d3.csv("csv/stateMigration.csv", function(d){
                return {
                  country: d.Country,
                  state: +d[selectedState]    //only imported the data for selected state
                }
              }).then(function(data) {
                stateData = data;

                //Changing to world map
                var newProjection = d3.geoMercator()
                  .center([-25, 40])
                  .translate([w / 2, h / 2])
                  .scale(180);

                //New path for world map
                var newPath = d3.geoPath()
                  .projection(newProjection);

                svg.selectAll("path").remove();

                //Load in whole world json file
                d3.json("world.json").then(function(json) {
              
                //Filter out Antarctica
                var filteredFeatures = json.features.filter(function(feature) {
                  return feature.properties.ADMIN !== "Antarctica";
                });


                // Define the country codes of the selected countries
                var selectedCountryCodes = ["GBR", "NZL", "CHN", "IND", 
                                            "PHL", "VNM", "ITA", "ZAF", 
                                            "MYS", "LKA", "GRC", "KOR", 
                                            "USA", "IDN", "NLD"];

                // Filter the features based on the selected country codes
                var selectedCountries = filteredFeatures.filter(function(d) {
                  return selectedCountryCodes.includes(d.properties.ISO_A3);
                });

                svg.selectAll("path")
                  .data(filteredFeatures)
                  .enter()
                  .append("path")
                  .attr("d", newPath)
                  .style("cursor", "pointer")
                  .style("fill", function(d) {
                    d.properties.countryName = getCountryName(d);
                    return colour(d.properties.value);
                  });

                // Create labels for selected countries
                svg.selectAll(".label")
                  .data(selectedCountries)
                  .enter()
                  .append("text")
                  .attr("class", "label")
                  .attr("x", function(d) {
                    var centroid = newPath.centroid(d);
                    return centroid[0];
                  })
                  .attr("y", function(d) {
                    var centroid = newPath.centroid(d);
                    return centroid[1];
                  })
                  .style("fill", "black")
                  .style("font-size", "15px")
                  .style("text-anchor", "middle")
                  .style("font-weight", "bold")
                  .text(function(d) { return d.properties.countryName; })
                  .each(function() {
                    var bbox = this.getBBox();
                    d3.select(this)
                      .attr("dx", -bbox.width / 2)
                      .attr("dy", bbox.height / 2);
                  });

                function getCountryName(d) {
                  return d.properties.ADMIN;
                }

                //Defining values
                for(var i = 0; i < stateData.length; i++) {

                  var dataCountry = stateData[i].country;
                  var dataValue = stateData[i].state;

                  colour.domain([
                      d3.min(stateData, function(d) { return d.state }),
                      d3.max(stateData, function(d) { return d.state })
                  ]);

                  for(var j = 0; j < json.features.length; j++) {
                    var jsonCountry = json.features[j].properties.ADMIN;
                    if(dataCountry == jsonCountry) { 
                      json.features[j].properties.value = dataValue;
                      svg.selectAll("path")
                        .filter(function(d) {
                          return d.properties.ADMIN === jsonCountry;
                        })
                        .style("fill", function() {
                          for(var k = 0; k < dataCountry.length; k++) {
                            console.log(dataCountry);
                          if(jsonCountry == dataCountry) {
                            return colour(dataValue);
                          }
                        }
                        });
                    }
                  }
                }

                //Importing country centre coordinates for lines
                d3.csv("csv/countryCentre.csv", function (centre){
                  return {
                    country: centre.Country,
                    lon: +centre.Lon,
                    lat: +centre.Lat
                  }
                }).then(function(data) {
                  var centreData = data;
                  
                  //Drawing each line connected to Australia 
                  for(var i = 0; i < centreData.length; i++){ 
                    var source = [ausLat, ausLon];      //Hard coded centre of Australia
                    var target = [+centreData[i].lon, +centreData[i].lat];    //Using CSV
                    svg.append("line")
                      .attr("x1", newProjection(source)[0])
                      .attr("y1", newProjection(source)[1])
                      .attr("x2", newProjection(target)[0])
                      .attr("y2", newProjection(target)[1])
                      .style("stroke", "#FF8000")
                      .style("stroke-width", 1);
                  }

                  });
                });

                });
              });
            })
          )
        }

        //Display map using function set above
        ausMap();

        //When button is pressed, resets whole process, deleting all svg elements then recreating it from the start
        document.getElementById("returnButton").onclick = function() {
          svg.selectAll("path").remove();       //Remove maps
          svg.selectAll("text").remove();       //Remove text
          svg.selectAll("line").remove();       //Remove lines
          ausMap();
        };
    }
  
  window.onload = init;
