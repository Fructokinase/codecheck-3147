"use strict";

var parseArgs = require('minimist');
var main      = require('./app/main');

var argv = parseArgs(process.argv.slice(2));
var args = argv._;
var options = argv;
delete options._;

main(args, argv);

