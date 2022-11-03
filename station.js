var link_station = [
  [0, 0, 10],
  [20, 20, 5],
  [10, 0, 12],
];

var testValue = [[0,0], [100, 100], [15,10]]

var arr=[] ;
// var arr2 = [];
// This loop is for outer array
for (var i = 0; i < link_station.length; i++) {
  // This loop is for inner-arrays
//   console.log(link_station[i][0]);
//   console.log(link_station[i][1]);
  arr.push([link_station[i][0],link_station[i][1]]);
  
}
// console.log(arr);

function distance(linkStation, testValue){
var dis;
console.log(linkStation[1]);
dis =Math.sqrt(Math.pow((linkStation[0]-testValue[0]),2)+Math.pow((linkStation[1]-testValue[1]),2));
return dis;
}
function Total_distance(linkStation,test){

}
// console.log(testValue[1]);
// distance(arr[1],testValue[1]);
console.log(distance(arr[1],testValue[1]));