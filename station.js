var link_station = [
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



var arr = [];

// function to get x and y axis only from link station : technically not needed but helps
for (var i = 0; i < link_station.length; i++) {
  arr.push([link_station[i][0], link_station[i][1]]);
}

// function to calculate distance between point and link station (values sent as parameter in form of [x,y])
function distance(testValue, arr) {
  var dis;
  dis = Math.sqrt(
    Math.pow(testValue[0] - arr[0], 2) + Math.pow(testValue[1] - arr[1], 2)
  );
  return dis;
}

// function for calculating all distances between points and links (one by one)
function Total_distance(testValue, arr) {
  var smallestDistances = [];
  for (var i = 0; i < testValue.length; i++) {
    // loop for point
    var smallest = [999999];
    for (var j = 0; j < arr.length; j++) {
      // loop for link station
      if (distance(testValue[i], arr[j]) < smallest[0]) {
        smallest = [distance(testValue[i], arr[j]), j]; // getting smallest value
      }
    }
    smallestDistances.push(smallest); // pushing smallest value for point i
  }
  return smallestDistances;
}

// function to calculate power takes link_station from top of code ie starting values and smallestDistances from function Total_distance
function power(link_station, smallestDistances) {
  var reach = []; // array to store all reach lengths from link_stations
  for (var i = 0; i < link_station.length; i++) {
    //console.log(link_station[i][2]);
    reach.push(link_station[i][2]); // pushing last value(r) from link_station arr (x,y,r)
  }
  //console.log(reach);
  var powerValues = (smallestDistance, reach) => {
    // inline function to calculate power for given point with smallestDistance and index of link_station which had that smallest distance
    return smallestDistance.map((m) => {
      let distance = m[0];
      let stationIndex = m[1];
      if (distance > reach[stationIndex]) {
        console.log("No link station"); // condition as given in prompt
        return 0;
      }
      var power = Math.pow(reach[stationIndex] - distance, 2); // calculating power as per math function
      return power;
    });
  };
  console.log(powerValues(smallestDistances, reach));
}

power(link_station, Total_distance(testValue, arr));
