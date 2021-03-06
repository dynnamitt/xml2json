/*jshint node:true */
"use strict";

var xm = require('xml-mapping'),
    optimist = require('optimist'),
    argv = optimist
    .options('help',{alias:'h', describe: 'Show help'})
    .options('caproot',{alias:'c',describe:'no root elem in JSON (if just one)'})
    .usage('Reads standard input and writes to standard output.\nUsage : $0 [--help] [--caproot]')
    .argv; 


if ( argv.help ){
  optimist.showHelp();
  process.exit(0);
}

process.stdin.resume();
process.stdin.setEncoding('utf8');

var xml = '';
process.stdin.on('data', function (chunk) {
  xml = xml + chunk;
});

process.stdin.on('end', function() {
  var json = xm.load(xml);

  if(argv.caproot && Object.keys(json).length===1){
     json = json[Object.keys(json)[0]];
  }
  console.log(JSON.stringify(json, null, '\t'));
});


