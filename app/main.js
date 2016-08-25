"use strict";

var A1_first = 5 * 60 + 55;
var A13_first = 5 * 60 + 52;

var A7_to_A1_first = 6 * 60 + 6;
var A7_to_A13_first = 6 * 60 + 10;

var A7_to_B1_first = 6 * 60 + 11;
var B1_to_A7_first = 6 * 60 + 0;

var distance_relative_to_A1 = [ 0, 3, 8, 10, 13, 17, 20, 24, 26, 28, 31, 37, 39 ];
var distance_relative_to_A13 = [39, 36, 31, 29, 26, 22, 19, 15, 13, 11, 8, 2, 0];
var distance_relative_from_A7_A13 = [0, 4, 6, 8, 11, 17, 19];
var distance_relative_from_A7_A1 = [0, 3, 7, 10, 12, 17, 20];

var distance_relative_from_B1 = [0, 4, 7, 10, 12, 15];
var distance_relative_from_B5 = [15, 11, 8, 5, 3, 0];

var last = 23 * 60;

// var A = [0,3,5,2,3,4,3,4,2,2,3,6,2];
// var B = [4,3,3,2,3];

function main(args, options) {
    var line = args[0];
    var station = args[1];
    var direction = args[2];
    var hour = args[3] || -1;

    train_times(direction, line, station, hour);

}

// function distance_from_start (line, direction, station_number, ) {
//     if(line == "A") {
//         if(direction == "U") {
//             return A.slice(0, station_num - 1).reduce(function (a,b) { return a + b});
//         }
//     } else {
//         if(direction == "U") {
//             return B.slice(0, station_num - 1).reduce(function (a,b) { return a + b});
//         }
//     }
// }

function train_times(direction, line, station, hour) {
    var distance;
    var station_num = station.slice(1);

    if(line == "A" && station_num > 7 && direction == "U") {
        distance = distance_relative_to_A1[station_num - 1];
        print_time(A1_first, 10, distance, hour);
    } else if(line == "A" && station_num > 7 && direction == "D"){
        distance = distance_relative_to_A13[station_num - 1];
        print_time(A13_first, 10, distance, hour);
    } else if (line == "A" && station_num <= 7 && direction == "U") {
        distance = distance_relative_to_A1[station_num - 1];
        print_time(A1_first, 5, distance, hour);
    } else if (line == "A" && station_num <= 7 && direction == "D"){ 
        distance = distance_relative_to_A13[station_num - 1];
        print_time(A13_first, 5, distance, hour);
    } else if (line == "B" && direction == "U") {
        if (station_num == 7){
            station_num = 6;
        }
        distance = distance_relative_from_B1[station_num -1];
        print_time(B1_to_A7_first, 6, distance, hour);
    } else if (line == "B" && direction == "D") {
        if (station_num == 7){
            station_num = 6;
        }
        distance = distance_relative_from_B5[station_num -1];
        print_time(A7_to_B1_first, 6, distance, hour);
    }
}

function print_time_hour(first_station_time, frequency, distance, hour, station, direction){
    var result = (hour > 9 ? hour : ("0" + hour)) + ":";
    var min;
    var train_counter = 0;

    while((first_station_time + distance) < hour*60) {
        first_station_time+=frequency;
    }

    while((first_station_time + distance) < (hour+1)*60 && 
           (direction == 'D' || first_station_time < 23*60)) {

        min = (first_station_time+distance)%60;
        result+= " " + (min > 9 ? min : ("0"+min));
        train_counter++;
        first_station_time+=frequency;
    }

    if(train_counter == 0){
        result = "No train";
    }

    console.log(result);
}

function print_time_all_hour(first_station_time, frequency, distance, direction) {
    for(var hour = 5; hour < 24; hour++){
        print_time_hour(first_station_time, frequency, distance, hour, direction);
    }
}

function print_time(first_station_time, frequency, distance, hour, direction) {
    if(hour != -1) {
        print_time_hour(first_station_time, frequency, distance, hour, direction);
    } else {
        print_time_all_hour(first_station_time, frequency, distance, direction);
    }
}

module.exports = main;
