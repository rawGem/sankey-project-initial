(function(utils) {
  "use strict";

d3.csv("route561.csv", function(err, data) {
  if (!err) {
    var d = data.sort(utils.compareBySegmentRank);
  }
})

d3.csv("order11_data.csv", function(err, data) {
  if (!err) {
      
  var objOfRoutes = utils.routesSortedBySegmentRank(data);
  var routeLinks = utils.sankeyLinksFromRoutes(objOfRoutes);
  var routeNodes = utils.sankeyNodesFromRoutes(objOfRoutes);

  var canvas = {};
      canvas.margin = 30;
      canvas.width = 900 + 2*canvas.margin;
      canvas.height = 440 + 2*canvas.margin;

  var units = "Liters"

var formatNumber = d3.format(",.0f"),    // zero decimal places
    format = function(d) { return formatNumber(d) + " " + units; },
    color = d3.scale.category20();

  var data   = {};
  data.nodes = [];
  data.links = [{source: 0, target: 1, value: 24},
                {source: 1, target: 2, value: 24},
                {source: 2, target: 3, value: 24},
                {source: 3, target: 5, value: 12},
                {source: 4, target: 5, value: 12}
                ];
  
  var svg   = d3.select("body").append("svg").attr("width", canvas.width)
                                             .attr("height", canvas.height)

  d3.range(6).forEach(function(el, i, a) {
    data.nodes.push({node: i, name: "N-"+i});
  });

  var sankey = d3.sankey()
      .nodeWidth(36)
      .nodePadding(40)
      .size([canvas.width, canvas.height-2*canvas.margin])
      .nodes(routeNodes)
      .links(routeLinks)
      //.nodes(data.nodes)
      //.links(data.links)
      .layout(32);

  var link = svg.append("g").selectAll(".link")
      //.data(data.links)
      .data(routeLinks)
    .enter().append("path")
      .attr("class", "link")
      .attr("d", sankey.link())
      .style("stroke-width", function(d) { 
         return Math.max(1, d.dy); })
      //.attr("stroke", "#fff")
      .sort(function(a, b) { return b.dy - a.dy; });
  

  // add in the nodes
  var node = svg.append("g").selectAll(".node")
        //.data(graph.nodes)
        .data(routeNodes)
      .enter().append("g")
        .attr("class", "node")
        .attr("transform", function(d) { 
        return "translate(" + d.x + "," + d.y + ")"; })
      //.call(d3.behavior.drag()
      //  .origin(function(d) { return d; })
      //  .on("dragstart", function() { 
      //  this.parentNode.appendChild(this); })
      //  .on("drag", dragmove));

  
  // add the rectangles for the nodes
    node.append("rect")
        .attr("height", function(d) { 
               console.log(d)
               return d.dy; })
        .attr("width", sankey.nodeWidth())
        .style("fill", function(d) { 
        return d.color = color(d.name.replace(/ .*/, "")); })
        .style("stroke", function(d) { 
        return d3.rgb(d.color).darker(2); })
      .append("title")
        .text(function(d) { 
        return d.name + "\n" + format(d.value); });

// add in the title for the nodes
  node.append("text")
      .attr("x", -6)
      .attr("y", function(d) { return d.dy / 2; })
      .attr("dy", ".35em")
      .attr("text-anchor", "end")
      .attr("transform", null)
      .text(function(d) { return d.name; })
    .filter(function(d) { return d.x < canvas.width / 2; })
      .attr("x", 6 + sankey.nodeWidth())
      .attr("text-anchor", "start");

    }
  })
})(this.parseUtils);
