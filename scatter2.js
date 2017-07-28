var internet = [
{ country: "Australia", speed: 5.45, price: 35.18 },
{ country: "Austria", speed: 6.66, price: 30.08 },
{ country: "Belgium", speed: 15.46, price: 29.87 },
{ country: "Canada", speed: 7.76, price: 47.13 },
{ country: "Chile", speed: 2.00, price: 61.61 },
{ country: "Czech Republic", speed: 7.88, price: 29.74 },
{ country: "Denmark", speed: 14.74, price: 29.07 },
{ country: "Estonia", speed: 7.44, price: 30.89 },
{ country: "Finland", speed: 9.42, price: 20.47 },
{ country: "France", speed: 5.27, price: 34.91 },
{ country: "Germany", speed: 8.83, price: 40.24 },
{ country: "Greece", speed: 6.32, price: 41.58 },
{ country: "Hungary", speed: 10.77, price: 24.56 },
{ country: "Iceland", speed: 8.98, price: 39.33 },
{ country: "Ireland", speed: 6.48, price: 28.14 },
{ country: "Israel", speed: 4.35, price: 25.04 },
{ country: "Italy", speed: 3.59, price: 37.51 },
{ country: "Japan", speed: 10.08, price: 25.81 },
{ country: "Luxembourg", speed: 10.37, price: 51.09 },
{ country: "Mexico", speed: 2.46, price: 61.90 },
{ country: "Netherlands", speed: 16.04, price: 41.93 },
{ country: "New Zealand", speed: 5.66, price: 33.85 },
{ country: "Norway", speed: 10.41, price: 49.30 },
{ country: "Poland", speed: 6.33, price: 30.21 },
{ country: "Portugal", speed: 6.96, price: 38.11 },
{ country: "Slovak Republic", speed: 5.40, price: 19.04 },
{ country: "Slovenia", speed: 6.79, price: 39.40 },
{ country: "Spain", speed: 5.60, price: 49.07 },
{ country: "Sweden", speed: 12.91, price: 33.21 },
{ country: "Switzerland", speed: 11.17, price: 41.02 },
{ country: "Turkey", speed: 1.90, price: 62.01 },
{ country: "United Kingdom", speed: 7.49, price: 35.07 },
{ country: "United States", speed: 5.92, price: 69.66 },
];

// Calling the method below
 showScatterPlot(internet);

 function showScatterPlot(data)
 {
     // Spacing Around
     var margins =
     {
         "left": 40,
         "right": 50,
         "top": 30,
         "bottom": 30
     };

     var padding = 15;
     var paddingbottom = 40;

     var width = 800;
     var height = 500;

     var dollarFormat = function(d) { return '$' + d3.format(',f')(d) };


     // This will be our colour scale. An Ordinal scale.
     var colors = d3.scale.category10();

     // Adding the SVG component to the scatter-load div and making it mobile responsive
     var svg = d3.select("#scatter2").append("svg")
                  // makes chart responsive
                  .attr("viewBox", "0 0 " + width + " " + height )
                  .attr("preserveAspectRatio", "xMidYMid meet")
                  .append("g")
                  .attr("transform", "translate(" + margins.left + "," + margins.top + ")");

     // Setting the scale that we're using for the X axis.
     // Domain define the min and max variables to show. In this case, it's the min and max Votes of items.
     // this is made a compact piece of code due to d3.extent which gives back the max and min of the Vote variable within the dataset
     var x = d3.scale.linear()
     .domain(d3.extent(data, function (d)
     {
         return d.speed;
     }))

     // Range maps the domain to values from 0 to the width minus the left and right margins (used to space out the visualization)
     .range([padding, width - margins.left - margins.right - padding ]);

     // Scalling for the y axis but maps from the rating variable to the height to 0.
     var y = d3.scale.linear()
     .domain(d3.extent(data, function (d)
     {
         return d.price - 1;
     }))

     .range([height  - margins.top - margins.bottom - padding, padding]);

     // Adding the axes SVG component. At this point, this is just a placeholder. The actual axis will be added in a bit
     svg.append("g").attr("class", "x axis").attr("transform", "translate(0," + y.range()[0] + ")");
     svg.append("g").attr("class", "y axis");

     // X axis label. Nothing too special to see here.
     svg.append("text")
     .attr("fill", "#414241")
     .attr("text-anchor", "end")
     .attr("x", width / 2)
     .attr("y", height - 35)
     .text("Speed in Mbps");


     // Actual definition of our x and y axes. The orientation refers to where the labels appear - for the x axis, below or above the line, and for the y axis, left or right of the line. Tick padding refers to how much space between the tick and the label. There are other parameters too - see https://github.com/mbostock/d3/wiki/SVG-Axes for more information
 var xAxis = d3.svg.axis().scale(x).orient("bottom").tickPadding(2);
 var yAxis = d3.svg.axis().scale(y).orient("left").tickPadding(2).tickFormat(dollarFormat);

     // Selecting the axis we created a few lines earlier. See how we select the axis item. in our svg we appended a g element with a x/y and axis class. To pull that back up, we do this svg select, then 'call' the appropriate axis object for rendering.
     svg.selectAll("g.y.axis").call(yAxis);
     svg.selectAll("g.x.axis").call(xAxis);

     // Now, we can get down to the data part, and drawing stuff. We are telling D3 that all nodes (g elements with class node) will have data attached to them. The 'key' we use (to let D3 know the uniqueness of items) will be the name. Not usually a great key, but fine for this example.
     var chocolate = svg.selectAll("g.node").data(data, function (d)
     {
         return d.country;
     });

     // Define the div for the tooltip
var div = d3.select("body").append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

     // We 'enter' the data, making the SVG group (to contain a circle and text) with a class node. This corresponds with what we told the data it should be above.

     var chocolateGroup = chocolate.enter().append("g").attr("class", "node")



     // this is how we set the position of the items. Translate is an incredibly useful function for rotating and positioning items
     .attr('transform', function (d)
     {
         return "translate(" + x(d.speed) + "," + y(d.price) + ")";
     });

     // Adding our first graphics element! A circle!
     chocolateGroup.append("circle")
     .attr("r", 10)
     .attr("class", "dot")
     .style("fill", "#A8DAE0")
     .on("mouseover", function(d) {
            div.transition()
                .duration(200)
                .style("opacity", .9);
            div	.html("<b>" + (d.country) + "</b>" + "<br/>"  + "Price: $" + d.price + " per month" + "<br/>"  + "Speed: " + d.speed + " Mbps")
                .style("left", (d3.event.pageX + 15) + "px")
                .style("top", (d3.event.pageY - 28) + "px");
            })
            .on("mouseout", function(d) {
                  div.transition()
                      .duration(500)
                      .style("opacity", 0);
              })
     ;



     // Adding some text, so we can see what each item is.


     var myMouseoverFunction = function() {
				var circle = d3.select(this);
        console.log("hey")
				circle.transition().duration(500)
					.attr("r", circle.attr("r") * 1 + 10 );
			}



 }
