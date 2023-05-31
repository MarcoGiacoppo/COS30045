function init() {
    var w = 800;
    var h = 600;
    var padding = 100;

  
  // Load the CSV file
  d3.csv("csv/ausArrivals.csv").then(function(csvData) {
    // Format the data
    var parseDate = d3.timeParse("%Y");
    data = csvData.map(function(d) {
      return {
        year: parseDate(d.Period),
        NSW: +d["New South Wales"],
        VIC: +d["Victoria"],
        QLD: +d["Queensland"],
        SA: +d["South Australia"],
        WA: +d["Western Australia"],
        TAS: +d["Tasmania"],
        NT: +d["Northern Territory"],
        ACT: +d["Australian Capital Territory"]
      };
    });

    lineChart(data, "NSW"); // Initial chart with NSW data
  });
  
    // Add event listeners to the state buttons
    document.getElementById("btnNSW").addEventListener("click", function() {
      lineChart(data, "NSW");
    });
  
    document.getElementById("btnVIC").addEventListener("click", function() {
      lineChart(data, "VIC");
    });
  
    document.getElementById("btnQLD").addEventListener("click", function() {
      lineChart(data, "QLD");
    });

    document.getElementById("btnSA").addEventListener("click", function() {
        lineChart(data, "SA");
      });
    
    document.getElementById("btnWA").addEventListener("click", function() {
        lineChart(data, "WA");
      });

    document.getElementById("btnTAS").addEventListener("click", function() {
        lineChart(data, "TAS");
      });

    document.getElementById("btnNT").addEventListener("click", function() {
        lineChart(data, "NT");
      });

    document.getElementById("btnACT").addEventListener("click", function() {
        lineChart(data, "ACT");
      });
  
    function lineChart(dataset, state) {
    //Remove the previous chart
    d3.select(".lineChart").selectAll("svg").remove();
    
      var xScale = d3.scaleTime()
        .domain(d3.extent(dataset, function(d) { return d.year; }))
        .range([padding, w - padding]);
        
      var yScale = d3.scaleLinear()
        .domain([1, d3.max(dataset, function(d) { return d[state]; })]) 
        .range([h - padding, padding]);
  
      var xAxis = d3.axisBottom(xScale)
        .ticks(6);
  
      var yAxis = d3.axisLeft(yScale)
        .ticks(8);
  
      var svg = d3.select(".lineChart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
  
      svg.append("g")
        .attr("transform", "translate(0," + (h - padding) + ")")
        .transition()
        .duration(1500)
        .call(xAxis)
        .style("font-size", "12px");
  
      svg.append("g")
        .attr("transform", "translate(" + padding + ", 0)")
        .transition()
        .duration(1500)
        .call(yAxis)
        .style("font-size", "12px");
  
      var path = svg.append("path")
        .datum(dataset)
        .attr("fill", "none")
        .attr("stroke", "steelblue")
        .attr("stroke-width", 1.5)
        .attr("d", d3.line()
          .x(function(d) { return xScale(d.year); })
          .y(function(d) { return yScale(d[state]); }));

      // Get the total length of the line
      var totalLength = path.node().getTotalLength();

      path.attr("stroke-dasharray", totalLength + " " + totalLength)
        .attr("stroke-dashoffset", totalLength)
        .transition()
        .duration(2000)
        .ease(d3.easeLinear)
        .attr("stroke-dashoffset", 0);

        // Add tooltip
        var tooltip = d3.select(".lineChart")
        .append("div")
        .attr("class", "tooltip")
        .style("position", "absolute")
        .style("visibility", "hidden")
        .style("background-color", "rgba(0, 0, 0, 0.8)")
        .style("color", "white")
        .style("padding", "10px")
        .style("font-size", "14px")
        .style("border-radius", "5px")
        .style("pointer-events", "none");
        

        svg.selectAll(".dot")
        .data(dataset)
        .enter()
        .append("circle")
        .attr("class", "dot")
        .attr("cx", function(d) { return xScale(d.year); })
        .attr("cy", function(d) { return yScale(d[state]); })
        .attr("r", 4)
        .attr("fill", "steelblue")
        .attr("cursor", "pointer")
        .on("mouseover", function(d) {
            var arrival = d3.select(this).datum()[state];
            tooltip.style("visibility", "visible")
              .html("Arrivals: " + arrival.toLocaleString());
          
            // Get the position of the dot
            var dot = d3.select(this);
            var x = dot.attr("cx");
            var y = dot.attr("cy");
          
            // Calculate the tooltip position relative to the dot
            var tooltipWidth = tooltip.node().getBoundingClientRect().width;
            var tooltipHeight = tooltip.node().getBoundingClientRect().height;
            var xOffset = tooltipWidth - 450;
            var yOffset = -(tooltipHeight + 400);
            var tooltipX = parseFloat(x) + xOffset;
            var tooltipY = parseFloat(y) + yOffset + padding;
          
            tooltip.style("transform", `translate(${tooltipX}px, ${tooltipY}px)`);
          })

          .on("mouseout", function(d) {
            tooltip.style("visibility", "hidden");
          });


      // Add title
      svg.append("text")
        .attr("x", w / 2)
        .attr("y", padding / 2)
        .transition()
        .duration(1500)
        .attr("text-anchor", "middle")
        .style("font-size", "20px")
        .style("font-weight", "bold")
        .text("Migrations to "+ state);
  
      // Add axis labels
      svg.append("text")
        .attr("transform", "rotate(-90)")
        .attr("x", -h / 2)
        .attr("y", padding / 2)
        .transition()
        .delay(1000)
        .attr("dy", "-1em")
        .style("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text("Number of Arrivals");
  
      svg.append("text")
        .attr("x", w / 2)
        .attr("y", h - padding / 2)
        .transition()
        .delay(1000)
        .attr("text-anchor", "middle")
        .style("font-size", "14px")
        .style("font-weight", "bold")
        .text("Year");
    }
  }
  window.onload = init;
