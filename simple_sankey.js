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
      .size([canvas.width, canvas.height])
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
  
    }
  })
})(this.parseUtils);
