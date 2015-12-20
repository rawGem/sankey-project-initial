

parseUtils = {};


parseUtils.uniqueSegments = function(obj, accessor, array) {
  segments = obj[accessor].split("-")

  segments.forEach(function(el, i, a) { 
    if (array.indexOf(el.trim()) < 0 ) 
      array.push(el.trim());
  })
  return array;
};


parseUtils.parseSegments = function(seg) {
  segments = seg.split("-")
  segments.forEach(function(el, i, a) { 
      segments[i] = el.trim()
  })
  return segments;
};


parseUtils.compareBySegmentRank = function(a,b) {
   if (a["Segment rank"] < b["Segment rank"]) 
     return -1;
   else 
     return 1;
}


parseUtils.routesSortedBySegmentRank = function(rows) {

  var self = this;

  var routesObj = {};

  rows.forEach(
    function(el, i, a) {
      if (Object.keys(routesObj).indexOf(el["Path ID"]) > -1) 
        routesObj[el["Path ID"]].push(el);
      else 
        routesObj[el["Path ID"]] = [el];
  })

  Object.keys(routesObj).forEach(
    function(el, i, arr) {
      routesObj[el].sort(self.compareBySegmentRank);
  })

  return routesObj;
};


parseUtils.sankeyLinksFromRoutes = function(data) {
  var links = [],
      nodes = [];
  // links -> {source: , target: , value: }

  links = Object.keys(data).map(
  function(el, i, a) {
    return {source : i, 
            target : 10, 
            value  : parseFloat(data[el][0]["Product volume"])}   
  })

  return links;
}

parseUtils.sankeyNodesFromRoutes = function(data) {
  var nodes = [];
  nodes = Object.keys(data).map(
  function(el, i, a) {
    return {node : 11, 
            name : "RU-"+el};
  })

  nodes.push({node : 999, name: "CO"});

  return nodes;
}

//parseUtils.segmentNamesByPathId = function(paths, segments) {
//}
