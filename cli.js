#!/usr/bin/env node

var os = require('os');
var fs = require('fs');
var dummyjson = require('./index');

var args = process.argv.slice(2);

if (args && args[0]) {
  var result = dummyjson.parse(
    fs.readFileSync(args[0], {encoding: 'utf8'})
  );
  process.stdout.write(result + os.EOL);
}
