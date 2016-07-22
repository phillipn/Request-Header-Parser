var express = require('express');
var app = express();
var http = require('http');
var net = require('net');


app.get('/', function(req, res){
  var UAParser = require('ua-parser-js');
  var parser = new UAParser();
  var os = parser.setUA(req.headers['user-agent']).getOS();
  var lang = req.headers['accept-language'].split(',')[0];
  var requestIp = req.connection.remoteAddress;
  var indexOfColon = requestIp.lastIndexOf(':');
  var ip = requestIp.slice(indexOfColon+1);
  res.end(JSON.stringify({OS: os.name + ' ' + os.version, Language: lang, IPAddress: ip}));
})

http.createServer(app).listen(process.env.PORT || 3000, function(){
  console.log("listening...");
});


