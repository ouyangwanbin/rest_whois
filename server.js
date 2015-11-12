var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var whois = require('whois')

//configure app to use bodyParser()
//this will let us get the data from a post

app.use(bodyParser.urlencoded({
    extended: true
}));

app.use(bodyParser.json());

var port = process.env.PORT || 3005;

app.post( '/domains' , function( req , res ){
	var domains = req.body.domains.split(',');
	var len = domains.length;
	var result = { };
	result.data = [];
	batchWhois( domains , 0 , result , res );
});

function batchWhois( domains, index, result, res ){
	if( index == domains.length ){
		result.status = "success";
		res.json( result );
		return;
	}
	whois.lookup( domains[index] , function( err, data){
		if( err ){
			console.log( err );
		}else{
			result.data.push( data );
		}
		batchWhois( domains , index+1 , result, res );
	});
}

app.listen(port);
module.exports = app;

console.log('listening on: ' + port);
