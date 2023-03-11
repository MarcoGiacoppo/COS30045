function init() {

    var w = 600;
    var h = 300;

    var padding = 20;

    var dataset = [ [5, 20],
                    [500, 90],
                    [250, 50],
                    [100, 33],
                    [330, 95],
                    [410, 12],
                    [475, 44],
                    [25, 67],
                    [85, 21],
                    [220, 88],
                    ];

    var xScale = d3.scaleLinear()
                  .domain([d3.min(dataset, function(d) {    //data input range
                        return d[0];
                  }), 
                  d3.max(dataset, function(d) {
                        return d[0];
                  })])   
                  .range([padding, w - padding]);           //range available for visualisation
    
    var yScale = d3.scaleLinear()
                   .domain([d3.min(dataset, function(d) {    
                        return d[1];
                   }), 
                   d3.max(dataset, function(d) {
                        return d[1];
                   })])   
                   .range([h - padding, padding]); 

    var xAxis = d3.axisBottom()
                  .ticks(5)
                  .scale(xScale);

    var yAxis = d3.axisLeft()
                  .ticks(5)
                  .scale(yScale);

    var svg = d3.select("div")
                .append("svg")
                .attr("width", w)   //total length
                .attr("height", h); //total height

    svg.selectAll("circle")
        .data(dataset)
        .enter()            
        .append("circle")
        .attr("cx", function(d, i) {                
            return xScale(d[0]);
        })
        .attr("cy", function(d) {
            return yScale(d[1]);
        })
        .attr("r", 4)
        .attr("fill", "purple");

    svg.selectAll("text")
        .data(dataset)
        .enter()
        .append("text")
        .text(function(d) {
            return d[0] + "," + d[1];
        })
        .attr("x", function(d) {
            return xScale(d[0] - 20);
        })
        .attr("y", function(d) {
            return yScale(d[1] + 8);
        })

    svg.append("g")
       .attr("transform", "translate(0, " + (h - padding) + ")")
       .call(xAxis);

    svg.append("g")
       .attr("transform", "translate(" + (padding) + ", 0)")
       .call(yAxis);
}

window.onload = init;