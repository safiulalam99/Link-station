
function deviceDistance(testValue, linkStation) {
  /**
    function to calculate the shortest distance between deviice and link station 

   * @param    device[x][y], linkstation[x,y,r]  
   * @return   device_distance object with linkstation(x,y), testValue(x,y) and power
   */
  var distance,
    maxValue = [9999999];
  for (var i = 0; i < linkStation.length; i++) {
    //Distance formula
    distance = Math.sqrt(
      Math.pow(testValue[0] - linkStation[i][0], 2) +
        Math.pow(testValue[1] - linkStation[i][1], 2)
    );
    // retrieving smallest distance for device (x,y) to the link station (x,y)
    if (distance < maxValue[0]) {
      maxValue[0] = distance;
      maxValue[1] = [linkStation[i][0], linkStation[i][1]];
      maxValue[2] = linkStation[i][2];
      maxValue[3] = testValue;
    }
  }
  return maxValue;
}

function getHighestPower(smallest) {
  /**
   * get_highest_power calculates the power from the data returned by {device_distance} function
     and compares to the output message

   * @param   device_distance object with linkstation(x,y), testValue(x,y) and power
   * @return  output message  
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

function testProgram() {
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
        getHighestPower(deviceDistance(testValue[x], linkStation))
      );
    }
  }
  return output;
}

function main(request, response) {
  /*
    main executes and runs in cloud function
   */
  response.status(200).send(testProgram());
}

/* executes when run locally */
if (require.main === module) {
  console.log(testProgram());
}

module.exports = { testProgram,  deviceDistance, getHighestPower, main };
