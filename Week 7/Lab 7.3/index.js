function init() {

    var w = 300;
    var h = 300;

    var padding = 20;

    var dataset = [
        { apples: 5, oranges: 10, grapes: 22 },
        { apples: 4, oranges: 12, grapes: 28 },
        { apples: 2, oranges: 19, grapes: 32 },
        { apples: 7, oranges: 23, grapes: 35 },
        { apples: 23, oranges: 17, grapes: 43 }
        ];

    var stack = d3.stack()
                  .keys(["grapes", "oranges", "apples"]);

    var series = stack(dataset);

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)
                .attr("height", h);

    var color = d3.scaleOrdinal(d3.schemeDark2);

    var groups = svg.selectAll("g")
                    .data(series)
                    .enter()
                    .append("g")
                    .style("fill", function(d, i) {
                        return color(i);
                    });

    var xScale = d3.scaleBand()
                .domain(d3.range(dataset.length))
                .rangeRound([padding, w - padding])
                .padding(0.05); 

    var yScale = d3.scaleLinear()
               .domain([0, d3.max(dataset, function(d) { 
                   return d.apples + d.oranges + d.grapes; 
                   })
               ])
               .range([h - padding, padding]);

    var xAxis = d3.axisBottom()
                  .ticks(5)
                  .scale(xScale);

    var yAxis = d3.axisLeft()
                  .ticks(5)
                  .scale(yScale);

    var rects = groups.selectAll("rect")
                      .data(function(d) { return d; })
                      .enter()
                      .append("rect")
                      .attr("x", function(d, i) {
                          return xScale(i);
                      })
                      .attr("y", function(d, i) {
                          return yScale(d[1]);
                      })
                      .attr("height", function(d) {
                          return yScale(d[0]) - yScale(d[1]);
                      })
                      .attr("width", xScale.bandwidth());

    svg.append("g")
       .attr("transform", "translate(0, " + (h - padding) + ")")
       .call(xAxis);

    svg.append("g")
       .attr("transform", "translate(" + (padding) + ", 0)")
       .call(yAxis);

}

window.onload = init;