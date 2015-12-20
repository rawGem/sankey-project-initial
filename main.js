

(function() {
  'use strict';

  var height = 500,
      width = 960,
      margin = {left: 10, right: 50, top: 15, bottom: 15};
  
  var svg  = d3.select("body").append("svg")
              .attr("height", height)
              .attr("width", width);
               
  var data = d3.range(3);
  var data = [30,30,30];

  svg.selectAll("path").data(data).enter()
        .append("path")
        .attr("d", drawCustom)
        .attr("fill", "none")
        .attr("stroke", function(d,i) { return "#"+(i+1)*2+(i+1)*0+i*2})
        .attr("stroke-width", function(d,i) {return d})

  //svg.append("path").datum(data)
  //      .attr("d", drawCustom)
  //      .attr("fill", "none")
  //      .attr("stroke", function(d,i) { return "#"+(i+1)*2+(i+1)*0+i*2})
  //      .attr("stroke-width", function(d,i) {return d})

  svg.append("circle")
     .attr("r", 45)
     .attr("cx", 25)
     .attr("cy", 45)
     .attr("fill", "navajowhite")

  function drawCustom(d,i) {
    var source_x = 25,
        target_x = 800;

    var sum = function(prev, cur, i) { 
                 return prev + cur 
              };
    
    var slice = data.slice(0,i),
        offset;

    if (slice.length > 0) 
      offset = data.slice(0,i).reduce(sum) + d/2;
    else 
      offset = d/2 


    //var source_y = i === 0 ? 25 : offset + 25,
    //    target_y = i === 0 ? 75 : offset + 75;

    var source_y = offset,
        target_y = offset+200;

    var source = [25, source_y],
        target = [800,target_y],
        source_control_points = source.slice(),
        target_control_points = target.slice(); 

    //var p1 = [0,      circleY(d) + radius],        //start [x, y] cord
    //    p2 = [width,  rect2Y(i)],                  //end   [x, y] cord
    //    c1 = p1.slice(),                           //control point cord
    //    c2 = p2.slice();                           //control point cord

        //move both control point 
     //   c1[0] += width/3;             
     //   c2[0] -= width/3;
        
        source_control_points[0] += 300;
        target_control_points[0] -= 300;

        return ['M', source, 
                'C', source_control_points, ' ', 
                     target_control_points, ' ', 
                     target].join('');
        //return ['M', p1, 'C', c1, ' ', c2, ' ', p2].join('');
  }

  function drawBezier(d,i) {
    var source = [25, ((d*10))+25],
        target = [800,((d*10))+70],
        source_control_points = source.slice(),
        target_control_points = target.slice(); 

    //var p1 = [0,      circleY(d) + radius],        //start [x, y] cord
    //    p2 = [width,  rect2Y(i)],                  //end   [x, y] cord
    //    c1 = p1.slice(),                           //control point cord
    //    c2 = p2.slice();                           //control point cord

        //move both control point 
     //   c1[0] += width/3;             
     //   c2[0] -= width/3;
        
        source_control_points[0] += 300;
        target_control_points[0] -= 300;

        return ['M', source, 
                'C', source_control_points, ' ', 
                     target_control_points, ' ', 
                     target].join('');
        //return ['M', p1, 'C', c1, ' ', c2, ' ', p2].join('');
  }

})()
