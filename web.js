'use strict';
var express = require('express'),app = express();
app.use('/', express.static(__dirname + '/'));
console.log('localhost:7777');
app.listen(7777);