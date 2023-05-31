function init() {
  var w = 800;
  var h = 600;
  var padding = 80;
  var svg = null; // Store reference to the SVG element
  var originalData = null; // Store the original dataset
  var colorScale = d3.scaleOrdinal(d3.schemeTableau10); // Color scale for state categories

  d3.csv("csv/ausDepartures.csv").then(function(data) {
    data.forEach(function(d) {
      d.Year = +d.Year;
      d.Value = +d.Value;
    });

    originalData = data; // Save the original dataset
    drawBarChart(originalData);
  });

  function drawBarChart(dataset) {
    var states = dataset.map(function(d) {
      return d.Category;
    });

    var years = dataset.map(function(d) {
      return d.Year;
    });

    var values = dataset.map(function(d) {
      return d.Value;
    });

    var xScale = d3.scaleBand()
      .domain(years)
      .range([padding, w - padding])
      .padding(0.1);

    var yScale = d3.scaleLinear()
      .domain([0, d3.max(values)])
      .range([h - padding, padding]);

    if (!svg) {
      svg = d3.select(".barChart")
        .append("svg")
        .attr("width", w)
        .attr("height", h);
    } else {
      svg.selectAll("rect").remove(); // Remove existing bars
    }

    var yAxis = d3.axisLeft()
      .ticks(10)
      .scale(yScale);

    var tooltip = d3.select(".barChart")
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

    svg.selectAll("rect")
      .data(dataset)
      .enter()
      .append("rect")
      .style("cursor", "pointer")
      .attr("x", function(d) {
        return xScale(d.Year);
      })
      .attr("y", function(d) {
        return yScale(d.Value);
      })
      .attr("width", xScale.bandwidth())
      .attr("height", function(d) {
        return h - padding - yScale(d.Value);
      })
      .style("fill", function(d) {
        return colorScale(d.Category);
      })
      .on("mouseover", function(d, i) {
        d3.select(this)
          .style("stroke", "black")
          .style("stroke-width", "2px");
        tooltip.style("visibility", "visible")
          .html(i.Category + ": " + i.Value.toLocaleString())
          .style("left", (+950) + "px")
          .style("top", (+270) + "px");
      })
      .on("mouseout", function(d) {
        d3.select(this)
          .style("stroke", "none");
        tooltip.style("visibility", "hidden");
      });

    svg.append("g")
      .attr("transform", "translate(0," + (h - padding) + ")")
      .call(d3.axisBottom(xScale))
      .style("font-size", "12px")
      .style("font-weight", "bold");

    svg.append("g")
      .attr("transform", "translate(" + padding + ",0)")
      .call(yAxis)
      .style("font-size", "12px");

    svg.append("text")
      .attr("class", "axis-title")
      .attr("x", w / 2)
      .attr("y", h - padding + 40)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text("Year");

    svg.append("text")
      .attr("class", "axis-title")
      .attr("transform", "rotate(-90)")
      .attr("x", -h / 2)
      .attr("y", padding - 60)
      .attr("font-weight", "bold")
      .attr("text-anchor", "middle")
      .text("Amount of Departures");

    var legend = svg.append("g")
      .attr("class", "legend")
      .attr("transform", "translate(" + (w - padding - 120) + ",20)");

    var legendItem = legend.selectAll(".legend-item")
      .data(colorScale.domain())
      .enter().append("g")
      .attr("class", "legend-item")
      .attr("transform", function(d, i) {
        return "translate(0," + (i * 20) + ")";
      });

    legendItem.append("rect")
      .attr("x", 0)
      .attr("y", 0)
      .attr("width", 10)
      .attr("height", 10)
      .style("fill", function(d) {
        return colorScale(d);
      });

    legendItem.append("text")
      .attr("x", 15)
      .attr("y", 9)
      .text(function(d) {
        return d;
      })
      .attr("font-size", "12px");

    // Add checkbox input to legend items
    legendItem.append("foreignObject")
      .attr("x", -20)
      .attr("y", -5)
      .attr("width", 15)
      .attr("height", 15)
      .html(function(d) {
        return '<input type="checkbox" class="checkbox" value="' + d + '" checked>';
      });

    // Handle checkbox change event
    d3.selectAll(".checkbox").on("change", function() {
      var checkedStates = [];
      d3.selectAll(".checkbox").each(function() {
        if (this.checked) {
          checkedStates.push(this.value);
        }
      });

      // Filter dataset based on checked states
      var filteredData = originalData.filter(function(d) {
        return checkedStates.includes(d.Category);
      });

      // Update the bars based on filtered data
      svg.selectAll("rect")
        .data(filteredData)
        .transition()
        .duration(500)
        .attr("y", function(d) {
          return yScale(d.Value);
        })
        .attr("height", function(d) {
          return h - padding - yScale(d.Value);
        })
        .style("fill", function(d) {
          return colorScale(d.Category);
        });
    });
  }

}

window.onload = init;
