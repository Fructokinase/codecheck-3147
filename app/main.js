"use strict";

var moment = require('moment');

var A1_to_A7_first = "05:55";
var A1_to_A13_first = "06:00";
var A13_to_A1_first = "05:52";

var A7_to_A1_first = "06:06";
var A7_to_A13_first = "06:10";

var A7_to_B1_start = "06:11";
var B1_to_A7_start = "06:00";

var add_minutes = function(start_time, min) {
    return moment(start_time, "HH:mm").add(min, 'minutes').format("HH:mm");
}

var compare_time = function (t1, sign, t2) {
    var t1_unix = moment(t1, "HH:mm").format('x');
    var t2_unix = moment(t2, "HH:mm").format('x');
    if(sign == "<") {
        return t1_unix < t2_unix;
    } else if (sign == ">") {
        return t1_unix > t2_unix;
    } else if (sign == "==") {
        return t1_unix == t2_unix;
    } else if (sign == "<=") {
        return t1_unix <= t2_unix;
    } else if (sign == ">=") {
        return t1_unix >= t2_unix;
    }
}

var A_line_stations = {
    "A1" :  0,
    "A2" :  1,
    "A3" :  2,
    "A4" :  3,
    "A5" :  4,
    "A6" :  5,
    "A7" :  6,
    "A8" :  7,
    "A9" :  8,
    "A10":  9,
    "A11": 10,
    "A12": 11, 
    "A13": 12
};

var A_line_stations_up= {
    "A7" :  0,
    "A8" :  1,
    "A9" :  2,
    "A10":  3,
    "A11":  4,
    "A12":  5, 
    "A13":  6
}

var A1_A7_stations = {
    "A1" :  0,
    "A2" :  1,
    "A3" :  2,
    "A4" :  3,
    "A5" :  4,
    "A6" :  5,
    "A7" :  6
}

var A7_A1_stations = {
    "A7" :  0,
    "A6" :  1,
    "A5" :  2,
    "A4" :  3,
    "A3" :  4,
    "A2" :  5,
    "A1" :  6
}

var A1_TO_A7_DISTANCE = [0, 3, 8, 10, 13, 17, 20];
var A7_TO_A1_DISTANCE = [0, 3, 7, 10, 12, 17, 20];
var A7_TO_A13_DISTANCE = [0, 4, 6, 8, 11, 17, 19];

var A_UP_DISTANCE = [0, 3, 8, 10, 13, 17, 20, 24, 26, 28, 31, 37, 39];
var A_DOWN_DISTANCE = [0, 2, 8, 11, 13, 15, 19, 22, 26, 29, 31, 36, 39];

var B_UP_DISTANCE = [0, 4, 7, 10, 12, 15];
var B_DOWN_DISTANCE = [0, 3, 5, 8, 11, 15];

var B_line_stations = { 
    "B1" : 0, 
    "B2" : 1,
    "B3" : 2,
    "B4" : 3, 
    "B5" : 4
};

var time_table = {};

for(var station in A_line_stations) {
    time_table[station] = {
        "U": [],
        "D": []
    }
}

for(var station in B_line_stations) {
    time_table[station] = {
        "U": [],
        "D": []
    }
}

// A //
var add_train_line_A_to_A7 = function(start_time) {
    for(var station in A1_A7_stations) {
        if(station != "A7"){
            time_table[station].U.push(add_minutes(start_time, A1_TO_A7_DISTANCE[A1_A7_stations[station]]));
        }
    }
}

var add_train_line_A_UP  = function (start_time){
    for(var station in A_line_stations) {
        time_table[station].U.push(add_minutes(start_time, A_UP_DISTANCE[A_line_stations[station]]));
    }
}

var add_train_line_A7_to_A1= function(start_time) {
    for(var station in A7_A1_stations) {
        time_table[station].D.push(add_minutes(start_time, A7_TO_A1_DISTANCE[A7_A1_stations[station]]));
    }
}

var add_train_line_A_DOWN = function (start_time){
    for(var station in A_line_stations) {
        if(!(station.slice(1) < 7 && start_time == "22:52")){
            time_table[station].D.push(add_minutes(start_time, A_DOWN_DISTANCE[12 - A_line_stations[station]]));
        }
    }
}

var add_train_line_A7_UP  = function (start_time){
    for(var station in A_line_stations_up) {
        time_table[station].U.push(add_minutes(start_time, A7_TO_A13_DISTANCE[A_line_stations_up[station]]));
    }
}
// END A //

// B //
var add_train_line_B_UP  = function (start_time){
    for(var station in B_line_stations) {
        time_table[station].U.push(add_minutes(start_time, B_UP_DISTANCE[B_line_stations[station]]));
    }
}

var add_train_line_B_DOWN = function (start_time){
    for(var station in B_line_stations) {
        time_table[station].D.push(add_minutes(start_time, B_DOWN_DISTANCE[4 - B_line_stations[station]] + 2 ));
    }
}
// END B //

//
add_train_line_A7_UP("06:10");

//
var time = A1_to_A7_first;
while (compare_time(time, "<", "23:00")) {
    add_train_line_A_to_A7(time);
    time = add_minutes(time, 10);
}

var time = A1_to_A13_first;
while (compare_time(time, "<", "23:00")) {
    add_train_line_A_UP(time);
    time = add_minutes(time, 10);
}


//
var time = A7_to_A1_first;
while (compare_time(time, "<=", "23:17")) {
    add_train_line_A7_to_A1(time);
    time = add_minutes(time, 10);
}

//
var time = A13_to_A1_first;
while (compare_time(time, "<", "23:00")) {
    add_train_line_A_DOWN(time);
    time = add_minutes(time, 10);
}

//
var time = B1_to_A7_start;
while (compare_time(time, "<", "23:00")) {
    add_train_line_B_UP(time);
    time = add_minutes(time, 6);
}

//
var time = A7_to_B1_start;
while (compare_time(time, "<=", "23:05")) {
    add_train_line_B_DOWN(time);
    time = add_minutes(time, 6);
}

for(var station in time_table) {
    time_table[station].U.sort();
    time_table[station].D.sort();
}

var print_whole_thing = function(station, direction){
    var times = time_table[station][direction];
    var result = "";
    var hour = times[0].slice(0, 2);
    if(hour == 5) {
        for(var h = 5; h < 24; h++) {
            print_hour(start_time, direction, h);
        }
    } else {
        for(var h = 6; h < 24; h++) {
            print_hour(start_time, direction, h);
        }
    }
}

var print_hour = function(station, direction, hour){
    var hour =  hour < 10 ? "0" + hour : hour;
    var times = time_table[station][direction];
    times = times.filter(function (t) {
        return t.slice(0, 2) == hour;
    })
    var result = hour;
    result +=":";
    for(var t of times) {
        result += " " + t.slice(3);
    }
    console.log(times.length == 0 ? "No train" : result);
}

var print = function(station, direction, hour) {
    if(hour == undefined){
        print_whole_thing(station, direction);
    } else {
        print_hour(station, direction, hour);
    }
}

function main(args, options) {
    var line = args[0];
    var station = args[1];
    var direction = args[2];
    var hour = args[3] || -1;

    if(line == "B" && station == 'A7') {
        station = 'B5';
    }
    print(station, direction, hour);

}



module.exports = main;
