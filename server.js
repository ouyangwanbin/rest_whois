var express = require('express');
var app = express();
var bodyParser = require('body-parser');

//configure app to use bodyParser()
//this will let us get the data from a post

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 3005;

app.listen(port);
console.log('listening on: ' + port);

