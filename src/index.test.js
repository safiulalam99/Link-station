var { device_distance, testProgram, get_highest_power } = require("./index");
/********************************/
/*       Initialization        */
/******************************/
var linkStation = [
  [0, 0, 10],
  [20, 20, 5],
  [10, 0, 12],
];
var testValue = [
  [0, 0],
  [100, 100],
];
var result = [];


beforeAll(() => {
  /*
    Executes get_highest_power method and store output to result array at the beginning of the test
*/
  for (var x = 0; x < testValue.length; x++) {
    result.push(get_highest_power(device_distance(testValue[x], linkStation)));
  }
});

/********************************/
/*          Tests               */
/*******************************/

test("Device shortest distance from Link station", () => {
  /*
    Checks if the calculation of the smallest distance is correct
*/

  var smallestDistance = [];
  for (var x = 0; x < testValue.length; x++) {
    smallestDistance.push(device_distance(testValue[x], linkStation));
  }
  expect(smallestDistance.map((m) => m[0].toFixed(2))).toEqual([
    "0.00",
    "113.14",
  ]);
});



describe("Grouping get_highest_power emthods", () => {
  /*
    Tests if the output of a the main program is accurate
*/

  test("Check the station with the higest power", () => {
    expect(result[0]).toBe(
      "Best link station for (0,0) is (0,0) with power 100.00"
    );
  });

  test("Check the station with the 0 power", () => {
    expect(result[1]).toBe("No Link Station within reach for point (100,100)");
  });
});
