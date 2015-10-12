#!/usr/bin/env node

var os = require('os');
var fs = require('fs');
var argv = require('minimist')(process.argv.slice(2));
var dummyjson = require('./dummy-json');

if (argv._ && argv._.length) {
    // We're only reading one filename for now
    var result = dummyjson.parse(
        fs.readFileSync(argv._[0], {encoding: 'utf8'})
    );
    process.stdout.write(result + os.EOL);
}