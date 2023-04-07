function init() {

    var w = 600;
    var h = 200;

    var maxValue = 30;

    var dataset = [14, 5, 26, 23, 9, 20, 12, 17, 10, 4, 9, 20, 29, 30, 12, 4, 8, 15, 28, 27, 25, 3, 11, 13, 5];
   
    var xScale = d3.scaleBand()
                   .domain(d3.range(dataset.length))
                   .rangeRound([0, w])
                   .paddingInner(0.05);

    var yScale = d3.scaleLinear()
                   .domain([0, d3.max(dataset)])
                   .range([0, h]);

    var svg = d3.select("#chart")
                .append("svg")
                .attr("width", w)   //total length
                .attr("height", h); //total height

    //Update
    d3.select("#btn1")
    .on("click", function() {
        //alert("Hey, the button works!")
        var numValues = dataset.length;
        
        dataset = [];
        
        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber); 
        }

        svg.selectAll("rect")
           .data(dataset)
           .transition() //calling a transition
           .delay(function (d, i) {
               return i / dataset.length * 1000;
           })
           .duration(function(d, i) {
               return i* 100;
           })
           .ease(d3.easeCircleIn)
           // .attr("x", function(d, i) {                
           //     return xScale(i);
           // })
           .attr("y", function(d) {
               return h - yScale(d);
           })
           // .attr("width", xScale.bandwidth())
           .attr("height", function(d) {
               return yScale(d);
           })
           .attr("fill", function(d) {
               return "rgb(" + (d * 10) + ", 0, 0)";
           });

           svg.selectAll("text")
           .data(dataset)
           .text(function(d) {
               return d;
           })
           .attr("x", function(d, i) {
               return xScale(i) + xScale.bandwidth() / 2;
           })
           .attr("y", function(d) {
               return h - yScale(d) + 14;
           })
           .attr("fill", "white")
           .attr("text-anchor", "middle");
    });

    //Transition 1
    d3.select("#btn2")
    .on("click", function() {
        var numValues = dataset.length;

        dataset = [];
        
        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber); 
        }

        svg.selectAll("rect")
           .data(dataset)
           .transition()
           .duration(500)
           .ease(d3.easeCircleOut)
           // .attr("x", function(d, i) {                
           //     return xScale(i);
           // })
           .attr("y", function(d) {
            return h - yScale(d);
           })
           // .attr("width", xScale.bandwidth())
           .attr("height", function(d) {
               return yScale(d);
           })
           .attr("fill", function(d) {
               return "rgb(0, 0, " + (d * 10) + ")";
           });

           svg.selectAll("text")
           .data(dataset)
           .text(function(d) {
               return d;
           })
           .attr("x", function(d, i) {
               return xScale(i) + xScale.bandwidth() / 2;
           })
           .attr("y", function(d) {
               return h - yScale(d) + 14;
           })
           .attr("fill", "white")
           .attr("text-anchor", "middle");           
    });

    //Transition 2
    d3.select("#btn3")
    .on("click", function() {
        var numValues = dataset.length;

        dataset = [];
        
        for (var i = 0; i < numValues; i++) {
            var newNumber = Math.floor(Math.random() * maxValue);
            dataset.push(newNumber); 
        }

        svg.selectAll("rect")
           .data(dataset)
           .transition()
           .delay(1000)
           .duration(2000)
           .ease(d3.easeCircleInOut)
           // .attr("x", function(d, i) {                
           //     return xScale(i);
           // })
           .attr("y", function(d) {
               return h - yScale(d);
           })
           // .attr("width", xScale.bandwidth())
           .attr("height", function(d) {
               return yScale(d);
           })
           .attr("fill", function(d) {
               return "rgb(0, 0, " + (d * 10) + ")";
           });

        svg.selectAll("text")
           .data(dataset)
           .text(function(d) {
               return d;
           })
           .attr("x", function(d, i) {
               return xScale(i) + xScale.bandwidth() / 2;
           })
           .attr("y", function(d) {
               return h - yScale(d) + 14;
           })
           .attr("fill", "white")
           .attr("text-anchor", "middle");
    });

    svg.selectAll("rect")
        .data(dataset)
        .enter()            
        .append("rect")
        .attr("x", function(d, i) {                
            return xScale(i);
        })
        .attr("y", function(d) {
            return h - yScale(d);
        })
        .attr("width", xScale.bandwidth())
        .attr("height", function(d) {
            return yScale(d);
        })
        .attr("fill", function(d) {
            return "rgb(0, 0, " + (d * 10) + ")";
        });

    svg.selectAll("text")
       .data(dataset)
       .enter()
       .append("text")
       .text(function(d) {
           return d;
       })
       .attr("x", function(d, i) {
           return xScale(i) + xScale.bandwidth() / 2;
       })
       .attr("y", function(d) {
           return h - yScale(d) + 14;
       })
       .attr("fill", "white")
       .attr("text-anchor", "middle");
}

window.onload = init;