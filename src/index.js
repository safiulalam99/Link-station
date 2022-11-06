const express = require("express");

function device_distance(testValue, linkStationPoints) {
  /**
    function to calculate the shortest distance between deviice and link station 

   * @param    device[x][y], linkstation[x,y,r]  
   * @return   device_distance object with linkstation(x,y), testValue(x,y) and power
   */
  var distance,
    maxValue = [9999999];
  for (var i = 0; i < linkStationPoints.length; i++) {
    //Distance formula
    distance = Math.sqrt(
      Math.pow(testValue[0] - linkStationPoints[i][0], 2) +
        Math.pow(testValue[1] - linkStationPoints[i][1], 2)
    );
    // retrieving smallest distance for device (x,y) to the link station (x,y)
    if (distance < maxValue[0]) {
      maxValue[0] = distance;
      maxValue[1] = [linkStationPoints[i][0], linkStationPoints[i][1]];
      maxValue[2] = linkStationPoints[i][2];
      maxValue[3] = testValue;
    }
  }
  return maxValue;
}

function get_highest_power(smallest) {
  /**
   * get_highest_power calculates the power from the data returned by {device_distance} function
     and compares to the output message

   * @param   device_distance object with linkstation(x,y), testValue(x,y) and power
   * @return   output message  
   */

  if (smallest[0] > smallest[smallest.length - 2]) {
    return `No Link Station within reach for point (${smallest[3]})`;
  } else {
    var power = Math.pow(
      smallest[smallest.length - 2] - smallest[0],
      2
    ).toFixed(2);
    return `Best link station for (${smallest[3]}) is (${smallest[1]}) with power ${power}`;
  }
}

function test() {
  /**
   * Run the program for given sample data
    
   * @return   {Array}         Output message
   */

  var output = [];

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

  if (output.length == 0) {
    for (var x = 0; x < testValue.length; x++) {
      output.push(
        get_highest_power(device_distance(testValue[x], linkStation))
      );
    }
  }
  return output;
}

exports.main = (request, response) => {
  /*
    main executes and runs in cloud function
   */
  response.status(200).send(test());
};

/* executes when run locally */
if (require.main === module) {
  console.log(test());
}
