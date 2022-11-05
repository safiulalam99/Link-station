// function to calculate distance between point and link station (values sent as parameter in form of [x,y])
function device_distance(testValue, linkStationPoints) {
  var dist,
    sampleArray = [];
  smallest = [99999];
  for (var i = 0; i < linkStationPoints.length; i++) {
    dist = Math.sqrt(
      Math.pow(testValue[0] - linkStationPoints[i][0], 2) +
        Math.pow(testValue[1] - linkStationPoints[i][1], 2)
    );
    if (dist < smallest[0]) {
      smallest[0] = dist;
      smallest[1] = [linkStationPoints[i][0], linkStationPoints[i][1]];
      smallest[2] = linkStationPoints[i][2];
      smallest[3] = testValue;
    }
  }
  sampleArray.push(smallest);
  return smallest;
}

function getPower(smallest) {
  if (smallest[0] > smallest[smallest.length - 2]) {
    console.log(`No Link Station within reach for point (${smallest[3]})`);
    return 1;
  } else {
    var power = Math.pow(
      smallest[smallest.length - 2] - smallest[0],
      2
    ).toFixed(2);
    console.log(
      `Best link station for (${smallest[3]}) is (${smallest[1]}) with power ${power}`
    );
  }
}

function main() {
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

  for (var x = 0; x < testValue.length; x++) {
    getPower(device_distance(testValue[x], linkStation));
  }
}

main();
