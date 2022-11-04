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
function device_distance(testValue, arr) {
  var distance = Math.sqrt(
    Math.pow(testValue[0] - arr[0], 2) + Math.pow(testValue[1] - arr[1], 2)
  );
  return distance;
}

// function for calculating all distances between points and links (one by one)
function total_distance(testValue, arr) {
  var smallestDistance = [];
  for (var i = 0; i < testValue.length; i++) {
    // loop for point
    var smallestLimit = [999999];
    for (var j = 0; j < arr.length; j++) {
      // loop for link station
      if (device_distance(testValue[i], arr[j]) < smallestLimit[0]) {
        smallestLimit = [device_distance(testValue[i], arr[j]), j]; // getting smallestLimit value
      }
    }
    smallestDistance.push(smallestLimit); // pushing smallest value for point i
  }
  return smallestDistance;
}

// function to calculate power takes linkStation from top of code ie starting values and smallestDistances from function Total_distance
// function power(linkStation, smallestDistances) {
//   var reach = [];
//   for (var i = 0; i < linkStation.length; i++) {
//     reach.push(linkStation[i][2]); // pushing last value(r) from linkStation arr (x,y,r)
//   }
//   var powerValues = (smallestDistance, reach) => {
//     // inline function to calculate power for given point with smallestDistance and index of linkStation which had that smallest distance
//     return smallestDistance.map((m) => {
//       let distance = m[0];
//       let stationIndex = m[1];
//       if (distance > reach[stationIndex]) {
//         console.log("No link station"); // condition as given in prompt
//         return 0;
//       }
//       var power = Math.round(Math.pow(reach[stationIndex] - distance, 2)); // calculating power as per math function
//       return power;
//     });
//   };
//   return powerValues(smallestDistances, reach);
// }


function power(linkStation, smallestDistances) {
  // var reach = [];
  // for (var i = 0; i < linkStation.length; i++) {
  //   reach.push(linkStation[i][2]); // pushing last value(r) from linkStation arr (x,y,r)
  // }
  var powerValues = (smallestDistance, reach) => {
    // inline function to calculate power for given point with smallestDistance and index of linkStation which had that smallest distance
    return smallestDistance.map((m) => {
      let distance = m[0];
      let stationIndex = m[1];
      if (distance > reach[stationIndex]) {
        console.log("No link station"); // condition as given in prompt
        return 0;
      }
      var power = Math.round(Math.pow(reach[stationIndex] - distance, 2)); // calculating power as per math function
      return power;
    });
  };
  return powerValues(smallestDistances, get_reach_points(linkStation));
}

console.log(power(linkStation,total_distance(testValue,get_linkStation_points(linkStation))));

// console.log(total_distance(testValue, get_linkStation_points(linkStation)));
