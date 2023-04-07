function init() {

	//Max value for data
    var maxValue = 25;
	
	// width and height
	var w = 600;
	var h = 250;
	
	var barPadding = 10;
	var dataset=[4,22,18,5,9,7,16,21,9,13,23,9,24,17,8,25,19,4,22,14,6,21];
	
	// ordinal scale method
	var xScale = d3.scaleBand() 
					.domain(d3.range(dataset.length))
					.rangeRound([0, w])
					.paddingInner(0.05);
					
	var yScale = d3.scaleLinear()
					.domain([d3.max(dataset,function(d){
                        return 30;
                    }),
                    d3.min(dataset,function(d){
                        return 0;
                    })])
					.range([0, h]);
					
	//Axis
	var xAxis = d3.axisBottom()
                .ticks(5)
                .scale(xScale);

    var yAxis = d3.axisLeft()
                .ticks(5)
                .scale(yScale);
	
	//Create SVG element
	var svg = d3.select("#chart")
			.append("svg")
			.attr("width", w+50)
			.attr("height", h+50);
	
			//On click, update with new data
			d3.select("button")
				.on("click", function() {
					
					//Random values for dataset
					var numValues = dataset.length;
							
					dataset = [];
							
					for (var i = 0; i < numValues; i++) {
						var newNumber = Math.floor(Math.random()* maxValue);
						dataset.push(newNumber);
					}
					
					//Update all rects
					svg.selectAll("rect")
					.data(dataset)
					.attr("x", function(d, i){
						return xScale(i)+20;
					})
					.attr("y", function(d){
						return yScale(d);
					})
					.attr("width", xScale.bandwidth())
					.attr("height", function(d) {
						return h-yScale(d);})
					.attr("fill", function(d){
						return "rgb(0, 0, " + (d * 10) + ")";
					});
						console.log(dataset);
					
					//Update all texts
					svg.selectAll("text")
					.data(dataset)
					.text(function(d) {
						return d;
					})
					.attr("text-anchor", "middle")
					.attr("x", function(d, i) {
						return xScale(i)+20+ xScale.bandwidth()/2;;
					})
					.attr("y", function(d) {
						return yScale(d)+14;
					})
					.attr("font-family", "sans-serif")
					.attr("font-size", "11px")
					.attr("fill", "white"); 
				})
	
	//Create bars	
	svg.selectAll("rect")
		.data(dataset)
		.enter()
		.append("rect")
		.attr("x", function(d, i){
			return xScale(i)+20;
		})
		.attr("y", function(d){
			return yScale(d);
		})
		.attr("width", xScale.bandwidth())
		.attr("height", function(d) {
			return h-yScale(d)})
		.attr("fill", function(d){
				return "rgb(0, 0, " + (d * 10) + ")";
			});
			
	//Create labels
	svg.selectAll("text")
            .data(dataset)
            .enter()
            .append("text")
			.text(function(d) {
				return d;
			})
			.attr("text-anchor", "middle")
            .attr("x", function(d, i) {
                return xScale(i) + 20 + xScale.bandwidth() / 2;
            })
            .attr("y", function(d) {
                return yScale(d) + 14;
            })
            .attr("font-family", "sans-serif")
			.attr("font-size", "11px")
            .attr("fill", "white");

	//Width		
	svg.append("g")
        .attr("transform","translate(0, "+(h - barPadding+10) +")")
        .call(xAxis);
    //Height
    svg.append("g")
        .attr("transform","translate("+(barPadding+10) +")")
        .call(yAxis);
		

}

window.onload = init;