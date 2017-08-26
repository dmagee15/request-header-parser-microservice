'use strict';

var express = require('express');
var app = express();

app.get('/', function(req,res){
  var ip = req.headers['x-forwarded-for'].match(/^\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/)[0] || req.connection.remoteAddress.match(/\d{1,3}.\d{1,3}.\d{1,3}.\d{1,3}/)[0];
  var soft = req.headers['user-agent'].match(/[(][\w\d\s.;]*(?=[)])/)[0];
  soft = soft.slice(1,soft.length);
  var lang = req.headers['accept-language'].match(/[\w\d\s-]*(?=[,])/)[0];
  
  var result = {
    "ipaddress": ip,
    "language": lang,
    "software": soft
  };
  
  res.json(result);
});

app.listen(process.env.PORT, function () {
  console.log('Node.js listening ...');
});

