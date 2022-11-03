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
var distanceArray = [];
// var arr2 = [];
// This loop is for outer array
for (var i = 0; i < link_station.length; i++) {
  arr.push([link_station[i][0], link_station[i][1]]);
}
// console.log(arr);

function distance(testValue, arr, j) {
  var dis;
  // console.log(arr[1]);
  dis = Math.sqrt(
    Math.pow(testValue[0] - arr[0], 2) + Math.pow(testValue[1] - arr[1], 2)
  );
  return [dis, j];
}


function Total_distance(test, arr) {
  var smallestDistances = [];
  for (var i = 0; i < test.length; i++) {
    for (var j = 0; j < arr.length; j++) {
      distanceArray.push(distance(test[i], arr[j], j));
    }
    var smallest = [999999];
    var sortedArr = []
    for (var x=0; x< distanceArray.length; x++){
        if(distanceArray[x][0] < smallest[0]){
            smallest = [distanceArray[x][0],x];
        }
         // these are distance values
       // console.log(distanceArray[x][0])
    }
    //console.log("TERI MAA KAA", smallest);
    smallestDistances.push(smallest);
    //console.log(Math.min(distanceArray[0]))
    distanceArray = [];
    //console.log(" space herer")
  }
  //console.log(smallestDistances)
  return smallestDistances;
}




function power(link_station, smallestDistances) {
  var reach = [];
  for (var i = 0; i < link_station.length; i++) {
    // console.log(link_station);
    reach.push(link_station[i][link_station.length - 1]);
  }
//   console.log(smallestDistances)
  var powerValues = (smallestDistance, reach) => {
    return smallestDistance.map((m)=>{
        let distance =m[0];
        let stationIndex =m[1];
        if(distance > reach[stationIndex]){
            console.log("No link station")
            return (0)
        }
        var power = Math.pow((reach[stationIndex] - distance),2)
        return power;
    })
  };
console.log(powerValues(smallestDistances, reach));
//   for (var i = 0; i < reach.length; i++) {
//     console.log("Best link station for point x,y and power is ", powerValues(smallestDistances));
//   }
}
// console.log(testValue[1]);
// distance(arr[1],testValue[1]);
// console.log(distance(testValue[1],arr[1]));
// console.log(Total_distance(arr,testValue));
//console.log(Total_distance(testValue, arr));
power(link_station,Total_distance(testValue, arr));
