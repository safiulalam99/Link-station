var linkStation = [
  [0, 0, 10],
  [20, 20, 5],
  [10, 0, 12],
];

var testValue = [
  [0, 0],
  [100, 100],
  [15, 10],
  [18, 18],
];

function get_linkStation_points(linkStationTest) {
  var coordinates = [];
  for (var i = 0; i < linkStationTest.length; i++) {
    coordinates.push([linkStationTest[i][0], linkStationTest[i][1]]);
    
  }
  return coordinates;
}

function get_reach_points(linkStationTest) {
  var reach = [];
  for (var i = 0; i < linkStationTest.length; i++) {
    reach.push(linkStationTest[i][2]); // pushing last value(r) from linkStation arr (x,y,r)
  }
  return reach;
}

// function to calculate distance between point and link station (values sent as parameter in form of [x,y])
function device_distance(testValue, points) {
  return Math.sqrt(
    Math.pow(testValue[0] - points[0], 2) +
      Math.pow(testValue[1] - points[1], 2)
  );
}

// function for calculating all distances between points and links (one by one)
function total_distance(testValue, points) {
  var smallestDistance = [];
  for (var i = 0; i < testValue.length; i++) {
    // loop for point
    var smallestLimit = [999999];
    for (var j = 0; j < points.length; j++) {
      // loop for link station
      if (device_distance(testValue[i], points[j]) < smallestLimit[0]) {
        smallestLimit = [device_distance(testValue[i], points[j]), j]; // getting smallestLimit value
      }
    }
    smallestDistance.push(smallestLimit); // pushing smallest value for point i
  }
  return smallestDistance;
}



function get_power(linkStation, smallestDistances) {
  var powerValues = (smallestDistance, reach) => {
    // inline function to calculate power for given point with smallestDistance and index of linkStation which had that smallest distance
    return smallestDistance.map((m) => {
      if (m[0] > reach[m[1]]) {
        console.log("No link station"); // condition as given in prompt
        return 0;
      }
      var power = Math.pow(reach[m[1]] - m[0], 2).toFixed(2); // calculating power as per math function
      return power;
    });
  };
  return powerValues(smallestDistances, get_reach_points(linkStation));
}

function display_best_link_station(linkStation) {
  linkStation.map((point) => {
    console.log("point", point[0]);
  });
  var b = `Best link station for point x,y is x,y with power`;
  return b;
}

// console.log(display_best_link_station(linkStation));

console.log(
  get_power(
    linkStation,
    total_distance(testValue, get_linkStation_points(linkStation))
  )
);

// console.log(total_distance(testValue, get_linkStation_points(linkStation)));
